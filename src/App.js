// @flow

import * as React from 'react';
import history from "./history";
import {MyCogsHeader} from './components/MyCogsHeader';
import {MyCogsCollection} from './components/MyCogsCollection';

type Props = {
    isAuthenticated: boolean,
    handleAuth: Function,
    username: string,
}

type State = {
    userIdentity: Object,
    userCollection: Array<any>,
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
                    this.setState({
                        hasMore: (nextPage < res.pagination.pages),
                        isLoading: false,
                        currentPage: nextPage,
                        userCollection: [
                            ...this.state.userCollection,
                            ...res.releases
                        ],
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
        return (
            this.props.isAuthenticated
                ?
                <>
                    <header><MyCogsHeader isAuthenticated handleAuth={this.props.handleAuth}
                                    userIdentity={this.state.userIdentity}/></header>
                    <main><MyCogsCollection userCollection={this.state.userCollection}/></main>
                </>
                :
                <header><MyCogsHeader handleAuth={this.props.handleAuth}/></header>
        )
    }
}

export default App;