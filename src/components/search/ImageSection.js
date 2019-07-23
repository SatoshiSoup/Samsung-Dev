import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import ImageItem from "../common/ImageItem";
import Fonts from "../../../utils/Font";
class ImageSection extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.categoryText}>Image (12)</Text>
        </View>
        <View style={styles.itemContainer}>
          <View style={styles.imageItemContainer}>
            <ImageItem
              icon={require(`../../../assets/images/Image20.png`)}
              name="Ashley’s dance.png"
              date="9 Jun 2019"
            />
          </View>
          <View style={styles.imageItemContainer}>
            <ImageItem
              icon={require(`../../../assets/images/Image19.png`)}
              name="Ashley’s dance.png"
              date="9 Jun 2019"
            />
          </View>
          <View style={styles.viewMoreContainer}>
            <View>
              <TouchableOpacity>
                <Text style={styles.viewMoreText}>View more</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export default ImageSection;
const styles = StyleSheet.create({
  container: {
    display: "flex"
  },
  itemContainer: {
    display: "flex",
    backgroundColor: "#202438",
    borderRadius: 26
  },
  categoryText: {
    fontFamily: Fonts.RobotoRegular,
    fontSize: 14,
    color: "#BFBFBF",
    paddingLeft: 20,
    paddingBottom: 8
  },
  viewMoreContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center"
  },
  viewMoreText: {
    fontFamily: Fonts.RobotoRegular,
    fontSize: 16,
    color: "#0074DB",
    paddingTop: 5,
    paddingBottom: 15
  },
  imageItemContainer: {
    paddingLeft: 23
  }
});
