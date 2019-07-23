import React from 'react';
import ListItemModel from '../models/ListItemModel';

/** 
 * Base class for all screen containers with lists
*/
class BaseListContainer extends React.Component {
    constructor(props) {
        super(props);
        this.onPress = this.onPress.bind(this);
        this.onDotsPress = this.onDotsPress.bind(this);
    }

    /**
     *Remove standart navigation header 
     */
    static navigationOptions = {
        header: null
    };

    onDotsPress(item) {
        if (this.props.isSingleItemSelected) {
            this.disableSelectionMode();
        } else {
            this.props.onSingleItemSelected(item);
            this._onSelectionPress(item);
            this.props.setSelectionId(item.getId());
        }

    }

    disableSelectionMode() {
        // this.props.setSelectionId(null);
        this.props.disableSelectionMode();
    }

    onPress(item) {

        // if(this.props.isSingleItemSelected) {
        //     this.disableSelectionMode();
        //     return;
        // }

        // if(this.props.isSelectionMode) {                                             
        //     this._onSelectionPress(item);
        //     return;
        // }

        this._onPress(item);
    }

    _onPress(item) { }
    _onSelectionPress(item) { }

    render() {
        return null;
    }
}

export default BaseListContainer;