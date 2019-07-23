
import {
    GET_BUCKETS,
    CREATE_BUCKET,
    DELETE_BUCKET,

    SET_NAME_ALREADY_EXIST_EXCEPTION,
    UNSET_NAME_ALREADY_EXIST_EXCEPTION,

    SELECT_BUCKET,
    DESELECT_BUCKET
} from './bucketReducerConstants';


export const getBuckets = (buckets) => {
    return { type: GET_BUCKETS, payload: { buckets } };
}

export const createBucket = (bucket) => {
    return { type: CREATE_BUCKET, payload: { bucket } };
}

export const setNameAlreadyExistException = () => {
    return { type: SET_NAME_ALREADY_EXIST_EXCEPTION }
}

export const unsetNameAlreadyExistException = () => {
    return { type: UNSET_NAME_ALREADY_EXIST_EXCEPTION }
}


export const deleteBucket = (bucketId) => {
    return { type: DELETE_BUCKET, payload: { bucketId } };
}

export const selectBucket = (bucket) => {
    return { type: SELECT_BUCKET, payload: { bucket } };
}
export const deselectBucket = (bucket) => {
    return { type: DESELECT_BUCKET, payload: { bucket } };
}