import React from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import CustomStatusBar from "../components/common/CustomStatusBar";
import NetInfo from "@react-native-community/netinfo";
//storj modules
// import StorjLib from '../../utils/storjModule';
// import { getFirstAction, setFirstAction } from '../../utils/asyncStorageModule';
// import SyncModule from "../../utils/syncModule";

class InvalidScreen extends React.Component {
    componentWillMount = () => {
        const subscription = NetInfo.addEventListener(
            "connectionChange",
            this.handleFirstConnectivityChange
        );
    };
    componentDidMount = () => {

    };


    handleFirstConnectivityChange = data => {
        console.log("Connection type", data.type);
        console.log("Connection effective type", data.effectiveType);
    };



    render() {
        return (
            <React.Fragment>
                <CustomStatusBar />
                <View style={styles.container}>
                    <View style={styles.columnContainer}>
                        <Image
                            style={{ width: 151, height: 56 }}
                            source={require("../../assets/images/splash.png")}
                        />

                        <Text style={styles.invalidText}>Invalid API Key and Encryption Key</Text>
                    </View>
                </View>
            </React.Fragment>
        );
    }
}

export default InvalidScreen;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#090A21",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    columnContainer: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },
    invalidText: {
        color: "white", marginTop: 40
    }

});
