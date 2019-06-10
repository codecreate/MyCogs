// @flow
import CssBaseline from '@material-ui/core/CssBaseline';
import './App.scss';

import React from 'react';
import { Route, Router } from 'react-router-dom';
import Home from './Home';

import Auth from './auth';
import Callback from './Callback';
import history from './history';

const auth = new Auth();

// const handleAuthentication = (nextState, replace) => {
//     if (/access_token|id_token|error/.test(nextState.location.hash)) {
//         auth.handleAuthentication();
//     }
// }

const Routes = () => (
    <Router history={history} component={Home}>
        <CssBaseline />
        <Route exact path="/" render={(props) => <Home auth={auth} {...props} />} />
        <Route path="/callback" render={(props) => {
            auth.handleAuthentication(props);
            return <Callback {...props} />
        }}/>
    </Router>
);

export default Routes;