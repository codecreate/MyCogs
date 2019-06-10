/**
 * Receives props from the app and displays the collection accordingly
 */

// @flow
import * as React from 'react';
import MyCogsCard from '../components/MyCogsCard';
import { connect } from "react-redux";

type Props = {
    loadedCollection: Object,
    filterLabelIDs: Array<number>,
}

class MyCogsCollection extends React.Component<Props> {
    // when rendering the collection consider the filterLabelID from store
    // if the filterLabelID is empty display everything otherwise match on the label id
    // and show only the chosen ones
    render() {
        const {loadedCollection, filterLabelIDs} = this.props;

        // if the length of the filterLabelIDs is more than one
        // search the filterLabelIDs for a match against the label id of the release
        // else display all the loaded releases

        if( filterLabelIDs.length ) {
            // loop only the filterLabelIDs and match on them against the loadedCollection
            return (
            <div className="cogsCollection">
                {
                    loadedCollection.map((releaseData, index) => (
                        filterLabelIDs.length &&
                        Object.values(filterLabelIDs).find(labelID => labelID === releaseData.basic_information.labels[0].id)
                        ?
                        <MyCogsCard key={`release_${index}`} releaseData={releaseData}/>
                        : null

                    ))
                }
            </div>
        );

        }else{

            // loop and show the entire collection
            return (
                <div className="cogsCollection">
                    {
                        loadedCollection.map((releaseData, index) => (
                            <MyCogsCard key={`release_${index}`} releaseData={releaseData}/>
                        ))
                    }
                </div>
            )
        }
    }
};

const mapStateToProps = state => {
    return {
        loadedCollection: state.myCogsCollectionReducer.loadedCollection,
        filterLabelIDs: state.myCogsCollectionReducer.filterLabelIDs,
    };
};

// export default VisibilityFilters;
export default connect(
    mapStateToProps
)(MyCogsCollection);