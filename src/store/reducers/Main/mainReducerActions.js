import {
    SET_LOADING,
    UNSET_LOADING,
    PUSH_LOADING,
    POP_LOADING,
    SET_IS_CONNECTED,
    SINGLE_ITEM_ACTIONS_SELECTED,
    SHOW_ACTION_BAR,
    HIDE_ACTION_BAR,
    SET_SELECTION_ID,
    DISABLE_SELECTION_MODE,

    SHOW_CREATE_BUCKET_INPUT,
    HIDE_CREATE_BUCKET_INPUT,

} from './mainReducerConstants';


export const setLoading = () => {
    return { type: SET_LOADING };
}

export const unsetLoading = () => {
    return { type: UNSET_LOADING };
}
export const pushLoading = (value) => {
    return { type: PUSH_LOADING, payload: { value } };
}

export const popLoading = (value) => {
    return { type: POP_LOADING, payload: { value } };
}
export const setIsConnected = (isConnected) => {
    return { type: SET_IS_CONNECTED, payload: { isConnected } };
}
export const setSorting = (sortingMode) => {
    return { type: SET_SORTING, payload: { sortingMode } }
}

export const showActionBar = () => {
    return { type: SHOW_ACTION_BAR };
}

export const hideActionBar = () => {
    return { type: HIDE_ACTION_BAR };
}

export const onSingleItemSelected = () => {
    return { type: SINGLE_ITEM_ACTIONS_SELECTED };
}
export const setSelectionId = (id) => {
    return { type: SET_SELECTION_ID, payload: { id } }
}

export const disableSelectionMode = () => {
    return { type: DISABLE_SELECTION_MODE };
}


export const showCreateBucketInput = () => {
    return { type: SHOW_CREATE_BUCKET_INPUT };
}

export const hideCreateBucketInput = () => {
    return { type: HIDE_CREATE_BUCKET_INPUT };
}


