// @flow

import React from "react";
import {connect} from "react-redux";

import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Fade from '@material-ui/core/Fade';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import {makeStyles} from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import {myCogsFilterCollection} from "../actions/actions";
import Typography from "@material-ui/core/Typography";

// the first job is to create the filters based on record labels
// then work out how to report the currently checked ones
// pass the action down to the individual checkbox

type Props = {
    labelFilters: any,
    myCogsFilterCollection: any
}

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    paper: {
        marginRight: theme.spacing(2),
        zIndex: 999
    },
    listTitle: {
        display: 'inline',
    },
    button: {
        margin: theme.spacing(1),
    }
}));

const MyCogsFilters = ({labelFilters, myCogsFilterCollection}) => {
    console.log('labelFilters', labelFilters.length);

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);

    function handleToggle() {
        setOpen(prevOpen => !prevOpen);
    }

    function handleClose(event) {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    }

    return (
        <div className="filters">
            <Typography className={classes.listTitle} variant="h6" color="inherit" noWrap>
                Filter your collection by:
            </Typography>
            <Button
                aria-controls="menu-list-grow"
                aria-haspopup="true"
                className={classes.button}
                color="secondary"
                onClick={handleToggle}
                variant="contained"
                ref={anchorRef}
            >
                Labels
            </Button>
            <Popper open={open} anchorEl={anchorRef.current} keepMounted transition >
                {({TransitionProps, placement}) => (
                    <Grow
                        {...TransitionProps}
                        style={{transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom'}}
                    ><Fade {...TransitionProps} timeout={350}>
                        <Paper id="menu-list-grow">
                            <ClickAwayListener onClickAway={handleClose}>
                                {/*<MenuList>*/}
                                {/*    <MenuItem onClick={handleClose}>Profile</MenuItem>*/}
                                {/*    <MenuItem onClick={handleClose}>My account</MenuItem>*/}
                                {/*    <MenuItem onClick={handleClose}>Logout</MenuItem>*/}
                                {/*</MenuList>*/}

                                <MenuList className="filter_labels" width="100%">
                                    {labelFilters && labelFilters.length
                                        // return filterList;
                                        ? labelFilters.map((item, index) => (
                                            <MenuItem>
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        // checked={state.checkedB}
                                                        fontSize="small"
                                                        onChange={() => myCogsFilterCollection(item.id)}
                                                        value={item.id}
                                                        color="primary"
                                                    />
                                                }
                                                label={item.name}
                                            />
                                            </MenuItem>
                                        ))
                                        : ''
                                    }
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Fade>
                    </Grow>
                )}
            </Popper>
            <Button
                aria-controls="menu-list-grow"
                aria-haspopup="true"
                className={classes.button}
                color="secondary"
                onClick={handleToggle}
                variant="contained"
                ref={anchorRef}
            >
                Artists
            </Button>
        </div>

    );
};

const mapStateToProps = state => {
    const labelFilters = state.myCogsCollectionReducer.loadedLabels;
    return {labelFilters};
};

export default connect(
    mapStateToProps,
    {myCogsFilterCollection}
)(MyCogsFilters);