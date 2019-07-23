

import {
    SET_ACTIVE_SCREEN
} from './navReducerConstants';

const initialState = {
    activeScreen: null,
};

const navReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ACTIVE_SCREEN:
            return { ...state, activeScreen: action.payload.activeScreen };
        default:
            return state;
    }
};

export default navReducer;
