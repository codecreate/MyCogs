/**
 * Header and controls
 */

import React from 'react';

export class Header extends React.Component{

    constructor (props){
        super(props);
    }

    componentDidMount() {
        console.log('this.props.isAuthenticated ',this.props.isAuthenticated);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('Header componentDidUpdate state',this.props.userIdentity);
    }



    render() {
        return (
            <>
            {this.props.isAuthenticated
                ? <h5>Welcome {this.props.userIdentity.username} <a style={{ cursor: 'pointer' }} onClick={this.props.handleAuth}> Click here to log out. You may have to unathorise this app from your Discogs account </a></h5>
                : <h5><a style={{ cursor: 'pointer' }} onClick={this.props.handleAuth}>Jump on over to Discogs and authorise us to visualise your precious.</a></h5>
            }
            </>
        );
    }
}