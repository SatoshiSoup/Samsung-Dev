import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Icon } from "@up-shared/components";
import * as Progress from "react-native-progress";
import Fonts from "../../../utils/Font";
class DetailsItem extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View>
          <Icon name={this.props.name} size={17} color="#0095D2" />
        </View>
        <View style={styles.rightContainer}>
          <View>
            <Text style={styles.nameText}>{this.props.name}</Text>
          </View>
          <View style={styles.rightBottomContainer}>
            <View>
              <Text style={styles.valueText}>{this.props.value}</Text>
            </View>
            <View>
              <Progress.Bar
                progress={this.props.progressValue}
                height={3}
                width={190}
                color="#0074DB"
                unfilledColor="#FFFFFF"
                borderWidth={0}
                borderRadius={20}
              />
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export default DetailsItem;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 35,
    paddingLeft: 20,
    paddingBottom: 27,
    paddingTop: 10
  },
  rightContainer: {
    display: "flex",
    paddingLeft: 18
  },
  rightBottomContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 8
  },
  nameText: {
    fontFamily: Fonts.RobotoLight,
    fontSize: 10,
    color: "#BFBFBF"
  },
  valueText: {
    fontFamily: Fonts.RobotoRegular,
    fontSize: 14,
    color: "#FAF9FE",
    paddingRight: 28
  }
});
