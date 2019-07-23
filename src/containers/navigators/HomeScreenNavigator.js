
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
    View, StyleSheet,Image
} from "react-native";
import { connect } from "react-redux";

import NavSection from "../../components/NavigationHeader/NavSection";
import HeaderSection from "../../components/NavigationHeader/HeaderSection";
import {
    backFolderScreen
} from '../../store/reducers/Nav/navigationActions';
import RecentList from "../../components/home/RecentList";
import HomeScreen from "../../screens/HomeScreen";
import ProfileScreen from "../../screens/ProfileScreen";
import SearchScreen from "../../screens/SearchScreen";

const HomeContainer = createStackNavigator({
    HomeScreen,
    Profile: {
        screen: ProfileScreen
    },
    // Search: {
    //     screen: SearchScreen
    // }
}, {
        cardStyle: { backgroundColor: '#090A21' },
        headerMode: 'none'
    });



class HomeScreens extends React.Component {
    static router = {
        ...HomeContainer.router,
        getStateForAction: (action, lastState) => {
            // check for custom actions and return a different navigation state.
            return HomeContainer.router.getStateForAction(action, lastState);
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

                    <HomeContainer
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

const HomeStack = connect(
    mapStateToProps,
    mapDispatchToProps
)(HomeScreens);

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

export default HomeStack;


