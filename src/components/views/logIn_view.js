import React, {Component, useState} from 'react';
import {View, Text, TextInput, Button, ToastAndroid} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
      isLoading: true,
      buttonStyle: '#c79274',
    };
  }

  checkLoggedIn = async () => {
    console.log('logged in');
    this.props.navigation.reset({
      index: 0,
      routes: [{name: 'SplashScreen'}],
    });
  };

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
    
    
    let success = await this.postLogIn();

    if (success) {
      console.log('beep');
      this.checkLoggedIn();
    }
  };

  postLogIn = async () => {
    try {
      let response = await fetch('http://10.0.2.2:3333/api/1.0.0/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.state.user),
      });

      if (response.ok) {
        let json = await response.json();

        console.log('json: ' + JSON.stringify(json));

        try {
          await AsyncStorage.setItem('@user', JSON.stringify(json));
          console.log('user saved: ' + JSON.stringify(json));
          console.log('logged in');
          return true;
        } catch (e) {
          throw new Error(e);
        }
      } else {
        ToastAndroid.show(response.status.toString(), ToastAndroid.SHORT);
        throw new Error(response.status);
      }
    } catch (e) {
      console.log(e);
    }
  };

  async componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', async () => {
      this.checkLoggedIn();
    });
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  render() {
    const navigation = this.props.navigation;
    const route = this.props.route;

    //console.log(route);
    /*if(route.params.user){
      this.setState({
        email: route.params.user.email,
        password: route.params.user.password
      })
    }*/
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
