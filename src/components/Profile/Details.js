import React from "react";
import { View, Text, StyleSheet } from "react-native";
import DetailsItem from "./DetailsItem";
import Fonts from "../../../utils/Font";
class Details extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.detailsText}>Details</Text>
        </View>
        <View style={styles.itemContainer}>
          <DetailsItem name="Storage" value="95.00 GB" progressValue={0.8} />
          <DetailsItem name="Bandwidth" value="10.00 GB" progressValue={0.5} />
        </View>
      </View>
    );
  }
}

export default Details;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#090A21",
    display: "flex"
  },
  detailsText: {
    fontFamily: Fonts.RobotoRegular,
    fontSize: 14,
    color: "#BFBFBF",
    paddingLeft: 20
  },
  itemContainer: {
    backgroundColor: "#202438",
    borderRadius: 26,
    marginTop: 21,
    marginBottom: 36,
    paddingTop: 16
  }
});
