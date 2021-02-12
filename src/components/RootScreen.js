

import {createStackNavigator} from '@react-navigation/stack';
import React, {Component} from 'react';
import SplashScreen from './SplashScreen';

const Stack = createStackNavigator();

export default class RootScreen extends Component {
  render() {
    return (
        <Stack.Navigator 
          headerMode="none">
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
        </Stack.Navigator>
    );
  }
}
