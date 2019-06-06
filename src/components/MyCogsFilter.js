// this set of controls will filter the collection

// @flow
import * as React from 'react';
import {connect} from 'react-redux';
// import the action for filtering
import {myCogsFilterCollection} from '../actions/myCogsFilterActions.js';

type State = {
    filters: any,
}

const MyCogsFilter = ({ dispatch }) => {
    return (
        <button
            onClick={e => {
                e.preventDefault()
                dispatch(myCogsFilterCollection('Filter the Collection'))
            }}
        >WOOP</button>
    )
};

// const mapStateToProps = state => {
//     return {
//         MyCogsFilter: getVisibleTodos(state.todos, state.visibilityFilter)
//     }
// }

export default connect()(MyCogsFilter)