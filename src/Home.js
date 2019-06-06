// @flow

import * as React from 'react';
import App from './App';

type Props = {
    auth: any
}

class Home extends React.Component<Props> {

    constructor(props:any){
        super(props);
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
    }

    // calls the login method in authentication service
    login = () => {
        this.props.auth.login();
    }
    // calls the logout method in authentication service
    logout = () => {
        this.props.auth.logout();
    }


    render() {
        // calls the isAuthenticated method in authentication service
        const { isAuthenticated } = this.props.auth;
        return (
            isAuthenticated()
                    ?
                    <App isAuthenticated handleAuth={this.logout} />
                    :
                    <App handleAuth={this.login} />

        );
    }
}

export default Home;