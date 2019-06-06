// @flow

import { MY_COGS_FILTER_COLLECTION } from '../actions/myCogsFilterActions';

function myCogsFilterReducer(state=[], action) {
    switch  (action.type){
        case MY_COGS_FILTER_COLLECTION:
            return [
                ...state,
                {
                    id: action.id,
                    text: action.text,
                    completed: false
                }
            ]
        default:
            return state; // In case an action is passed in we don't understand
    }
}

export default myCogsFilterReducer;