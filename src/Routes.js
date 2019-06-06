// @flow
import './App.scss';
import React from 'react';
import { Route, Router } from 'react-router-dom';
import Home from './Home';
import Callback from './Callback';
import Auth from './auth';
import history from './history';
import CssBaseline from '@material-ui/core/CssBaseline';

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import myCogsFilterReducer from './reducers/myCogsFilterReducer';
const store = createStore(myCogsFilterReducer);

console.log('log the redux store',store.getState());



const auth = new Auth();

// const handleAuthentication = (nextState, replace) => {
//     if (/access_token|id_token|error/.test(nextState.location.hash)) {
//         auth.handleAuthentication();
//     }
// }

const Routes = () => (
    <Provider store={store}>
    <Router history={history} component={Home}>
        <>
            <CssBaseline />
            <Route exact path="/" render={(props) => <Home auth={auth} {...props} />} />
            <Route path="/home" render={(props) => <Home auth={auth} {...props} />} />
            <Route path="/callback" render={(props) => {
                console.log('Route handleAuthentication render Callback');
                auth.handleAuthentication(props);
                return <Callback {...props} />
            }}/>
        </>
    </Router>
    </Provider>
);

export default Routes;