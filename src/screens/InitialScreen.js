import React from "react";
import {
    View,
} from "react-native";
import { connect } from "react-redux";
import SyncModule from '../Utils/syncModule';
import ServiceModule from '../Utils/serviceModule';
import {
    getBuckets,
} from '../store/reducers/Bucket/bucketReducerActions';
import ListItemModel from '../models/ListItemModel';
import BucketModel from '../models/BucketModel';

class InitialScreen extends React.Component {


    constructor(props) {
        super(props);

    }
    async componentWillMount() {
         this.getAllBuckets();
         ServiceModule.getBuckets();
        this.props.navigation.navigate("TabNavigatorApps");
    }

    async getAllBuckets() {
        let bucketsResponse = await SyncModule.listBuckets(this.props.sortingMode);

        if (bucketsResponse.isSuccess) {
            let buckets = JSON.parse(bucketsResponse.result).map((file) => {
                return new ListItemModel(new BucketModel(file));
            });

            this.props.getBuckets(buckets);
        }
    }

    async componentDidMount() {

    }


    render() {
        return (
            <View
                style={{ flex: 1, position: "relative", backgroundColor: "#090A21" }}
            >

            </View>
        );
    }
}


const mapStateToProps = state => {
    return {
        buckets: state.bucketReducer.buckets,
        sortingMode: state.mainReducer.sortingMode,
        activeScreen: state.navReducer.activeScreen,

    };
};

const mapDispatchToProps = dispatch => {
    return {
        getBuckets: (buckets) => dispatch(getBuckets(buckets)),
    };
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(InitialScreen);