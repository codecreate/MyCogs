import { MY_COGS_ADD_COLLECTION, MY_COGS_ADD_LABEL, MY_COGS_FILTER_COLLECTION } from "./actionTypes";


export const myCogsAddCollection = loadedCollection => ({
    type: MY_COGS_ADD_COLLECTION,
    payload: {loadedCollection}
});

export const myCogsAddLabel = loadedCollection => ({
    type: MY_COGS_ADD_LABEL,
    payload: {loadedCollection}
});

export const myCogsFilterCollection = filterLabelIDs => ({
    type: MY_COGS_FILTER_COLLECTION,
    payload: {filterLabelIDs}
});
