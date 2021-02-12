

import {createStackNavigator} from '@react-navigation/stack';
import React, {Component} from 'react';
import {View, Text} from 'react-native';

import MainScreen from './MainScreen';
import Lib from './lib/lib';
import AuthFlowScreen from './AuthFlowScreen';

const Stack = createStackNavigator();

const common = new Lib();

export default class SplashScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userToken: null,
      isLoading: true,
    };
  }

  async componentDidMount() {
    let userToken = '';
    this._unsubscribe = this.props.navigation.addListener('focus', async () => {
      userToken = await common.retrieveToken();
      this.setState({userToken: userToken, isLoading: false});
    });
  }

  componentWillUnmount() {
    this._unsubscribe();
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
        <Stack.Navigator headerMode="none">
          {this.state.userToken ? (
            <>
              <Stack.Screen name="MainScreen" component={MainScreen} />
            </>
          ) : (
            <>
              <Stack.Screen name="AuthFlow" component={AuthFlowScreen}/>
            </>
          )}
        </Stack.Navigator>
      );
    }
  }
}
