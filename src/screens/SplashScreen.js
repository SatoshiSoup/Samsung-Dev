import React from "react";
import { View, StyleSheet, Image } from "react-native";
import CustomStatusBar from "../components/common/CustomStatusBar";
import NetInfo from "@react-native-community/netinfo";
//storj modules
import StorjLib from '../Utils/storjModule';
import { getFirstAction, setFirstAction } from '../Utils/asyncStorageModule';
import SyncModule from "../Utils/syncModule";

class SplashScreen extends React.Component {
  componentWillMount() {
    const subscription = NetInfo.addEventListener(
      "connectionChange",
      this.handleFirstConnectivityChange
    );
    setTimeout(async () => {
      var status = await this.authenticate()
      if (status) {
        this.props.navigation.navigate("InitialScreen");
      } else {
        this.props.navigation.navigate("InvalidScreen");
      }
    }, 2000);
  }


  componentWillUnmount() {
    NetInfo.removeEventListener('connectionChange', this.handleConnectionChange);
  }


  handleFirstConnectivityChange = data => {
    console.log("Connection type", data.type);
    console.log("Connection effective type", data.effectiveType);
  };


  async authenticate() {

    if (await StorjLib.keysExists())
      return true;

    let apikey = "13YqfuuPUtsXUAPL7Q8jtb2jWkS4PhLCeofxJsGBvuvuuReZ3KdFbkSqTJwwAifhcUniehsdNVgUySLwxDK3XCbXMLkEPq9bckgQ2hW";
    let encryptionkey = "12VuKhQiux2fP8i6YCYAD7whhecLNL1iHbh643UixMsb38hNs1BxQ";
    let areCredentialsValid = await StorjLib.verifyKeys(
      apikey,
      encryptionkey);

    if (!areCredentialsValid.isSuccess) {

      // switch (areCredentialsValid.error.errorCode) {
      //   case 403: this.props.setEmailNotConfirmed();
      //     break;
      //   case 401: this.props.setAccountNotExist();
      //     break;
      //   default: this.props.redirectToAuthFailureScreen({
      //     mainText: infoScreensConstants.loginFailureMainText,
      //     additionalText: infoScreensConstants.loginFailureAdditionalText
      //   });
      // }

      // this.props.loginError();

      return false;
    }

    let areKeysImported = await StorjLib.importKeys(
      apikey,
      encryptionkey,
      ''
    );

    if (areKeysImported) {
      console.log(areKeysImported);
      await this.handleFirstLaunch(apikey);
      return true;
    }
    return false;
  };

  async handleFirstLaunch(apikey) {
    if (!await getFirstAction()) {
      await setFirstAction();
    }

    SyncModule.insertSyncSetting(apikey);
  };

  render() {
    return (
      <React.Fragment>
        <CustomStatusBar />
        <View style={styles.container}>
          <View>
            <Image
              style={{ width: 151, height: 56 }}
              source={require("../../assets/images/splash.png")}
            />
          </View>
        </View>
      </React.Fragment>
    );
  }
}

export default SplashScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#090A21",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  }
});
