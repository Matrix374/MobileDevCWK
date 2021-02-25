import React, {Component} from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import HomeScreen from './HomeScreen';
import UserScreen from './UserScreen';

const Tab = createBottomTabNavigator();

export default class MainScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: '',
    };
  }

  render() {
    return (
      <Tab.Navigator>
        <Tab.Screen name="HomeScreen" component={HomeScreen} />
        <Tab.Screen name="UserScreen" component={UserScreen} />
      </Tab.Navigator>
    );
  }
}
