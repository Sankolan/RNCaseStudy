/*Screen to view all the user*/
import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from "react-redux";
import {
  FlatList,
  Text,
  View,
  Button,
  StyleSheet,
  ActivityIndicator
} from 'react-native';
import SearchBar from "react-native-dynamic-search-bar";
import Colors from '../constants/Colors';
import DisneyCharItem from '../components/DisneyCharItem';
import * as disneyCharActions from '../store/actions/DisneyCharAction';

const DisneyCharListScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();

  const disneyCharacters = useSelector(state => state.disneyCharcters.searchedCharacters);
  const dispatch = useDispatch();

  const loadCharacters = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);
    try {
      await dispatch(disneyCharActions.fetchCharacters());
    } catch (err) {
      setError(err.message);
    }
    setIsRefreshing(false);
  }, [dispatch, setIsLoading, setError]);

  handleOnChangeText = (text) => {
    dispatch(disneyCharActions.searchCharactersAction(text));
  };

  handleOnTextClear = () => {
    dispatch(disneyCharActions.searchCharactersAction(""));
  };

  // init
  useEffect(() => {
    setIsLoading(true);
    loadCharacters().then(() => {
      setIsLoading(false);
    });
  }, [dispatch, loadCharacters]);

  // reload
  useEffect(() => {
    const willFocusSub = props.navigation.addListener(
      "willFocus",
      loadCharacters
    );
    return () => {
      willFocusSub.remove();
    };
  }, [loadCharacters]);


  const selectItemHandler = (id, name) => {
    props.navigation.navigate("DisneyCharDetail", {
      charId: id,
      charName: name
    });
  };

  if (error) {
    return (
      <View style={styles.centered}>
        <Text testID="error-message">An error occurred!</Text>
        <Button
          title="Try again"
          onPress={loadCharacters}
          color={Colors.primary}
        />
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
        <Text testID="loading-message">Loading</Text>
      </View>
    );
  }

  handleEmptyResultsView = () => {
    return (
      <View style={styles.centered}>
        <Text testID="no-results">No Characters found. Maybe try Something else!</Text>
      </View>
    );
  }

  return (
    <View>
    <SearchBar style={{margin:10}}
                placeholder="Search here"
                onChangeText={handleOnChangeText}
                onClearPress={handleOnTextClear}
                >       
    </SearchBar>
    <FlatList
      testID="character-list"
      ListEmptyComponent={handleEmptyResultsView()}
      onRefresh={loadCharacters}
      refreshing={isRefreshing}
      data={disneyCharacters}
      keyExtractor={item => item._id}
      renderItem={(itemData, index) => (
        <DisneyCharItem
          name={itemData.item.name}
          url={itemData.item.imageUrl}
          testID={`post-row-${index}`}
          onSelect={() => {
            selectItemHandler(itemData.item._id, itemData.item.name);
          }}
        >
        </DisneyCharItem>
      )}
    />
    </View>
  );
}

const styles = StyleSheet.create({
  centered: { flex: 1, justifyContent: "center", alignItems: "center" }
});

export default DisneyCharListScreen;