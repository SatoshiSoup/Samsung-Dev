import { StackActions, NavigationActions } from 'react-navigation';



import {
    SET_ACTIVE_SCREEN
} from './navReducerConstants';



export function navigateBack() {
    return NavigationActions.back();
}

export const setActiveScreen = (activeScreen) => {
    return { type: SET_ACTIVE_SCREEN, payload: { activeScreen } }
}

export const backFolderScreen = (navigation) => {
    return async dispatch => {
        navigation.dispatch(StackActions.reset(
            {
                index: 0,
                actions: [
                    NavigationActions.navigate({ routeName: 'FolderScreen' })
                ]
            }));
            
        dispatch(setActiveScreen('FolderScreen'));
        
    }
}


