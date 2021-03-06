import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import Fonts from "../../../utils/Font";
import { Icon } from "@up-shared/components";
import { StackActions, NavigationActions } from 'react-navigation';
class NavSection extends React.Component {



  _renderBucketNav() {
    return (
      <View style={styles.container}>
        <View>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('FilesScreen');

            }}
          >
            <View style={styles.leftSection}>
              <View style={styles.userIconContainer}>
                <Icon name="user" size={16} color="#090A21" />
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.rightSection}>
          <View>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("Search")}
            >
              <View style={styles.searchIconContainer}>
                <Icon name="search" size={16} color="#fff" />
              </View>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("Search")}
            >
              <View style={styles.moreIconContainer}>
                <Icon name="more" size={16} color="#fff" />
                <View style={styles.badgeContainer}>
                  <View style={styles.badgeTextContainer}>
                    <View>
                      <Text style={styles.badgeText}>N</Text>
                    </View>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
  _renderOpenedBucketNav() {
    return (
      <View style={styles.container}>
        <View>
          <TouchableOpacity
            onPress={() => { this.props.navigationBack(this.props.navigation); }}
          >
            <View style={styles.leftSection}>
              <View style={styles.backIconContainer}>
                <Icon name="arrowleft" size={16} color="#ffffff" />
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.rightSection}>
          <View>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("Search")}
            >
              <View style={styles.searchIconContainer}>
                <Icon name="search" size={16} color="#fff" />
              </View>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("Search")}
            >
              <View style={styles.moreIconContainer}>
                <Icon name="more" size={16} color="#fff" />
                <View style={styles.badgeContainer}>
                  <View style={styles.badgeTextContainer}>
                    <View>
                      <Text style={styles.badgeText}>N</Text>
                    </View>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  render() {
    const props = this.props;
    return props.activeScreen && props.activeScreen == 'FilesScreen' ? this._renderOpenedBucketNav() : this._renderBucketNav();
  }
}

export default NavSection;
const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  leftSection: {
    paddingLeft: 20,
    paddingBottom: 20,
    paddingTop: 10,
    paddingRight: 10
  },
  rightSection: {
    display: "flex",
    flexDirection: "row"
  },
  badgeContainer: {
    position: "absolute",
    top: 0,
    right: 11,
    backgroundColor: "#FF7828",
    height: 18,
    width: 18,
    borderRadius: 9
  },
  badgeTextContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  badgeText: {
    fontFamily: Fonts.RobotoRegular,
    fontSize: 10,
    color: "#FFFFFF",
    paddingBottom: 3,
    paddingTop: 3,
    paddingLeft: 4,
    paddingRight: 4
  },
  userIconContainer: {
    height: 16,
    width: 16,
    borderRadius: 8,
    backgroundColor: "#fff"
  }, backIconContainer: {
    height: 16,
    width: 16,
    borderRadius: 8,
  },
  searchIconContainer: {
    paddingRight: 23,
    paddingBottom: 20,
    paddingTop: 10
  },
  moreIconContainer: {
    position: "relative",
    paddingBottom: 20,
    paddingRight: 20,
    paddingTop: 10
  }
});
