import React from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image
} from "react-native";
import { Icon } from "@up-shared/components";
import NavSection from "../components/common/NavSection";
import CustomStatusBar from "../components/common/CustomStatusBar";
import HeaderSection from "../components/common/HeaderSection";
import DirectoryList from "../components/images/DirectoryList";
import { OrientationChangeProvider } from "react-native-orientation-change-provider";




class ImagesScreen extends React.Component {

  constructor(props) {
    super(props);

  }

  componentWillMount = () => {



  }





  render() {
    return (
      <View style={{ position: "relative", flex: 1, backgroundColor: "#090A21" }}>

       
        <CustomStatusBar />

        <View
          style={styles.container}
        >


          <HeaderSection heading="Images" count={200} />
          <NavSection navigation={this.props.navigation} />

          <OrientationChangeProvider>
            <DirectoryList />
          </OrientationChangeProvider>
        </View>

        
        <View style={styles.absoluteBottomLeft}>
          <Image
            source={require("../../assets/images/leftbottomcurv.png")}
            style={{ width: 28, height: 28 }}
          />
        </View>
        <View style={styles.absoluteBottomRight}>
          <Image
            source={require("../../assets/images/rightbottomcurv.png")}
            style={{ width: 28, height: 28 }}
          />
        </View>
      </View>
    );
  }
}
export default ImagesScreen;
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
    justifyContent: "center"
  },
  absoluteBottomLeft: {
    position: "absolute",
    bottom: 0,
    left: 0
  },
  absoluteBottomRight: {
    position: "absolute",
    bottom: 0,
    right: 0
  }
});
