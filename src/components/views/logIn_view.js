import React, {Component} from 'react';
import {View, Text, TextInput, Button, ToastAndroid} from 'react-native';

export default class LogInView extends Component {
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

  handleLogInButtonClick = () => {
    //do stuff
    //If Email !Empty || Password !Empty throw Error
    //Attempt POST Login (/user/login)

    //Placeholder
    if(this.state.email != '' && this.state.password != '')
        this.props.navigation.navigate('Home');
    else
        ToastAndroid.show('Unsuccessful, Email/Pass fields empty', ToastAndroid.SHORT);
    //ToastAndroid.show('Not Implemented', ToastAndroid.SHORT);
  };

  render() {
    const navigation = this.props.navigation;

    return (
      <View>
        <Text>COVFEFE LOG-IN</Text>

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
          title="Log-In"
          color={this.state.buttonStyle}
          onPress={this.handleLogInButtonClick}>
          Log-In
        </Button>
        <Button
          color={this.state.buttonStyle}
          title="Register"
          onPress={() => navigation.navigate('Register')}
        />
      </View>
    );
  }
}
