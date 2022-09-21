import React from 'react';
import App from '../screens/App';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import DisneyCharDetail from '../screens/DisneyCharDetail';
import DisneyCharListScreen from '../screens/DisneyCharListScreen';
import { Provider } from 'react-redux';

describe('Testing react navigation', () => {
    test('Search here', async () => {
      const component = (
        <Provider>
        <NavigationContainer>
          <App/>
        </NavigationContainer>
        </Provider>
      );
  
      render(component);
  
      const header = await screen.findByText("Search here");
  
      expect(header).toBeTruthy();
    });
  });