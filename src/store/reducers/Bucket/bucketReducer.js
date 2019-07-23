
import {
    GET_BUCKETS,
    CREATE_BUCKET,
    DELETE_BUCKET,
    SET_NAME_ALREADY_EXIST_EXCEPTION,
    UNSET_NAME_ALREADY_EXIST_EXCEPTION,

    SELECT_BUCKET,
    DESELECT_BUCKET
} from './bucketReducerConstants';
import ItemManager from '../../../Utils/itemManagers/itemManager';

const initialState = {
    buckets: [],
    isNameExistException: false
};

const bucketReducer = (state = initialState, action) => {
    let bucketsManager = new ItemManager(state.buckets);
    switch (action.type) {
        case SELECT_BUCKET:
            return { ...state, buckets: bucketsManager.changeItemSelectionStatus(action.payload.bucket, true) };
        case DESELECT_BUCKET:
            return { ...state, buckets: bucketsManager.changeItemSelectionStatus(action.payload.bucket, false) };
        case GET_BUCKETS:
            return { ...state, buckets: action.payload.buckets };
        case CREATE_BUCKET:
            return { ...state, buckets: bucketsManager.addItem(action.payload.bucket) };
        case DELETE_BUCKET:
            return { ...state, buckets: bucketsManager.deleteItem(action.payload.bucketId) };
        case SET_NAME_ALREADY_EXIST_EXCEPTION:
            return { ...state, isNameExistException: true };
        case UNSET_NAME_ALREADY_EXIST_EXCEPTION:
            return { ...state, isNameExistException: false };
        default:
            return state;
    }
};

export default bucketReducer;
