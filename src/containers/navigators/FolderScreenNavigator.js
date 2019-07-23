
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import {
    createStackNavigator,
} from "react-navigation";
import {
    View, StyleSheet, Image
} from "react-native";

import NavSection from "../../components/NavigationHeader/NavSection";
import HeaderSection from "../../components/NavigationHeader/HeaderSection";


import { connect } from "react-redux";
import FolderScreen from "../../screens/FolderScreen";
import FilesScreen from "../../screens/FilesScreen";
import ProfileScreen from "../../screens/ProfileScreen";
import SearchScreen from "../../screens/SearchScreen";

import { StackActions, NavigationActions } from 'react-navigation';


const FolderContainer = createStackNavigator({
    FolderScreen,
    FilesScreen
    // Profile: {
    //     screen: ProfileScreen,

    // },
    // Search: {
    //     screen: SearchScreen,

    // }
}, {
        cardStyle: { backgroundColor: '#090A21' },
        headerMode: 'none',
        navigationOptions: {
            gesturesEnabled: false
        },

    });


class FolderScreens extends React.Component {
    static router = {
        ...FolderContainer.router,
        getStateForAction: (action, lastState) => {
            // check for custom actions and return a different navigation state.
            return FolderContainer.router.getStateForAction(action, lastState);
        },
    };
    constructor(props) {
        super(props);
    }
    componentWillMount() {

    }
    componentDidUpdate(lastProps) {
        // console.log(lastProps.navigation.state, 'xx');

        // Navigation state has changed from lastProps.navigation.state to this.props.navigation.state
    }



    render() {
        const { navigation } = this.props;

        return (
            <View style={{ position: "relative", flex: 1, backgroundColor: "#090A21" }}>
                <View
                    style={styles.container}
                >
                    
                    <FolderContainer
                        screenProps={null}
                        navigation={navigation} />

                    <View style={styles.absoluteBottomLeft}>
                        <Image
                            source={require("../../../assets/images/leftbottomcurv.png")}
                            style={{ width: 28, height: 28 }}
                        />
                    </View>
                    <View style={styles.absoluteBottomRight}>
                        <Image
                            source={require("../../../assets/images/rightbottomcurv.png")}
                            style={{ width: 28, height: 28 }}
                        />
                    </View>
                </View>

            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
        activeScreen: state.navReducer.activeScreen,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        backFolderScreen: (navigation) => dispatch(backFolderScreen(navigation)),
    };
};

const FolderStack = connect(
    mapStateToProps,
    mapDispatchToProps
)(FolderScreens);



const styles = StyleSheet.create({
    container: {
        backgroundColor: "#090A21",
        flex: 1
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


export default FolderStack;


