import React, {Component} from 'react';
import {View, Text, TextInput, Button, ToastAndroid} from 'react-native';

export default class HomeView extends Component {

  render() {
    const navigation = this.props.navigation;

    return (
      <View>
        <Text>COVFEFE HOME</Text>
      </View>
    );
  }
}
