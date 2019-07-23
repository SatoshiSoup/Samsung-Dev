import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import Fonts from "../../../utils/Font";

class ImageItem extends React.Component {
  render() {
    return (
      <TouchableOpacity>
        <View style={styles.container}>
          <View style={styles.iconcontainer}>
            <Image
              style={{ width: 20, height: 20, borderRadius: 3 }}
              source={this.props.icon}
            />
          </View>
          <View style={styles.contentContainer}>
            <View>
              <Text style={styles.nameText}>{this.props.name}</Text>
            </View>
            <View>
              <Text style={styles.dateText}>9 Jun 2019</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

export default ImageItem;
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
