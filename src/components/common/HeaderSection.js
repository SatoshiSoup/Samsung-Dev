import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Fonts from "../../../utils/Font";
class HeaderSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.headingText}>{this.props.heading}</Text>
        </View>
        <View>
          <Text style={styles.countText}>
            {this.props.count ? `${this.props.count} Files` : null}
          </Text>
        </View>
      </View>
    );
  }
}
export default HeaderSection;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: 190,
    backgroundColor: "#090A21"
  },
  headingText: {
    fontFamily: Fonts.RobotoLight,
    fontSize: 30,
    color: "#FFFFFF"
  },
  countText: {
    fontFamily: Fonts.RobotoRegular,
    fontSize: 12,
    color: "#BFBFBF"
  }
});
