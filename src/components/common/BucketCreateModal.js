import React from "react";
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Modal,
    Text,
    TextInput,
    Dimensions
} from "react-native";
import { Icon } from "@up-shared/components";
import Fonts from "../../../utils/Font";

class BucketCreateModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bucketName: "",
        };


    }
    onChangeText(text) {
        this.setState({ bucketName: text });
    }


    render() {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={this.props.isCreateBucketInputShown}
                width={100}
                height={100}
                style={styles.bottomModal}
                onRequestClose={() => {
                    this.props.hideCreateBucketInput();
                }}>
                <View style={styles.bottomModal}>
                    <View style={styles.modalContent}>
                        <View style={styles.inputContainter}>

                            <TextInput
                                autoFocus
                                style={styles.textInput}
                                placeholder={'Folder Title'}
                                placeholderTextColor="white"
                                onChangeText={async (bucketName) => {
                                    await this.setState({ bucketName })
                                }}
                                value={this.state.bucketName}
                            />

                        </View>
                        <View style={styles.buttonConatainer}>
                            <TouchableOpacity
                                style={styles.buttonLayout}
                                onPress={() => {
                                    this.props.hideCreateBucketInput();
                                }}>
                                <Text style={styles.buttonText}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.buttonLayout}
                                onPress={() => {
                                    this.props.createBucket(this.state.bucketName)
                                    this.props.hideCreateBucketInput(); 
                                }}>
                                <Text style={styles.buttonText}>Save</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        );
    }
}

export default BucketCreateModal;

const styles = StyleSheet.create({
    bottomModal: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
    },
    modalContent: {
        width: Dimensions.get('screen').width,
        height: 140,
        display: 'flex',
        justifyContent: 'flex-end',
        flexDirection: "column",
        backgroundColor: "#090a21",
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },
    inputContainter: {
        display: 'flex',
        flexDirection: "row",
        justifyContent: 'space-around',
        alignItems: 'center',
        marginBottom: 15
    },
    buttonConatainer: {
        display: 'flex',
        flexDirection: "row",
        height: 46,
        justifyContent: 'space-around',
        backgroundColor: "#202438",
    },
    buttonLayout: {
        display: 'flex',
        flexDirection: "row",
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 46,
    },
    buttonText: {
        color: 'white',
        fontFamily: Fonts.RobotoRegular,
        fontSize: 14,
    },

    textInput: {
        flex: 1,
        color: 'white',
        fontSize: 22,
        fontFamily: Fonts.RobotoRegular,
        padding: 15
    }
});
