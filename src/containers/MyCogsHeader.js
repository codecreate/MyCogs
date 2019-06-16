/**
 * Header and controls
 */

// @flow
import * as React from 'react';
import Button from '@material-ui/core/Button/index';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { fade } from '@material-ui/core/styles/colorManipulator';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';

import MyCogsFilters from './MyCogsFilters';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    button: {
        margin: theme.spacing(1),
    },
    username: {
        margin: theme.spacing(1),
    },
}));

const MyCogsHeader = (props) => {

    const classes = useStyles();

    return (
        <>
        {props.isAuthenticated
            ?
            <>
                <AppBar position="static">
                    <Toolbar variant="dense">

                        <MyCogsFilters />

                        <div className="_grow" />
                        <Typography className={classes.username} variant="h6" color="inherit">
                            { props.userIdentity.username }
                        </Typography>
                        <Button className={classes.button} variant="contained" color="secondary" onClick={props.handleAuth}>Log Out</Button>

                    </Toolbar>
                </AppBar>
            </>
            :
            null
        }
        </>
    );
};

export default MyCogsHeader;