import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Fonts from "../../../utils/Font";
import PreferencesItem from "../Profile/PreferencesItem";
class Preferences extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.preferencesText}>Preferences</Text>
        </View>
        <View style={styles.itemContainer}>
          <PreferencesItem icon="padlock" name="Secret phrase" />
          <PreferencesItem icon="settings" name="Settings" />
        </View>
      </View>
    );
  }
}

export default Preferences;
const styles = StyleSheet.create({
  container: {
    display: "flex"
  },
  preferencesText: {
    fontFamily: Fonts.RobotoRegular,
    fontSize: 14,
    color: "#BFBFBF",
    paddingLeft: 20
  },
  itemContainer: {
    backgroundColor: "#202438",
    borderRadius: 26,
    marginTop: 20,
    marginBottom: 20,
    paddingLeft: 23,
    paddingTop: 15,
    paddingBottom: 15
  }
});
