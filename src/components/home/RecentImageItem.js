import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

class RecentImageItem extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity>
          <Image
            style={{ width: 221, height: 164, borderRadius: 30 }}
            source={this.props.item.icon}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

export default RecentImageItem;

const styles = StyleSheet.create({
  container: {
    paddingBottom: 15,
    paddingTop: 15
  }
});
