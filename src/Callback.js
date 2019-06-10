// @flow

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(theme => ({
    progress: {
        margin: theme.spacing(2),
    },
}));

const Callback = () => (
    <div className="progress__container">
        <CircularProgress  />
    </div>
);

export default Callback;