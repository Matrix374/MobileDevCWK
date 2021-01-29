import React, {Component} from 'react';
import {View, Text, TextInput, Button, ToastAndroid} from 'react-native';

export default class RegisterView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      buttonStyle: '#c79274',
    };
  }

  handleEmailChange = (email) => {
    this.setState({email: email});
  };

  handlePasswordChange = (password) => {
    this.setState({password: password});
  };

  handleRegisterButtonClick = () => {
    //do stuff
    //If Email !Empty || Password !Empty throw Error
    //Attempt POST Register (/user/)
    ToastAndroid.show('Not Implemented', ToastAndroid.SHORT);
  };

  render() {
    return (
      <View>
        <Text>COVFEFE REGISTER</Text>

        <TextInput
          placeholder="Enter Email"
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={this.handleEmailChange}
          value={this.state.email}
        />
        <TextInput
          placeholder="Enter Password"
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={this.handlePasswordChange}
          value={this.state.password}
        />

        <Button
          title="Register"
          color={this.state.buttonStyle}
          onPress={this.handleRegisterButtonClick}>
          Register
        </Button>
      </View>
    );
  }
}
