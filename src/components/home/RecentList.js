import React from "react";
import { ScrollView, StyleSheet, View, Text } from "react-native";
import RecentImageItem from "./RecentImageItem";
import Fonts from "../../../utils/Font";
const a = [
  {
    icon: require("../../../assets/images/Image19.png"),
    name: "Camera backup",
    count: 503
  },
  {
    icon: require("../../../assets/images/Image20.png"),
    name: "Birthday",
    count: 21
  },
  {
    icon: require("../../../assets/images/Image21.png"),
    name: "Wedding Anniversary",
    count: 200
  },
  {
    icon: require("../../../assets/images/Image22.png"),
    name: "New year celebration",
    count: 20
  }
];
class RecentList extends React.Component {
  render() {
    return (
      <View>
        <View>
          <Text style={styles.recentText}>Recent</Text>
        </View>
        <ScrollView
          style={StyleSheet.container}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        >
          {a.map((item, index) => {
            return (
              <View
                key={index}
                style={index < a.length - 1 ? { paddingRight: 13 } : {}}
              >
                <RecentImageItem item={item} />
              </View>
            );
          })}
        </ScrollView>
      </View>
    );
  }
}

export default RecentList;
const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row"
  },
  recentText: {
    color: "#BFBFBF",
    fontSize: 14,
    fontFamily: Fonts.RobotoRegular,
    paddingLeft: 20
  }
});
