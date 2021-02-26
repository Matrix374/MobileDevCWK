import React, {Component} from 'react';
import {View, Text, TextInput, Button, ToastAndroid} from 'react-native';
import Methods from '../../lib/methods';
import FormErrorsEnum from '../../enums/formErrorEnums';
import UserController from '../../controllers/userController';
import StorageService from '../../lib/storage_service';
import {Styles} from '../../styles/mainStyle';

const _methods = new Methods();
const _userController = new UserController();
const _storageService = new StorageService();

export default class LogInView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        email: '',
        password: '',
        id: null,
        userToken: null,
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
    let user = await _userController.LogInUserAsync(
      JSON.stringify(this.state.user),
    );

    if (user) {
      await _storageService.saveUser(user);
      return true;
    } else {
      this.setState({error: true, errorType: FormErrorsEnum.BAD_REQUEST});
    }
  };

  handleError = () => {
    switch (this.state.errorType) {
      case FormErrorsEnum.BAD_REQUEST: {
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
      <View style={Styles.container}>
        <View></View>
        <View
          style={{flex: 1, alignContent: 'center', justifyContent: 'center'}}>
          <View
            style={{
              padding: 60,
              flexDirection: 'column',
              alignContent: 'space-between',
            }}>
            <Text style={Styles.error}>
              {this.state.error ? this.handleError() : ''}
            </Text>
            <TextInput
              placeholder="Enter Email"
              style={{
                backgroundColor: 'white',
                fontSize: 18,
              }}
              onChangeText={this.handleEmailChange}
              value={this.state.email}
            />
            <TextInput
              placeholder="Enter Password"
              style={{
                backgroundColor: 'white',
                fontSize: 18,
              }}
              onChangeText={this.handlePasswordChange}
              value={this.state.password}
              secureTextEntry={true}
            />
          </View>

          <View
            style={{
              flexDirection: 'column',
              padding: 20,
              alignContent: 'space-between',
            }}>
            <Button
              title="Log-In"
              color="#d46f4d"
              onPress={this.handleLogInButtonClick}>
              Log-In
            </Button>
            <Button
              color="#d46f4d"
              title="Register"
              onPress={() => navigation.navigate('Register')}
            />
          </View>
        </View>
      </View>
    );
  }
}
