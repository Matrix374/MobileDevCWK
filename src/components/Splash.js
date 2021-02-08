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
import Main from './Main'

const Stack = createStackNavigator();

class Splash extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userToken: null,
      isLoading: true,
      buttonStyle: '#c79274',
    };
  }

  retrieveToken = async () => {
    try {
      let userToken = await AsyncStorage.getItem('@userToken');

      console.log('token retrieved: ' + userToken);
      return userToken;
    } catch (e) {
      console.log(e.toString());
    }
  };

  async componentDidMount() {
    let userToken = await this.retrieveToken();

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
              <Stack.Screen
                name="Main"
                component={Main}
              />
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
