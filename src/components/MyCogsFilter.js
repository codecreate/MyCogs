// @flow
// this set of controls will filter the collection

import * as React from 'react';
import {connect} from 'react-redux';
import Checkbox from '@material-ui/core/Checkbox';
// import the action
import { myCogsFilterCollection } from "../actions/actions";

const MyCogsFilter = ({filterLabelIDs, myCogsFilterCollection}) => {
    return (
        <Checkbox
            onClick={() => myCogsFilterCollection(filterLabelIDs)}
            value="checkedA"
        />
    )
};

// export default MyCogsFilter;
export default connect(
    null,
    {myCogsFilterCollection}
)(MyCogsFilter);