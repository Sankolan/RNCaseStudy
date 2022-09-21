// import PRODUCTS from "../../data/dummy-data";
import {
  SET_CHARACTERS,
  SEARCH_CHARACTERS
} from "../actions/DisneyCharAction";

const initialState = {
  availableCharacters: [],
  searchedCharacters: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CHARACTERS:
      return {
        availableCharacters: action.disneyCharacters,
        searchedCharacters: action.disneyCharacters
      };
    case SEARCH_CHARACTERS:
      var filterdCharacters;
      if (action.searchText != '') {
        filterdCharacters = state.searchedCharacters.filter(item => {
          return item.name.toLocaleLowerCase().includes(action.searchText.toLocaleLowerCase())
        });
      } else {
        filterdCharacters = state.availableCharacters;
      }
      return {
        ...state,
        searchedCharacters: filterdCharacters
      };
    default: {
      return state;
    }
  }
};