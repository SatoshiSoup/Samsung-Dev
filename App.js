/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import AppContainer from "./src/containers/AppContainer";
import { Provider } from "react-redux";
import store from "./src/store/configureStore";

export default class App extends Component {
  constructor() {
		super();				
		global.btoa = require('base-64').encode;
		global.atob = require('base-64').decode;
	};
  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );

  }
}
