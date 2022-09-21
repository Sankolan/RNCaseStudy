import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import thunk from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import disneyCharReducer from '../store/reducers/DisneyCharReducer';

import DisneyCharListScreen from './DisneyCharListScreen';
import DisneyCharDetail from './DisneyCharDetail';

const Stack = createNativeStackNavigator();

const allReducers = combineReducers({ disneyCharcters: disneyCharReducer });
const myStore = createStore(allReducers, applyMiddleware(thunk));

function App() {
  return (
    <Provider store={myStore}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="DisneyCharListScreen"
          screenOptions={{
            headerStyle: { backgroundColor: '#B591FF' },
            headerTitleStyle: { color: 'white' },
            headerTintColor:'white'
          }}>
          <Stack.Screen name="DisneyCharListScreen" component={DisneyCharListScreen} options={{headerBackTitleVisible: false, title: 'Disney Characters'}} />
          <Stack.Screen name="DisneyCharDetail" component={DisneyCharDetail} options={{headerBackTitleVisible: false, title: 'Disney Character Details'}}/>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;