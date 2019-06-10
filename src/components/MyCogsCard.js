/**
 * Receives props from its parent and displays information about the release
 */
// @flow
import * as React from 'react';

type Props = {
    releaseData: any,
};

class MyCogsCard extends React.Component<Props>{
    //
    // constructor (props:any){
    //     super(props);
    // }

    componentDidUpdate(prevProps:any, prevState:any, snapshot:any) {
        console.log('MyCogsCollection componentDidUpdate props',this.props.releaseData);
    }

    render() {

        const cardStyle = {
            backgroundImage: `url("${this.props.releaseData.basic_information.cover_image}")`,
            backgroundSize: `cover`,
        };

        return (
            <div className="cogs_card" style={cardStyle}>
                <div className="cogs_card__details">
                    <div className="cogs_card__details_title" data-release_label={this.props.releaseData.basic_information.labels[0].name}>{this.props.releaseData.basic_information.title}</div>
                </div>
            </div>
        );
    }
}

export default MyCogsCard;