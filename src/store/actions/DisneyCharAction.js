import DisneyChar from "../../models/DisneyChar";
import Env from "../../constants/Environment";

export const SET_CHARACTERS = "SET_CHARACTERS";
export const SEARCH_CHARACTERS = "SEARCH_CHARACTERS";

export const fetchCharacters = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${Env.url}`);
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const resData = await response.json();
      const disneyCharData = resData.data;
      const loadedCharacters = [];
      for (const key in disneyCharData) {
        loadedCharacters.push(
          new DisneyChar(
            disneyCharData[key]._id,
            disneyCharData[key].films,
            disneyCharData[key].shortFilms,
            disneyCharData[key].tvShows,
            disneyCharData[key].videoGames,
            disneyCharData[key].parkAttractions,
            disneyCharData[key].allies,
            disneyCharData[key].enemies,
            disneyCharData[key].name,
            disneyCharData[key].imageUrl,
            disneyCharData[key].url
          )
        );
      }
      dispatch({
        type: SET_CHARACTERS,
        disneyCharacters: loadedCharacters
        
      });
    } catch (error) {
      throw error;
    }
  };
};


export const searchCharactersAction = searchTextVal => {
  return { type: SEARCH_CHARACTERS, searchText: searchTextVal };
};