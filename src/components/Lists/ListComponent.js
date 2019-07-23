import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from "react-native";
import ListItemComponent from './ListItemComponent';

let propsParams = null;
class ListComponent extends React.PureComponent {

    constructor(props) {
        super(props);
    }
    render() {
        propsParams = this.props;
        return (
            <FlatList
                style={styles.container}
                ListHeaderComponent={this.props.header?this.props.header:null}
                data={this.props.data}
                renderItem={this.getRenderCallback}
                keyExtractor={this.keyExtractor} />
        );
    }


    getRenderCallback({ item,index }) {
        return (
            <ListItemComponent
                onPress={() => { propsParams.onPress(item); }}
                onDotsPress={() => { propsParams.onDotsPress(item); }}
                index={index}
                item={item}
                bucketSize={propsParams.data.length}
            />
        );
    }
    keyExtractor(item, i) {
        return "" + i;
    }
}



export default ListComponent;

const styles = StyleSheet.create({
    container: {
        // backgroundColor: "#202438",
        // borderRadius: 26,
        flex: 1,
        paddingTop: 15,
        paddingBottom: 15
    },
    containerBottom:{
        display: "flex",
        flexDirection: "row",
        height:56,
        borderBottomLeftRadius:26,
        borderBottomRightRadius:26,
        backgroundColor: "#202438",
    },
});