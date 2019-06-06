/**
 * Header and controls
 */

// @flow
import * as React from 'react';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
// import FormLabel from '@material-ui/core/FormLabel';
// import FormControl from '@material-ui/core/FormControl';
// import FormGroup from '@material-ui/core/FormGroup';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';

import MyCogsFilter from './MyCogsFilter';


type Props = {
    handleAuth: any,
    isAuthenticated?: boolean,
    userIdentity: Object,
}

export class MyCogsHeader extends React.Component<Props>{

    // constructor (props:any){
    //     super(props);
    // }

    componentDidMount() {
    }

    componentDidUpdate(prevProps:any, prevState:any, snapshot:any) {
        console.log('Header componentDidUpdate state',this.props.userIdentity ? this.props.userIdentity : null);
    }

    render() {
        return (
            <>
            {this.props.isAuthenticated
                ?
                <>
                    <h1>Welcome { this.props.userIdentity.username }</h1>
                    <Button variant="contained" color="primary" onClick={this.props.handleAuth}>Log Out</Button>
                    <MyCogsFilter />
                </>
                :
                <Box display="flex"><Button variant="contained" color="primary" onClick={this.props.handleAuth}>Discogs Log In</Button></Box>
            }
            </>
        );
    }
}