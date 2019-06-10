// @flow
import { combineReducers } from 'redux';
// custom reducers
import myCogsCollectionReducer from './myCogsCollectionReducer';


const combinedReducers = combineReducers({
    myCogsCollectionReducer,
});

export default combineReducers({ myCogsCollectionReducer });