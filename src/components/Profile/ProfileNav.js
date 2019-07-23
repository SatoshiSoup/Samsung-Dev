import React from "react";
import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Icon } from "@up-shared/components";

class ProfileNav extends React.Component {
  render() {
    console.log(this.props.navigation);
    
    const { navigate, goBack, state } = this.props.navigation;
    
    return (
      <View style={styles.container}>
        <View>
          <TouchableOpacity onPress={() =>{

          }}>
            <View style={styles.arrowLeftContainer}>
              <Icon name="arrowleft" size={18} color="#BFBFBF" />
            </View>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <View style={styles.qrcodeContainer}>
              <Icon name="qr-code" size={18} color="#BFBFBF" />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default ProfileNav;
const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 36,
    paddingRight: 20
  },
  arrowLeftContainer: {
    paddingLeft: 20,
    paddingRight: 20
  },
  qrcodeContainer: {
    paddingLeft: 20
  }
});
