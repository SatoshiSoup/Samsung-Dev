import React from "react";
import { View, Text, StyleSheet, Animated, Image } from "react-native";
//import Image from "react-native-image-progress";
import SpinnerFadingCircleAlt from "../common/SpinnerFadingCircleAlt";
import Fonts from "../../../utils/Font";
class PersonalInfo extends React.Component {
  render() {
    return (
      <View style={styles.conatiner}>
        <View style={{}}>
          <Image
            source={{ uri: "http://loremflickr.com/640/480/dog" }}
            indicator={SpinnerFadingCircleAlt}
            style={{
              width: 74,
              height: 74,
              borderRadius: this.props.radius
            }}
          />
        </View>
        <View>
          <Text style={styles.nameText}>Ashley</Text>
        </View>
        <View>
          <Text style={styles.emailText}>ashleyjames@gmail.com</Text>
        </View>
      </View>
    );
  }
}
export default PersonalInfo;
const styles = StyleSheet.create({
  conatiner: {
    height: 250,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  nameText: {
    fontFamily: Fonts.RobotoLight,
    fontSize: 30,
    color: "#FFFFFF",
    paddingTop: 12,
    paddingBottom: 9
  },
  emailText: {
    fontFamily: Fonts.RobotoRegular,
    fontSize: 13,
    color: "#0074DB"
  }
});
