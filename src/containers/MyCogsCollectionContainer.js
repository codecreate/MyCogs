import React from 'react';
import {MyCogsCollection} from '../components/MyCogsCollection.js';

export class MyCogsCollectionContainer extends React.Component {

    constructor(props) {
        super(props);
        this.data = {
            data: []
        }
    }

    componentDidMount() {

    }


    render() {
        console.log('this container here');
        return <MyCogsCollection/>;
    }
}