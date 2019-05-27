/**
 * Receives props from its parent and displays information about the release
 */

import React from 'react';

class CogsCard extends React.Component{

    constructor (props){
        super(props);
    }

    componentDidMount() {
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('MyCogsCollection componentDidUpdate props',this.props.collectionData.releases);
    }

    render() {
        return (
            <div className="cogsCard">
                <img src={this.props.releaseData.basic_information.cover_image} />
                    {this.props.releaseData.basic_information.title}
            </div>
        );
    }
}

export default CogsCard;