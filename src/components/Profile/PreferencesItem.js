import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import Fonts from "../../../utils/Font";
import { Icon } from "@up-shared/components";
class PreferencesItem extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View>
          <Icon name={this.props.icon} size={15} color="#0095D2" />
        </View>
        <View>
          <Text style={styles.nameText}>{this.props.name}</Text>
        </View>
      </View>
    );
  }
}
export default PreferencesItem;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 15,
    paddingBottom: 15
  },
  nameText: {
    fontFamily: Fonts.RobotoRegular,
    fontSize: 14,
    color: "#FAF9FE",
    paddingLeft: 15
  }
});
