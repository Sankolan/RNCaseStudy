import React from 'react';
import {
  render,
  waitForElement,
  fireEvent,
} from 'react-native-testing-library';
import DisneyCharListScreen from '../screens/DisneyCharListScreen';
import DisneyCharItem from '../components/DisneyCharItem';

describe('DisneyCharListScreen', () => {

  // ...
    test('renders a list of Characters', async () => {
      fetch.mockResponseOnce(
        JSON.stringify([
          {
            "films": [],
            "shortFilms": [],
            "tvShows": [],
            "videoGames": [],
            "parkAttractions": [],
            "allies": [],
            "enemies": [],
            "_id": 6,
            "name": "'Olu Mel",
            "imageUrl": "https://static.wikia.nocookie.net/disney/images/6/61/Olu_main.png",
            "url": "https://api.disneyapi.dev/characters/6"
          }])
      );
      const { queryByTestId, getByTestId } = render(<DisneyCharListScreen />);
  
      expect(queryByTestId('post-row-0')).toBeNull();
  
      await waitForElement(() => {
        return queryByTestId('post-row-0');
      });
  
      expect(getByTestId('post-row-0'));
    });
    
    // ...
    test('render message that no results found if empty array returned', async () => {
      fetch.mockResponseOnce(JSON.stringify([]));
      const { getByTestId } = render(<DisneyCharListScreen />);
  
      await waitForElement(() => {
        return getByTestId('no-results');
      });
  
      expect(getByTestId('no-results'));
    });

    // ...
    test('renders a loading component initially', () => {
      const { getByTestId } = render(<DisneyCharListScreen />);
      expect(getByTestId('loading-message'));
    });

    // ...
    test('render error message if error thrown from api', async () => {
      fetch.mockRejectOnce(new Error('An error occurred.'));
      const { getByTestId, toJSON, getByText } = render(<DisneyCharListScreen />);
  
      await waitForElement(() => {
        return getByTestId('error-message');
      });
  
      expect(getByText('An error occurred.'));
    });

  });

  describe('DisneyCharItem', () => {
    test('is tappable', () => {
      const onPress = jest.fn();
      const { getByText } = render(
        <DisneyCharItem 
        name={'Test'}
        url={""}
        onSelect= {() => {
          selectItemHandler(1, 'Test');
        }}
        />
      );
  
      fireEvent.press(getByText('Test'));
      expect(onSelect).toHaveBeenCalled();
    });
  });