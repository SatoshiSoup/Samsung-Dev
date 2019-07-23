
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
import ImagesScreen from "../../screens/ImagesScreen";
import ProfileScreen from "../../screens/ProfileScreen";
import SearchScreen from "../../screens/SearchScreen";

const ImagesStack = createStackNavigator({
    ImagesScreen
    // Profile: {
    //     screen: ProfileScreen
    // },
    // Search: {
    //     screen: SearchScreen
    // }
}, {
        cardStyle: { backgroundColor: '#090A21' },
        headerMode: 'none'
    });

export default ImagesStack;


