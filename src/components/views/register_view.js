import React, {Component} from 'react';
import {View, Text, TextInput, Button, ToastAndroid} from 'react-native';
import FormErrorsEnum from '../../enums/formErrorEnums'

export default class RegisterView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        first_name: '',
        last_name: '',
        email: '',
        password: '',
      },
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      success: false,
      error: false,
      errorType: '',
    };
  }
  handleFirstNameChange = (firstName) => {
    this.setState({firstName: firstName});
  };

  handleLastNameChange = (lastName) => {
    this.setState({lastName: lastName});
  };

  handleEmailChange = (email) => {
    this.setState({email: email});
  };

  handlePasswordChange = (password) => {
    this.setState({password: password});
  };

  handleRegisterButtonClick = async () => {
    this.state.user = {
      first_name: this.state.firstName,
      last_name: this.state.lastName,
      email: this.state.email,
      password: this.state.password,
    };
    
    if(this.state.firstName || this.state.lastName || this.state.email || this.state.password )
    {
      await this.postRegister();
    } else {
      this.setState({error: true, errorType: FormErrorsEnum.EMPTY_FORM})
    }
    

    if(this.state.success)
    {
      this.props.navigation.navigate('LogIn');
    }
  };

  postRegister = async () => {
    try {
      let response = await fetch('http://10.0.2.2:3333/api/1.0.0/user/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.state.user),
      });

      if (response.ok) {
        let json = await response.json();

        console.log('json: ' + JSON.stringify(json));

        this.setState({success: true})
      } else {
        ToastAndroid.show(response.status.toString(), ToastAndroid.SHORT);
        throw new Error(response.status);
      }
    } catch (e) {
      console.log(e);
    }
  };

  handleError = () => {
    switch (this.state.errorType) {
      case FormErrorsEnum.BAD_REQUEST: {
        console.log('BAD REQUEST');
        return 'Invalid Entries';
      }
      case FormErrorsEnum.EMPTY_FORM:
        return 'Form Empty';
      default:
        return 'Unknown Error';
    }
  };

  //Refactor Goals: Use Forms and Form-Bodies instead of this?
  render() {
    return (
      <View>
        <Text>{this.state.error ? this.handleError() : ''}</Text>

        <TextInput
          placeholder="Enter First Name"
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={this.handleFirstNameChange}
          value={this.state.firstName}
        />
        <TextInput
          placeholder="Enter Last Name"
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={this.handleLastNameChange}
          value={this.state.lastName}
        />

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
