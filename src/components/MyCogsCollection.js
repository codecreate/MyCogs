/**
 * Receives props from the app and displays the collection accordingly
 */

// @flow
import * as React from 'react';
import MyCogsCard from './MyCogsCard';

type Props = {
    userCollection: Object,
}

export class MyCogsCollection extends React.Component<Props> {

    // constructor(Props:props) {
    //     super(props);
    // }

    // componentDidMount() {
    // }

    // componentDidUpdate(prevProps, prevState, snapshot) {
    // }

    render() {
        const {userCollection} = this.props;
        return (
            <div className="cogsCollection">
                {
                    userCollection &&
                    userCollection.map((releaseData, i) => (
                        <MyCogsCard key={"release_" + i} releaseData={releaseData}/>
                    ))
                }
            </div>
        );
    }
}