import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, Dimensions } from "react-native";
import Fonts from "../../../utils/Font";
import { Icon } from "@up-shared/components";

class ActionBar extends React.Component {
    render() {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={this.props.isActionBarShown}
                width={Dimensions.get('screen').width}
                height={Dimensions.get('screen').height}
                onRequestClose={() => {
                    if (this.props.isSingleItemSelected) {
                        this.props.deselectBucket();
                    }
                    this.props.disableSelectionMode();
                }}>
                <TouchableOpacity style={{  height: (Dimensions.get('screen').height - 70) }}
                    onPress={() => {
                        if (this.props.isSingleItemSelected) {
                            this.props.deselectBucket();
                        }
                        this.props.disableSelectionMode();
                    }}
                >

                </TouchableOpacity>
                <View style={styles.bottomModal}>

                    <View style={styles.modalContent}>
                        <View style={styles.itemButtonIcon}>
                            <TouchableOpacity style={styles.itemButtonIcon}><Icon name="star-full" size={18} color="#666d8e" /><Text style={styles.nameText}>Favorite</Text></TouchableOpacity>
                        </View>
                        <View style={styles.itemButtonIcon}>
                            <TouchableOpacity style={styles.itemButtonIcon}><Icon name="cloud-upload" size={18} color="#666d8e" /><Text style={styles.nameText}>Upload</Text></TouchableOpacity>
                        </View>
                        <View style={styles.itemButtonIcon}>
                            <TouchableOpacity style={styles.itemButtonIcon} onPress={()=>{
                                this.props.tryDeleteBuckets()
                            }}><Icon name="trash" size={18} color="#666d8e" /><Text style={styles.nameText}>Delete</Text></TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

        );
    }
}

export default ActionBar;
const styles = StyleSheet.create({
    bottomModal: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
    },
    modalContent: {
        width: Dimensions.get('screen').width,
        height: 70,
        display: 'flex',
        justifyContent: 'space-around',
        flexDirection: "row",
        backgroundColor: "#090A21",
        padding: 22,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    itemButtonIcon: {
        display: 'flex',
        flexDirection: "column",
        justifyContent: 'center',
        alignItems: 'center'
    },
    nameText: {
        color: "#666d8e",
        fontFamily: Fonts.RobotoRegular,
        fontSize: 13,
        paddingBottom: 8
    },
});
