
import {MY_COGS_ADD_COLLECTION, MY_COGS_ADD_LABEL, MY_COGS_FILTER_COLLECTION } from '../actions/actionTypes';

const initialState = {
    loadedCollection: [],
    loadedLabels: [],
    filterLabelIDs: [],
};

const myCogsCollectionReducer = (state = initialState, action) => {
    switch (action.type) {
        // add collection simply appends the new incoming collection to the existing collection
        case MY_COGS_ADD_COLLECTION: {
            const { loadedCollection } = action.payload;
            return {
                ...state,
                loadedCollection:[...state.loadedCollection, ...loadedCollection]
            }
        }
        case MY_COGS_ADD_LABEL: {
            // add label discovers unique labels and adds them to the loadedLabels
            const { loadedCollection } = action.payload;
            const uniqueLabels = [];
            const map = new Map();
            for (const item of loadedCollection) {
                if(!map.has(item.basic_information.labels[0].id)){
                    map.set(item.basic_information.labels[0].id, true);    // set any value to Map
                    uniqueLabels.push({
                        id: item.basic_information.labels[0].id,
                        name: item.basic_information.labels[0].name
                    });
                }
            }
            return {
                ...state,
                loadedLabels:[...state.loadedLabels, ...uniqueLabels]
            }
        }
        case MY_COGS_FILTER_COLLECTION: {
            // adds or removes filter ids to the filter id array so that the display can respond
            const { filterLabelIDs } = action.payload;
            return {
                ...state,
                filterLabelIDs: state.filterLabelIDs.includes(filterLabelIDs) ? state.filterLabelIDs.filter(item => item != filterLabelIDs )  : [...state.filterLabelIDs, filterLabelIDs]
            }
        }
        default: {
            return state;
        }
    }
};

export default myCogsCollectionReducer;