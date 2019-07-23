

import {
    SET_LOADING,
    UNSET_LOADING,
    PUSH_LOADING,
    POP_LOADING,
    SET_IS_CONNECTED,
    SET_SORTING,
    SINGLE_ITEM_ACTIONS_SELECTED,
    SHOW_ACTION_BAR,
    HIDE_ACTION_BAR,
    SET_SELECTION_ID,
    DISABLE_SELECTION_MODE,

    SHOW_CREATE_BUCKET_INPUT,
    HIDE_CREATE_BUCKET_INPUT,
} from './mainReducerConstants';

import LoadingStack from "../../../Utils/loadingStack";
import SORTING from '../../../Utils/constants/sortingConstants';

const initialState = {
    isLoading: false,
    loadingStack: [],
    isConnected: true,
    sortingMode: SORTING.BY_DATE,
    isSingleItemSelected: false,
    isActionBarShown: false,
    selectedItemId: null,
    isSelectionMode: false,

    isCreateBucketInputShown: false
};

const mainReducer = (state = initialState, action) => {
    const loadingStack = new LoadingStack(state.loadingStack);
    switch (action.type) {
        case SET_IS_CONNECTED:
            return { ...state, isConnected: action.payload.isConnected };
        case SET_LOADING:
            return { ...state, isLoading: true };
        case UNSET_LOADING:
            return { ...state, isLoading: false };
        case PUSH_LOADING:
            return { ...state, loadingStack: loadingStack.setLoading(action.payload.value) };
        case POP_LOADING:
            return { ...state, loadingStack: loadingStack.unsetLoading(action.payload.value) };
        case SET_SORTING:
            return { ...state, sortingMode: action.payload.sortingMode };
        case SINGLE_ITEM_ACTIONS_SELECTED:
            return { ...state, isSingleItemSelected: true, isActionBarShown: true };
        case SET_SELECTION_ID:
            return { ...state, selectedItemId: action.payload.id };
        case SHOW_ACTION_BAR:
            return { ...state, isActionBarShown: true };
        case HIDE_ACTION_BAR:
            return { ...state, isActionBarShown: false };
        case DISABLE_SELECTION_MODE:
            return { ...state, isSingleItemSelected: false, isActionBarShown: false, isSelectionMode: false, selectedItemId: null };

        case SHOW_CREATE_BUCKET_INPUT:
            return { ...state, isCreateBucketInputShown: true };
        case HIDE_CREATE_BUCKET_INPUT:
            return { ...state, isCreateBucketInputShown: false };

        default:
            return state;
    }
};

export default mainReducer;
