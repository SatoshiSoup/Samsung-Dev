import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  Dimensions,
  TouchableOpacity
} from "react-native";
import Fonts from "../../../utils/Font";
class DirectoryItem extends React.Component {
  render() {
    const { item } = this.props;
    return Dimensions.get("screen").width < Dimensions.get("screen").height ? (
      <TouchableOpacity>
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <Image
              style={{
                width: Dimensions.get("screen").width / 2 - 5,
                height: Dimensions.get("screen").width / 2 - 5,
                borderRadius: 21
              }}
              source={item.icon}
            />
          </View>
          <View style={styles.center}>
            <Text style={styles.nameText}>{item.name}</Text>
          </View>
          <View style={styles.center}>
            <Text style={styles.countText}>{item.count}</Text>
          </View>
        </View>
      </TouchableOpacity>
    ) : (
      <TouchableOpacity>
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <Image
              style={{
                width: Dimensions.get("screen").width / 3-7 ,
                height: Dimensions.get("screen").width / 3-7 ,
                borderRadius: 21
              }}
              source={item.icon}
            />
          </View>
          <View style={styles.center}>
            <Text style={styles.nameText}>{item.name}</Text>
          </View>
          <View style={styles.center}>
            <Text style={styles.countText}>{item.count}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

export default DirectoryItem;
const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    paddingBottom: 12
  },
  nameText: {
    fontFamily: Fonts.RobotoRegular,
    fontSize: 14,
    color: "#FAF9FE",
    paddingTop: 7
  },
  countText: {
    fontFamily: Fonts.RobotoLight,
    fontSize: 11,
    color: "#BFBFBF",
    paddingTop: 5
  },
  imageContainer: {
    width:"33.33%"
  },
  center: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  }
});
