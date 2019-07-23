import React from "react";
import FolderList from "../components/folder/FolderList";
import { connect } from "react-redux";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Image
} from "react-native";
import NavSection from "../components/NavigationHeader/NavSection";
import HeaderSection from "../components/NavigationHeader/HeaderSection";
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


class FilesScreen extends React.Component {
    constructor(props) {
        super(props);

    }

    componentWillMount = () => {
        this.props.setActiveScreen('FilesScreen');



    }
    componentWillUnmount = () => {
        this.props.setActiveScreen('FolderScreen');



    }

    _header() {
        return (
            <View>
                <HeaderSection heading="My Files" count={70} />
                <NavSection
                    navigation={this.props.navigation}
                    navigationBack={this.props.backFolderScreen}
                    activeScreen={this.props.activeScreen}
                />
            </View>
        );
    }

    render() {
        return (

            <View style={{ flex: 1 }}>
                {this._header()}

            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
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

      backFolderScreen: (navigation) => dispatch(backFolderScreen(navigation)),
    };
  };

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FilesScreen);

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        paddingBottom: 16,
        paddingTop: 16
    },
    contentContainer: {
        display: "flex",
        flexDirection: "column"
    },
    iconcontainer: {
        paddingRight: 20
    },
    nameText: {
        color: "#FAF9FE",
        fontFamily: Fonts.RobotoRegular,
        fontSize: 14,
        paddingBottom: 8
    },
    dateText: {
        color: "#BFBFBF",
        fontFamily: Fonts.RobotoLight,
        fontSize: 10
    }
});


