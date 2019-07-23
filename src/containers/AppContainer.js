/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import {
  createAppContainer,
  createSwitchNavigator,
  createStackNavigator
} from "react-navigation";
import MainScreenNavigator from "./navigators/MainScreenNavigator";
import WarningComponent from "../components/common/WarningComponent";
import {
  View,
  Text,
  BackHandler,
  Platform,
  DeviceEventEmitter,
  NativeEventEmitter,
  StyleSheet
} from "react-native";
import { connect } from "react-redux";
import NetInfo from "@react-native-community/netinfo";

import SplashScreen from "../screens/SplashScreen";
import InvalidScreen from "../screens/InvalidScreen";

import ListItemModel from '../models/ListItemModel';
import BucketModel from '../models/BucketModel';
import FileModel from '../models/FileModel';

import SyncModule from '../Utils/syncModule';
import ServiceModule from '../Utils/serviceModule';

import { statusBarHeightIos } from "../Utils/adaptive";
import eventNames from '../Utils/constants/eventNames';

//reducers
import {
  setLoading,
  unsetLoading,
  popLoading,
  setIsConnected
} from '../store/reducers/Main/mainReducerActions';


import {
  setNameAlreadyExistException,
  unsetNameAlreadyExistException,
  createBucket,
  getBuckets,
  deleteBucket
} from '../store/reducers/Bucket/bucketReducerActions';



const switchNavigator = createSwitchNavigator(
  {
    SplashScreen: {
      screen: SplashScreen,
      navigationOptions: ({ navigation }) => ({
        header: null
      })
    },
    Home: {
      screen: MainScreenNavigator,
      navigationOptions: ({ navigation }) => ({
        header: null
      })
    }, InvalidScreen: {
      screen: InvalidScreen,
      navigationOptions: ({ navigation }) => ({
        header: null
      })
    },
  },
  {
    initialRouteName: "SplashScreen",
  }
);



const NavigationContainer = switchNavigator;




class Apps extends React.Component {
  static router = {
    ...NavigationContainer.router,
    getStateForAction: (action, lastState) => {
      // check for custom actions and return a different navigation state.
      return NavigationContainer.router.getStateForAction(action, lastState);
    },
  };
  constructor(props) {
    super(props);

    this.getbucketsListener = null;
    this.bucketCreatedListener = null;
    this.bucketDeletedListener = null;

    this.isAndroid = Platform.OS === "android";
    this.timer = null;
  }
  componentDidUpdate(lastProps) {
    // Navigation state has changed from lastProps.navigation.state to this.props.navigation.state
  }
  async componentWillMount() {
    let eventEmitter = this.isAndroid ? DeviceEventEmitter : new NativeEventEmitter(ServiceModule.getServiceNativeModule());
    this.getbucketsListener = eventEmitter.addListener(eventNames.EVENT_BUCKETS_UPDATED, this.onBucketsReceived.bind(this));
    this.bucketCreatedListener = eventEmitter.addListener(eventNames.EVENT_BUCKET_CREATED, this.onBucketCreated.bind(this));
    this.bucketDeletedListener = eventEmitter.addListener(eventNames.EVENT_BUCKET_DELETED, this.onBucketDeleted.bind(this));

    NetInfo.isConnected.fetch().then(isConnected => {
      this.props.setIsConnected(isConnected);
    });

    NetInfo.isConnected.addEventListener('connectionChange', this.onConnectionChange.bind(this));



    if (this.isAndroid) {
      await ServiceModule.bindGetBucketsService();
      await ServiceModule.bindDownloadService();
    }

  }


  onConnectionChange(isConnected) {

    this.props.setIsConnected(isConnected);

    if (!isConnected) {

    }
  }

  onBucketCreated(response) {
    if (response.isSuccess) {
      this.props.createBucket(new ListItemModel(new BucketModel(JSON.parse(response.result))));
    } else {
      switch (response.error.errorCode) {
        case 409:
          this.props.setNameAlreadyExistException();
          this.timer = setTimeout(this.unsetNameAlreadyExistException.bind(this), 3000);
          break;
        case 10006:
          this.props.setNameAlreadyExistException(); //TODO: add internet exc
          this.timer = setTimeout(this.unsetNameAlreadyExistException.bind(this), 3000);
          break;
        default:
          this.props.setNameAlreadyExistException(); //TODO: add default exc
          this.timer = setTimeout(this.unsetNameAlreadyExistException.bind(this), 3000);
          break;
      }
    }
  }
  async onBucketsReceived() {

    this.props.setLoading();
    let bucketsResponse = await SyncModule.listBuckets(this.props.sortingMode);

    if (bucketsResponse.isSuccess) {
      let buckets = JSON.parse(bucketsResponse.result).map((file) => {
        return new ListItemModel(new BucketModel(file));
      });

      ServiceModule.createBaseBuckets(buckets);

      this.props.getBuckets(buckets);
    }

    this.props.unsetLoading();
  }
  onBucketDeleted(response) {
    if (response.isSuccess) {
      this.props.deleteBucket(response.result);
    }
  }

  unsetNameAlreadyExistException() {
    this.props.unsetNameAlreadyExistException();
    clearTimeout(this.timer);
  }

  unsetInternetConnectionException() {
    this.props.unsetNameAlreadyExistException();
    clearTimeout(this.timer);
  }

  componentWillUnmount() {
    this.getbucketsListener.remove();
    this.bucketCreatedListener.remove();
    this.bucketDeletedListener.remove();
  }

  chooseWarning() {
    let color = '#EB5757';
    let message;

    if (!this.props.isEmailConfirmed) {
      message = 'Please confirm your email';
    } else if (!this.props.isAccountExist) {
      message = 'This account doesn`t exist';
    } else if (this.props.isNameExistException) {
      message = 'Name already used by another bucket';
    } if (!this.props.isConnected) {
      message = 'No internet connection';
    } else {
      color = null;
      message = null;
    }

    return <WarningComponent
      message={message}
      statusBarColor={color} />;
  }
  render() {
    const { navigation } = this.props;

    return (
      <View style={{ flex: 1 }}>
        <NavigationContainer screenProps={null} navigation={navigation} />
        {
          this.chooseWarning()
        }
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    isConnected: state.mainReducer.isConnected,
    isNameExistException: state.bucketReducer.isNameExistException,
    sortingMode: state.mainReducer.sortingMode,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setLoading: () => dispatch(setLoading()),
    unsetLoading: () => dispatch(unsetLoading()),
    popLoading: (value) => dispatch(popLoading(value)),
    setIsConnected: (isConnected) => dispatch(setIsConnected(isConnected)),

    getBuckets: (buckets) => dispatch(getBuckets(buckets)),
    createBucket: (buckets) => dispatch(createBucket(buckets)),
    deleteBucket: (bucketId) => dispatch(deleteBucket(bucketId)),

    setNameAlreadyExistException: () => dispatch(setNameAlreadyExistException()),
    unsetNameAlreadyExistException: () => dispatch(unsetNameAlreadyExistException()),
  };
};

const AppsInit = connect(
  mapStateToProps,
  mapDispatchToProps
)(Apps);



const AppContainer = createAppContainer(AppsInit);
export default AppContainer;