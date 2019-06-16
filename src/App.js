// @flow

import * as React from 'react';
import history from "./history";
import MyCogsHeader from './containers/MyCogsHeader';
import {MyCogsWelcome} from './components/MyCogsWelcome';
import MyCogsCollection from './containers/MyCogsCollection';

// import connect to bind up the App to the action
// import the action for adding the collection to the store
import {connect} from 'react-redux';
import { myCogsAddCollection, myCogsAddLabel } from "./actions/actions";

type Props = {
    isAuthenticated: boolean,
    handleAuth: Function,
    username: string,
    myCogsAddCollection: any,
    myCogsAddLabel: any,
}

type State = {
    userIdentity: Object,
    currentPage: number,
    error: boolean,
    hasMore: boolean,
    isLoading: boolean,
}

class App extends React.Component<Props, State> {

    state:State = {
        userIdentity: {},
        userCollection: [],
        currentPage: 0,
        error: false,
        hasMore: true,
        isLoading: false,
    };

    constructor(props:any) {
        super(props);

        window.onscroll = () => {
            const {
                fetchCollection,
                state: {
                    error,
                    isLoading,
                    hasMore,
                },
            } = this;

            if (this.state.error || this.state.isLoading || !this.state.hasMore) return;
            if ((window.innerHeight + Math.ceil(window.pageYOffset)) >= window.document.body.offsetHeight) {
                fetchCollection();
            }
        };

    }

    componentDidMount() {
        this.fetchIdentity();
    }

    fetchIdentity = () => {
        // fetch the identity from the cogsAPI
        fetch("http://localhost:9000/cogsAPI/identity", {})
            .then(res => {
                return res.json();
            })
            .then(data => {
                this.setState({userIdentity: data});
            })
            .then(data => {
                this.fetchCollection();
            })
            .catch(err => {
            });
    };

    fetchCollection = () => {

        this.setState({ isLoading: true }, () => {

            const nextPage = this.state.currentPage + 1;
            // fetch the identity from the cogsAPI
            fetch("http://localhost:9000/cogsAPI/collection?username=" + this.state.userIdentity.username + "&folder=0&page=" + nextPage + "&per_page=50", {})
                .then(res => {
                    return res.json();
                })
                .then(res => {
                    // add the loaded collection to the redux store with the myCogsAddCollection action
                    this.props.myCogsAddCollection(res.releases);
                    this.props.myCogsAddLabel(res.releases);
                    this.setState({
                        hasMore: (nextPage < res.pagination.pages),
                        isLoading: false,
                        currentPage: nextPage,
                    });
                })
                .catch(err => {
                    this.setState({
                        isLoading: false,
                    })
                });


        });
    };

    render() {
        const centerMe = {
            alignItems: 'center',
            display: 'flex',
            height: '100%',
            justifyContent: 'center',
        };
        return (
            this.props.isAuthenticated
                ?
                <>
                    <MyCogsHeader isAuthenticated handleAuth={this.props.handleAuth}
                                    userIdentity={this.state.userIdentity}/>
                    <main><MyCogsCollection /></main>
                </>
                :
                <main style={centerMe}><MyCogsWelcome handleAuth={this.props.handleAuth}/></main>
        )
    }
}

export default connect(
    null,
    {myCogsAddCollection, myCogsAddLabel}
)(App);