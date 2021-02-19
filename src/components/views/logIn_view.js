import React, {Component} from 'react';
import {View, Text, TextInput, Button, ToastAndroid} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Methods from '../lib/methods';
import FormErrorsEnum from '../enums/formErrorEnums';

const _methods = new Methods();

export default class LogInView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        email: '',
        password: '',
        id: null,
        userToken: null
      },
      email: '',
      password: '',
      error: false,
      errorType: '',
    };
  }

  handleEmailChange = (email) => {
    this.setState({email: email});
  };

  handlePasswordChange = (password) => {
    this.setState({password: password});
  };

  handleLogInButtonClick = async () => {
    this.state.user = {
      email: this.state.email,
      password: this.state.password,
    };

    let success = false;

    if (this.state.user.email || this.state.user.password)
      success = await this.postLogIn();
    else {
      this.setState({error: true, errorType: FormErrorsEnum.EMPTY_FORM});
    }

    if (success) {
      console.log('Log In Success');
      _methods.checkLoggedIn(this.props.navigation);
    }
  };

  postLogIn = async () => {
    try {
      console.log(
        'Sending POST Request to http://10.0.2.2:3333/api/1.0.0/user/login',
      );
      let response = await fetch('http://10.0.2.2:3333/api/1.0.0/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.state.user),
      });

      console.log(response.status);
      if (response.ok) {
        let json = await response.json();

        console.log('json: ' + JSON.stringify(json));

        try {
          await AsyncStorage.setItem('@user', JSON.stringify(json));
          console.log('user saved: ' + JSON.stringify(json));
          return true;
        } catch (e) {
          throw new Error(e);
        }
      } else {
        this.setState({error: true, errorType: FormErrorsEnum.BAD_REQUEST});
      }
    } catch (e) {
      console.log(e);
    }
  };

  handleError = () => {
    switch (this.state.errorType) {
      case FormErrorsEnum.BAD_REQUEST: {
        console.log('BAD REQUEST');
        return 'Wrong Email / Password';
      }
      case FormErrorsEnum.EMPTY_FORM:
        return 'Form Empty';
      default:
        return 'Unknown Error';
    }
  };

  render() {
    const navigation = this.props.navigation;

    return (
      <View>
        <Text>{this.state.error ? this.handleError() : ''}</Text>

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
