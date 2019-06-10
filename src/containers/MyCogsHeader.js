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

type Props = {
    handleAuth: any,
    isAuthenticated?: boolean,
    userIdentity: Object,
}

export class MyCogsHeader extends React.Component<Props>{

    render() {
        // const classes = useStyles();

        return (
            <>
            {this.props.isAuthenticated
                ?
                <>
                    <AppBar position="static">
                        <Toolbar variant="dense">

                            <IconButton edge="start" color="inherit" aria-label="Menu">
                                <MenuIcon />
                            </IconButton>
                            <MyCogsFilters />
                            <div className="_grow" />
                            <Typography variant="h6" color="inherit">
                                Welcome { this.props.userIdentity.username }
                            </Typography>
                            <Button variant="contained" color="primary" onClick={this.props.handleAuth}>Log Out</Button>

                        </Toolbar>
                    </AppBar>
                </>
                :
                <AppBar position="static">
                    <Toolbar variant="dense">
                        <Button variant="contained" color="primary" onClick={this.props.handleAuth}>Discogs Log In</Button>
                    </Toolbar>
                </AppBar>
            }
            </>
        );
    }
}