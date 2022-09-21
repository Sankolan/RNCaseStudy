/* Sample React Native App
* https://github.com/facebook/react-native
*
* @format
* @flow strict-local
*/

import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    ScrollView,
    Image,
    View
} from 'react-native';
import { useSelector } from "react-redux";
import DisneyCharDetailItem from '../components/DisneyCharDetailItem';

const DisneyCharDetail = ({ route }) => {
    const { charId, charName } = route.params;
    const avatarPlaceholderImg = require("../assets/placeholder.png")
    const selectedCharacter = useSelector(state =>
        state.disneyCharcters.availableCharacters.find(disneyCharacter => disneyCharacter._id === charId)
    );

    return (
        <SafeAreaView>
            <ScrollView nestedScrollEnabled={true}>
                <Image style={styles.image}
                defaultSource={avatarPlaceholderImg}
                source={{ uri: selectedCharacter.imageUrl }} />
                <Text style={styles.price}>Character Name : {selectedCharacter.name}</Text>
                <View style={{ margin: 10 }}>
                    <DisneyCharDetailItem
                        detailTitle={'Films:'}
                        data={selectedCharacter.films}
                    ></DisneyCharDetailItem>
                    <DisneyCharDetailItem
                        detailTitle={'Short Films:'}
                        data={selectedCharacter.shortFilms}
                    ></DisneyCharDetailItem>
                    <DisneyCharDetailItem
                        detailTitle={'TV Shows:'}
                        data={selectedCharacter.tvShows}
                    ></DisneyCharDetailItem>
                    <DisneyCharDetailItem
                        detailTitle={'Video Games:'}
                        data={selectedCharacter.videoGames}
                    ></DisneyCharDetailItem>
                    <DisneyCharDetailItem
                        detailTitle={'park Attractions:'}
                        data={selectedCharacter.parkAttractions}
                    ></DisneyCharDetailItem>
                    <DisneyCharDetailItem
                        detailTitle={'Allies:'}
                        data={selectedCharacter.allies}
                    ></DisneyCharDetailItem>
                    <DisneyCharDetailItem
                        detailTitle={'Enemies:'}
                        data={selectedCharacter.enemies}
                    ></DisneyCharDetailItem>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    image: {
        width: "100%",
        aspectRatio: 1,
        resizeMode: 'contain'

    },
    actions: {
        marginVertical: 10,
        alignItems: "center"
    },
    price: {
        fontSize: 20,
        color: "#888",
        fontWeight: 'bold',
        textAlign: "center",
        marginVertical: 20
    },
    details: {
        fontSize: 16,
        marginHorizontal: 20,
        justifyContent: 'flex-start',
        margin: 20,
    }
});

export default DisneyCharDetail;