import React from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  BackHandler
} from "react-native";
import { connect } from "react-redux";
import BucketsListComponent from "../components/buckets/BucketsListComponent";
import BaseListContainer from "../containers/BaseListContainer";
import {
  setActiveScreen
} from '../store/reducers/Nav/navigationActions';
import {
  onSingleItemSelected,
  setSelectionId,
  disableSelectionMode
} from '../store/reducers/Main/mainReducerActions';

import {
  selectBucket,
  deselectBucket,
} from '../store/reducers/Bucket/bucketReducerActions';

import {
  backFolderScreen
} from '../store/reducers/Nav/navigationActions';

import NavSection from "../components/NavigationHeader/NavSection";
import HeaderSection from "../components/NavigationHeader/HeaderSection";
import RecentList from "../components/home/RecentList";

class HomeScreen extends BaseListContainer {


  constructor(props) {
    super(props);

  }
 
  componentWillMount = () => {

    this.props.setActiveScreen('HomeScreen');

  }

  _onSelectionPress(bucket) {
    if (bucket.isSelected)
      this.props.deselectBucket(bucket);
    else
      this.props.selectBucket(bucket);
  }

  _onPress(bucket) {
    //console.log(bucket, 'openbucket');
    this.props.navigation.navigate('FilesScreen');

    // this.props.openBucket(bucket.getId());
    // this.props.navigateToFilesScreen(bucket.getId());    
  }


  _header() {
    return (
      <View>
        <HeaderSection heading="Welcome Jake" count={70} />
        <NavSection
          navigation={this.props.navigation}
          navigationBack={this.props.backFolderScreen}
          activeScreen={this.props.activeScreen}
        />
        <RecentList />
      </View>
    );
  }



  render() {
    return (
      <BucketsListComponent
        onPress={this.onPress}
        onDotsPress={this.onDotsPress}
        disableSelectionMode={this.disableSelectionMode}
        data={this.props.buckets}
        header={this._header()}
      />
    );
  }
}


const mapStateToProps = state => {
  return {
    buckets: state.bucketReducer.buckets,
    activeScreen: state.navReducer.activeScreen,
    isSingleItemSelected: state.mainReducer.isSingleItemSelected,

  };
};

const mapDispatchToProps = dispatch => {
  return {
    setActiveScreen: (activeScreen) => dispatch(setActiveScreen(activeScreen)),
    onSingleItemSelected: (bucket) => dispatch(onSingleItemSelected(bucket)),
    setSelectionId: (id) => dispatch(setSelectionId(id)),
    disableSelectionMode: () => dispatch(disableSelectionMode()),


    selectBucket: (bucket) => dispatch(selectBucket(bucket)),
    deselectBucket: (bucket) => dispatch(deselectBucket(bucket)),
    backFolderScreen: (navigation) => dispatch(backFolderScreen(navigation)),
  };
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen);

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#090A21"
  },
  addContainer: {
    position: "absolute",
    bottom: 23,
    right: 23,
    width: 50,
    height: 50,
    backgroundColor: "#0074DB",
    borderRadius: 25,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10000
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
