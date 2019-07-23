import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import Fonts from "../../../utils/Font";
import { Icon } from "@up-shared/components";

class ListItemComponent extends React.PureComponent {
    render() {
        const { item } = this.props;
        var props = this.props;

        return (
            <TouchableOpacity
                onPress={props.onPress}
            >
                <View style={[props.item.isSelected ? [styles.container, styles.itemSelected] : styles.container,
                    props.index==0?styles.containerTop:null,props.index==(props.bucketSize-1)?styles.containerBottom:null]
                    }>
                    <View style={styles.iconcontainer}>
                        <Icon name="folder" size={17} color="#0095d2" />
                    </View>
                    <View style={styles.contentContainer}>
                        <View>
                            <Text style={styles.nameText}>{item.entity.name}</Text>
                        </View>
                        <View>
                            <Text style={styles.dateText}>{item.entity.date}</Text>
                        </View>
                    </View>
                    <View style={styles.moreIcon}>
                        <TouchableOpacity
                            onPress={props.onDotsPress}
                        >
                            <View>
                                <Icon name="more" size={17} color="#0095d2" />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

export default ListItemComponent;

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'space-around',
        paddingBottom: 8,
        paddingLeft: 17,
        paddingTop: 8,
        backgroundColor: "#202438",
        // borderRadius: 26,
    },
    containerTop:{
    borderTopLeftRadius:26,
    borderTopRightRadius:26
    },
    containerBottom:{
        borderBottomLeftRadius:26,
        borderBottomRightRadius:26,
    },
    itemSelected: {
        backgroundColor: '#3c4367'
    },
    contentContainer: {
        display: "flex",
        flexDirection: "column",
        flex: 1
    },
    iconcontainer: {
        paddingRight: 20
    },
    nameText: {
        color: "#FAF9FE",
        fontFamily: Fonts.RobotoRegular,
        fontSize: 14,
        paddingBottom: 8
    },
    dateText: {
        color: "#BFBFBF",
        fontFamily: Fonts.RobotoLight,
        fontSize: 10
    },
    moreIcon: {
        padding: 20,
    }
});
