import React from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Dimensions,
  TouchableOpacity
} from "react-native";
import { Icon } from "@up-shared/components";
import Fonts from "../../utils/Font";
import FolderSection from "../components/search/FolderSection";
import ImageSection from "../components/search/ImageSection";
import Voice from "react-native-voice";
import { ScrollView } from "react-native-gesture-handler";

class SearchScreen extends React.Component {
  constructor(props) {
    super(props);
    Voice.onSpeechStart = res => {
      this.setState({
        text: "Listening..."
      });
    };
    Voice.onSpeechEnd = res => {
      this.setState({ text: "" });
    };
    Voice.onSpeechResults = res => {
      this.setState({ text: res.value[0] });
    };
    this.state = {
      text: null,
      start: false
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.searchBar}>
          <View style={styles.goBackContainer}>
            <View>
              <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                <View style={{ paddingLeft: 20, paddingRight: 10 }}>
                  <Icon name="arrowleft" size={18} color="#BFBFBF" />
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.inputContainer}>
            <View>
              <TextInput
                style={{ height: 40 }}
                onChangeText={text => this.setState({ text })}
                value={this.state.text}
                autoFocus={true}
                placeholder="Search"
                placeholderTextColor="#BFBFBF"
                keyboardAppearance="dark"
                maxLength={100}
                scrollEnabled={true}
                style={{
                  fontFamily: Fonts.RobotoLight,
                  fontSize: 18,
                  color: "#BFBFBF"
                }}
              />
            </View>
          </View>
          <View style={styles.micContainer}>
            <View
              style={{
                paddingRight: 20
              }}
            >
              <TouchableOpacity
                onPress={() => Voice.start("en-US")}
                color="#fff"
              >
                {this.state.start ? null : (
                  <Icon name="ic_mic" size={24} color="#BFBFBF" />
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <ScrollView>
          <View style={{ paddingTop: 30 }}>
            <FolderSection />
          </View>
          <View style={{ paddingTop: 25 }}>
            <ImageSection />
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default SearchScreen;
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#090A21",
    flex: 1,
    display: "flex"
  },
  searchBar: {
    height: 42,
    marginTop: 15,
    backgroundColor: "#1E1E33",
    borderRadius: 29,
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  micContainer: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center"
  },
  inputContainer: {
    flexGrow: 10,
    display: "flex",
    flexDirection: "row",
    width: Dimensions.get("window").width * 0.7
  },
  goBackContainer: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center"
  }
});
