import React from 'react';
import './App.css';
import history from "./history";
import {Header} from './components/Header';
import {MyCogsCollection} from './components/MyCogsCollection';
import './scss/styles.scss';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userIdentity: [],
            userCollection: [],
        }
    }

    componentDidMount() {
        this.fetchIdentity();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('App componentDidUpdate');
        console.log('this.state.userCollection',this.state.userCollection);
    }

    fetchIdentity = () => {
        // fetch the identity from the cogsAPI
        console.log('App show identity');
        fetch("http://localhost:9000/cogsAPI/identity", {})
            .then(res => {
                console.log('Fetching identity');
                return res.json();
            })
            .then(data => {
                console.log('Value back from identity', data);
                this.setState({userIdentity: data});
            })
            .then(data => {
                this.fetchCollection();
            })
            .catch(err => {
                console.log("Booo no identity ", err);
            });
    }

    fetchCollection = () => {
        // fetch the identity from the cogsAPI
        console.log('App show collection');
        fetch("http://localhost:9000/cogsAPI/collection?username="+this.state.userIdentity.username+"&folder=0&page=1&per_page=50", {})
            .then(res => {
                console.log('Fetching collection');
                return res.json();
            })
            .then(data => {
                console.log('Value back from collection', data);
                this.setState({userCollection: data});
            })
            .catch(err => {
                console.log("Booo no collection ", err);
            });
    }

    render() {
        console.log('return function of the app',this.props.isAuthenticated);
        return(
            this.props.isAuthenticated
            ?
            <>
                <header><Header isAuthenticated handleAuth={this.props.handleAuth} userIdentity={this.state.userIdentity} /></header>
                <main><MyCogsCollection collectionData={this.state.userCollection}/></main>
            </>
            :
                <header><Header handleAuth={this.props.handleAuth}/></header>
        )
    }


}

export default App;