import React, { Component } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from "react-native";
import {
    createBottomTabNavigator, createSwitchNavigator
} from "react-navigation";

import { Icon } from "@up-shared/components";
import { connect } from "react-redux";
import HomeStack from "../../containers/navigators/HomeScreenNavigator";
import ImagesStack from "../../containers/navigators/ImageScreenNavigator";
import FolderStack from "../../containers/navigators/FolderScreenNavigator";
import InitialScreen from "../../screens/InitialScreen";
import Fonts from "../../../utils/Font";

import ActionBar from '../../components/common/ActionBar';
import ActionButton from '../../components/common/actionButton';
import BucketCreateModal from '../../components/common/BucketCreateModal';


import ListItemModel from '../../models/ListItemModel';
import BucketModel from '../../models/BucketModel';

import {
    setNameAlreadyExistException,
    unsetNameAlreadyExistException,
    createBucket,
    getBuckets,
    deleteBucket,

    deselectBucket,
} from '../../store/reducers/Bucket/bucketReducerActions';

import {
    onSingleItemSelected,
    setSelectionId,
    disableSelectionMode,

    showCreateBucketInput,
    hideCreateBucketInput
} from '../../store/reducers/Main/mainReducerActions';
import { SYNC_BUCKETS } from '../../Utils/constants/syncBuckets';
import SyncModule from '../../Utils/syncModule';
import ServiceModule from '../../Utils/serviceModule';

const TabNavigator = createBottomTabNavigator(
    {
        Home: {
            screen: HomeStack,
            navigationOptions: ({ navigation }) => ({})
        },
        Folder: {
            screen: FolderStack,
            navigationOptions: ({ navigation }) => ({})
        },
        Images: {
            screen: ImagesStack,
            navigationOptions: ({ navigation }) => ({})
        }
    },
    {

        backBehavior: "history",
        tabBarOptions: {
            activeTintColor: "#0074DB",
            inactiveTintColor: "#FFFFFF",
            labelStyle: {
                fontSize: 14,
                fontFamily: Fonts.RobotoRegular,
                paddingBottom: 15,
                // paddingTop: 15,
                // textDecorationLine: "underline",
                // textDecorationStyle: "dotted"
            },
            style: {
                backgroundColor: "#090A21",
                // paddingBottom: 15,
                // paddingTop: 15,
                // paddingLeft: Dimensions.get("window").width / 6,
                // paddingRight: Dimensions.get("window").width / 6
            }
        },

    }
);

const MainScreen = TabNavigator;
const { PICTURES } = SYNC_BUCKETS;
class MainScreenContainer extends React.Component {
    static router = {
        ...MainScreen.router,
        getStateForAction: (action, lastState) => {
            // check for custom actions and return a different navigation state.
            return MainScreen.router.getStateForAction(action, lastState);
        },
    };
    constructor(props) {
        super(props);
        this.tryDeleteBuckets = this.tryDeleteBuckets.bind(this);
        this.createBucket = this.createBucket.bind(this);
    }
     componentWillMount() {
     
    }
    componentDidUpdate(lastProps) {
        // Navigation state has changed from lastProps.navigation.state to this.props.navigation.state
    }

  

    async createBucket(name) {
        ServiceModule.createBucket(name);
    }

    // onCreateBucketApply(bucketName) {
    //     this.props.createBucket(bucketName);
    //     this.props.hideCreateBucketInput(); 
    // }

    async deleteBucket(bucket) {
        ServiceModule.deleteBucket(bucket.getId());
    }

    deleteBuckets() {
        this.getSelectedItems(this.props.buckets).forEach(item => {
            if (item.getName() === PICTURES) return; //TODO: we shoul add some notification here

            this.deleteBucket(item);
        });

        // if(this.props.isSingleItemSelected)
        //     this.props.disableSelectionMode();
        if (this.props.isSingleItemSelected) {
            this.deselectBucket();
        }
        this.props.disableSelectionMode();
    }

    tryDeleteBuckets() {
        Alert.alert(
            'Delete permanently?',
            'Are you sure to delete selected buckets permanently?',
            [
                { text: 'Cancel', onPress: () => { }, style: 'cancel' },
                { text: 'Delete', onPress: () => { this.deleteBuckets(); } }
            ],
            { cancelable: false }
        );
    }

    deselectBucket = () => {
        this.props.deselectBucket(this.getSelectedFindItem(this.props.buckets));
    }
    getSelectedFindItem(array) {
        if (!array) return 0;
        return array.find(item => item.entity.id === this.props.selectedItemId);
    }
    getSelectedItems(array) {
        if (!array) return 0;

        return array.filter(item => item.isSelected === true);
    }



    render() {
        const { navigation } = this.props;

        return (
            <View style={{ flex: 1 }}>
                <MainScreen
                    screenProps={null}
                    navigation={navigation} />
                <ActionBar
                    isActionBarShown={this.props.isActionBarShown}
                    disableSelectionMode={this.props.disableSelectionMode}
                    isSingleItemSelected={this.props.isSingleItemSelected}
                    deselectBucket={this.deselectBucket}
                    tryDeleteBuckets={this.tryDeleteBuckets}
                />

                <ActionButton
                    showCreateBucketInput={this.props.showCreateBucketInput}
                    hideCreateBucketInput={this.props.hideCreateBucketInput}
                />
                <BucketCreateModal
                    showCreateBucketInput={this.props.showCreateBucketInput}
                    hideCreateBucketInput={this.props.hideCreateBucketInput}
                    isCreateBucketInputShown={this.props.isCreateBucketInputShown}
                    createBucket={this.createBucket}
                />

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
        );
    }
}

const mapStateToProps = state => {
    return {
        buckets: state.bucketReducer.buckets,
        sortingMode: state.mainReducer.sortingMode,
        activeScreen: state.navReducer.activeScreen,
        isActionBarShown: state.mainReducer.isActionBarShown,

        isSingleItemSelected: state.mainReducer.isSingleItemSelected,
        selectedItemId: state.mainReducer.selectedItemId,

        isCreateBucketInputShown: state.mainReducer.isCreateBucketInputShown,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getBuckets: (buckets) => dispatch(getBuckets(buckets)),
        disableSelectionMode: () => dispatch(disableSelectionMode()),
        deselectBucket: (bucket) => dispatch(deselectBucket(bucket)),

        showCreateBucketInput: () => dispatch(showCreateBucketInput()),
        hideCreateBucketInput: () => dispatch(hideCreateBucketInput()),
    };
};

const TabNavigatorApps = connect(
    mapStateToProps,
    mapDispatchToProps
)(MainScreenContainer);

const MainScreenNavigator = createSwitchNavigator({
    InitialScreen,
    TabNavigatorApps
}, {
        cardStyle: { backgroundColor: '#090A21' },
        headerMode: 'none',

    });



export default MainScreenNavigator;





const styles = StyleSheet.create({
    container: {
        backgroundColor: "#090A21",
        flex: 1
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