import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Fonts from "../../../utils/Font";
import FolderItem from "../common/FolderItem";
class FolderSection extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.categoryContainer}>
          <Text style={styles.categoryText}>Folder (12)</Text>
        </View>
        <View style={styles.itemContainer}>
          <View style={styles.folderItemContainer}>
            <FolderItem name="Wedding Anniversary" date="9 Jun 2019" />
          </View>
          <View style={styles.folderItemContainer}>
            <FolderItem name="Wedding Anniversary" date="9 Jun 2019" />
          </View>
          <View style={styles.viewMoreContainer}>
            <TouchableOpacity>
              <Text style={styles.viewMoreText}>View more</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

export default FolderSection;
const styles = StyleSheet.create({
  container: {
    display: "flex"
  },
  categoryText: {
    fontFamily: Fonts.RobotoRegular,
    fontSize: 14,
    color: "#BFBFBF",
    paddingLeft: 20,
    paddingBottom: 8
  },
  categoryContainer: {},
  itemContainer: {
    backgroundColor: "#202438",
    borderRadius: 26,
    display: "flex"
  },
  viewMoreText: {
    fontFamily: Fonts.RobotoRegular,
    fontSize: 16,
    color: "#0074DB",
    paddingBottom: 15,
    paddingTop: 5
  },
  viewMoreContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  folderItemContainer: {
    paddingLeft: 23
  }
});
