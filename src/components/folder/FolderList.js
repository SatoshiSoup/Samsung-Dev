import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import FolderItem from "../common/FolderItem";
import ImageItem from "../common/ImageItem";
class FolderList extends React.Component {
  render() {
    return (
      <ScrollView style={styles.container}>
        <FolderItem name="New year celebration" date="9 Jun 2019" />
        <FolderItem name="Wedding Anniversary" date="9 Jun 2019" />
        <FolderItem name="Jake’s Birthday" date="9 Jun 2019" />
        <FolderItem name="Photo backups" date="9 Jun 2019" />
        <ImageItem
          icon={require(`../../../assets/images/Image19.png`)}
          name="Ashley’s dance.png"
          date="9 Jun 2019"
        />
      </ScrollView>
    );
  }
}

export default FolderList;
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#202438",
    borderRadius: 26,
    flex: 1,
    paddingLeft: 17,
    paddingTop: 15,
    paddingBottom: 15
  }
});
