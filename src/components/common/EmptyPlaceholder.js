import React from "react";
import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import Fonts from "../../../utils/Font";
class EmptyPlaceholder extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View>
          <Image
            style={{ width: 160, height: 150 }}
            source={require("../../../assets/images/emptybox.gif")}
          />
        </View>
        <View>
          <Text style={styles.msgText}>There is nothing here</Text>
        </View>
      </View>
    );
  }
}

export default EmptyPlaceholder;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: Dimensions.get("window").height - 380
  },
  msgText: {
    fontFamily: Fonts.RobotoLight,
    fontSize: 14,
    color: "#626271",
    paddingTop: 13
  }
});
