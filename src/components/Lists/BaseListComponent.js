import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import ListComponent from "./ListComponent";


export default class BaseListComponent extends React.Component {
    constructor(props) {
        super(props);

        this.ListComponent = ListComponentWrapper.bind(this);
    }
    render() {

        return null;
    }

}
function ListComponentWrapper(props) {


    return (
        <ListComponent
            onPress={this.props.onPress}
            onDotsPress={this.props.onDotsPress}
            data={this.props.data}
            header={this.props.header}
        />
    );
}

