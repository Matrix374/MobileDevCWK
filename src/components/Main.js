/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import HomeView from './views/home_view';
import UserView from './views/user_view';
import Lib from './lib/lib';

const Tab = createBottomTabNavigator();

const common = new Lib();

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userToken: '',
    };
  }

  async componentDidMount() {
    let userToken = await common.retrieveToken();
    await this.setState({userToken: userToken});
    console.log('Main: ' + this.state.userToken);
  }
  render() {
    return (
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeView} />
        <Tab.Screen name="Person" component={UserView} />
      </Tab.Navigator>
    );
  }
}

export default Main;
