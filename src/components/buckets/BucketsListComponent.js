import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
// import BaseListComponent from "../Lists/BaseListComponent";
import ListComponent from "../Lists/ListComponent";

class BucketsListComponent extends React.PureComponent {
    constructor(props) {
        super(props);
    }
    render() {

        return (
            <View style={{ flex: 1 }}>
                <ListComponent
                    onPress={this.props.onPress}
                    onDotsPress={this.props.onDotsPress}
                    data={this.props.data}
                    header={this.props.header}
                />
            </View>
        );
    }
}

export default BucketsListComponent;
