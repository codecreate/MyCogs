// @flow

import React from "react";
import {connect} from "react-redux";
import MyCogsFilter from '../components/MyCogsFilter';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import { myCogsFilterCollection } from "../actions/actions";
import {MY_COGS_FILTER_COLLECTION} from "../actions/actionTypes";

// the first job is to create the filters based on record labels
// then work out how to report the currently checked ones
// pass the action down to the individual checkbox

type Props = {
    labelFilters: any,
    myCogsFilterCollection: any
}

const MyCogsFilters = ({labelFilters, myCogsFilterCollection}) => {
    console.log('labelFilters', labelFilters.length);
    return(
        <ul className="filter_labels">
            {labelFilters && labelFilters.length
            // return filterList;
            ? labelFilters.map((item, index) => (
                    <FormControlLabel
                        control={
                            <Checkbox
                                // checked={state.checkedB}
                                onChange={() => myCogsFilterCollection(item.id)}
                                value={item.id}
                                color="primary"
                            />
                        }
                        label={item.name}
                    />
              ))
            : ''
            }
        </ul>
    );
};

const mapStateToProps = state => {
    const labelFilters = state.myCogsCollectionReducer.loadedLabels;
    return { labelFilters };
};

export default connect(
    mapStateToProps,
    {myCogsFilterCollection}
)(MyCogsFilters);