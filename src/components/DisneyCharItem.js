import React from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity
} from "react-native";

import Card from "./Card";

const DisneyCharItem = props => {
    const placeholderImg = require("../assets/placeholder.png");
    return (
        <Card style={styles.product}>
            <View>
                <TouchableOpacity onPress={props.onSelect} useForeground>
                    <View>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <Image 
                            defaultSource={placeholderImg}
                            source={{ uri: props.url }} style={styles.imageView} />
                            <Text style={styles.titleStyle} >{props.name}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        </Card>
    );
};

const styles = StyleSheet.create({
    titleStyle: {
        flex: 1,
        color: '#BE5019',
        fontSize: 20,
        padding: 10,
        width: '50%',
        height: 100,
        justifyContent: 'flex-start',
    },
    product: {
        height: 120,
        margin: 5
    },
    imageView: {
        width: '50%',
        height: 100 ,
        margin: 10,
        borderRadius : 10
    }    
});

export default DisneyCharItem;