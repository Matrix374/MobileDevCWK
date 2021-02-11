/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import {createStackNavigator} from '@react-navigation/stack';
import React, {Component} from 'react';
import {ToastAndroid, View, Text, Button} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import LogInView from './views/logIn_view';
import RegisterView from './views/register_view';
import Main from './Main';
import LocationDetail from './views/location_detail_view';
import Lib from './lib/lib';

const Stack = createStackNavigator();

const common = new Lib();

class Splash extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userToken: null,
      isLoading: true,
      buttonStyle: '#c79274',
    };
  }

  async componentDidMount() {
    let userToken = await common.retrieveToken();

    this.setState({userToken: userToken, isLoading: false});
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View>
          <Text>Loading</Text>
        </View>
      );
    } else {
      return (
        <Stack.Navigator>
          {this.state.userToken ? (
            <>
              <Stack.Screen name="Main" component={Main} />
              <Stack.Screen name="Location" component={LocationDetail} />
            </>
          ) : (
            <>
              <Stack.Screen name="LogIn" component={LogInView} />
              <Stack.Screen name="Register" component={RegisterView} />
            </>
          )}
        </Stack.Navigator>
      );
    }
  }
}

export default Splash;
