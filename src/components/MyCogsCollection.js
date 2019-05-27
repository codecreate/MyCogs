/**
 * Receives props from the app and displays the collection accordingly
 */

import React from 'react';
import CogsCard from './CogsCard';

export class MyCogsCollection extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('MyCogsCollection componentDidUpdate props', this.props.collectionData.releases);
    }

    render() {
        return (
            <div className="cogsCollection">
                {
                    this.props.collectionData.releases &&
                    this.props.collectionData.releases.map((releaseData, i) => (
                        <CogsCard key={"release_" + i} releaseData={releaseData}/>
                    ))}
            </div>
        );
    }
}