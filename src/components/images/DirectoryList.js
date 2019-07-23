import React from "react";
import { ScrollView, View, StyleSheet, Dimensions } from "react-native";
import DirectoryItem from "./DirectoryItem";
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
class DirectoryList extends React.Component {
  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          {a.map((item, index) => {
            return Dimensions.get("screen").width <
              Dimensions.get("screen").height ? (
              <View
                style={index % 2 === 0 ? { paddingRight: 10 } : {}}
                key={index}
              >
                <DirectoryItem item={item} />
              </View>
            ) : (
              <View
                style={
                  index != a.length - 1 && (index + 1) % 3 !== 0
                    ? { paddingRight: 10 }
                    : {}
                }
                key={index}
              >
                <DirectoryItem item={item} />
              </View>
            );
          })}
        </View>
      </ScrollView>
    );
  }
}

export default DirectoryList;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap"
  }
});
