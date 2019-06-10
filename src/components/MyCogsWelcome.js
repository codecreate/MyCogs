// This is the welcome screen and login for the app

// @flow
import * as React from 'react';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

type Props = {
    handleAuth: any,
}

export class MyCogsWelcome extends React.Component<Props> {

    // constructor (props:any){
    //     super(props);
    // }

    componentDidMount() {
    }

    componentDidUpdate(prevProps: any, prevState: any, snapshot: any) {
    }

    render() {
        return (
            <section className="welcome">
                <h1 color="primary">Welcome to MyCogs</h1>
                <Box>
                    <p>MyCogs is a simple application that allows you to browse, filter and query your Discogs
                        collection using a visual interface of the record labels, kind of like flicking through an
                        enormous record box containing your entire collection.</p>
                    <p>Get started by clicking the button below to login and authorise the app to connect up to your
                        Discogs account.</p>
                </Box>
                <Box><Button variant="contained" color="primary" onClick={this.props.handleAuth}>Discogs
                    Authorisation</Button></Box>
            </section>
        );
    }
}