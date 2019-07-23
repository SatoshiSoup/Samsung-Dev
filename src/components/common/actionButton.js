import React from "react";
import {
    View,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import { Icon } from "@up-shared/components";

import Menu, { MenuItem, MenuDivider } from './Popup';

class ActionButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
        };
    }

    _menu = null;

    setMenuRef = ref => {
        this._menu = ref;
    };

    hideMenu = () => {
        this._menu.hide();
    };

    showMenu = () => {
        this._menu.show();
    };


    render() {
        return (

            <View style={styles.addContainer}>
                <Menu
                    ref={this.setMenuRef}
                    button={<TouchableOpacity onPress={() => this.showMenu()} >
                        <View style={{ padding: 10 }}>
                            <Icon name="add" size={16} color="#FFFFFF" />
                        </View>
                    </TouchableOpacity>}
                >
                    {!this.props.isFilesScreen ? <MenuItem onPress={() => {
                        this.hideMenu();
                        this.props.showCreateBucketInput();
                    }} icon="folder-plus">Create Folder</MenuItem> : null}
                    <MenuItem onPress={this.hideMenu} icon="upload2">Upload</MenuItem>
                    <MenuItem onPress={() => {
                        this.hideMenu();
                    }} icon="camera">Take Photo</MenuItem>
                </Menu>
            </View>
        );
    }
}


export default ActionButton;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#090A21",
        flex: 1
    },
    actionButtonIcon: {
        fontSize: 26,
        height: 28,
        color: 'white',
    },
    addContainer: {
        position: "absolute",
        bottom: 70,
        right: 23,
        width: 50,
        height: 50,
        backgroundColor: "#0074DB",
        borderRadius: 25,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    absoluteBottomRight: {
        position: "absolute",
        bottom: 0,
        right: 0
    },
    absoluteBottomLeft: {
        position: "absolute",
        bottom: 0,
        left: 0
    }
});
