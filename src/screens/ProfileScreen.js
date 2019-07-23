import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  Animated
} from "react-native";
import CustomStatusBar from "../components/common/CustomStatusBar";
import PersonalInfo from "../components/Profile/PersonalInfo";
import ProfileNav from "../components/Profile/ProfileNav";
import Details from "../components/Profile/Details";
import Preferences from "../components/Profile/Preferences";

HEADER_MAX_HEIGHT = 120;
HEADER_MIN_HEIGHT = 40;
PROFILE_IMAGE_MAX_HEIGHT = 74;
PROFILE_IMAGE_MIN_HEIGHT = 30;

class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

   

    return (
      <ScrollView
        style={styles.conatiner}
      >
        <CustomStatusBar />
        <View>
          <PersonalInfo radius={10} />
        </View>
        <ProfileNav navigation={this.props.navigation} />
        <Details />
        <Preferences />
      </ScrollView>
    );
  }
}

export default ProfileScreen;
const styles = StyleSheet.create({
  conatiner: {
    backgroundColor: "#090A21"
  }
});
