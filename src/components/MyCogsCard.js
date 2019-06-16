/**
 * Receives props from its parent and displays basic information about the release
 * Additional data retrieved using
 */
// @flow
import * as React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import {myCogsAddRelease} from "../actions/actions";
import {connect} from "react-redux";

const useStyles = makeStyles(theme => ({
    progress: {
        margin: theme.spacing(2),
    },
}));


type Props = {
    releaseData: any,
    myCogsAddRelease: any
};

type State = {
    isLoading: boolean,
};

class MyCogsCard extends React.Component<Props, State> {

    state = {
        isLoading: true,
    };

    componentDidUpdate(prevProps: any, prevState: any, snapshot: any) {
        console.log('MyCogsCollection componentDidUpdate props', this.props.releaseData);
    }

    loadDetails = () => {
        console.log('load more mofo');
        fetch("http://localhost:9000/cogsAPI/release?release_id="+this.props.releaseData.id, {
        })
        .then(res => {
            return res.json();
        })
        .then(res => {
            console.log(res);
            // if these details don't exist in redux add them
            this.props.myCogsAddRelease(res);
        })
        .catch(err => {
            console.log("Booo loadDetails"+err);
        });
    };

    render() {

        const cardStyle = {
            backgroundImage: `url("${this.props.releaseData.basic_information.cover_image}")`,
            backgroundSize: `cover`,
        };

        const hiddenStyle = {
            display: `none`,
        };

        return (

            <div
                className="cogs_card" style={cardStyle}
                onMouseOver={this.loadDetails}
            >

                {this.props.releaseData.basic_information.cover_image.indexOf('spacer.gif') === -1 &&

                    <div className="cogs_card__details__image">
                        < img
                            style={hiddenStyle}
                            src={this.props.releaseData.basic_information.cover_image}
                            onLoad={() => this.setState({isLoading: false})}
                            alt={this.props.releaseData.basic_information.cover_image}
                        />

                        {
                            this.state.isLoading
                                ? <CircularProgress/>
                                : null
                        }
                    </div>
                }
                <div className="cogs_card__details">

                    <div className="cogs_card__details__title">
                        <div
                            className="cogs_card__details_title"
                            data-release_label={this.props.releaseData.basic_information.labels[0].name}
                            data-release_artist={this.props.releaseData.basic_information.artists[0].name}
                        >
                            {this.props.releaseData.basic_information.artists[0].name} - {this.props.releaseData.basic_information.title}

                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default connect(
    null,
    {myCogsAddRelease}
)(MyCogsCard);