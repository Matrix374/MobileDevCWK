import React, {Component} from 'react';
import {View, Text, TextInput, Button, ToastAndroid} from 'react-native';
import StorageService from '../../lib/storage_service';

const _storageService = new StorageService();

export default class UserUpdateView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: [],
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      success: false,
      buttonStyle: '#c79274',
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

  handleSubmitButtonClick = async () => {
    console.log(this.state.firstName);
    let user = {
      first_name: this.state.firstName ? this.state.firstName : undefined,
      last_name: this.state.lastName ? this.state.lastName : undefined,
      email: this.state.email ? this.state.email : undefined,
      password: this.state.password ? this.state.password : undefined,
    };

    console.log(user);
    await this.setState({user: user});
    this.patchUser();

    if (this.state.success) {
      this.props.navigation.navigate('UserScreen', {screen: 'User'});
    }
  };

  patchUser = async () => {
    try {
      console.log(
        'Sending PATCH request ' +
          JSON.stringify(this.state.user) +
          'TO http://10.0.2.2:3333/api/1.0.0/user/' +
          this.state.id +
          ' with AUTH:' +
          this.state.userToken,
      );
      let response = await fetch(
        'http://10.0.2.2:3333/api/1.0.0/user/' + this.state.id,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'X-Authorization': this.state.userToken,
          },
          body: JSON.stringify(this.state.user),
        },
      );

      if (response.ok) {
        console.log(response.status);
        this.setState({success: true});
      } else {
        ToastAndroid.show(response.status.toString(), ToastAndroid.SHORT);
        throw new Error(response.status);
      }
    } catch (e) {
      console.log(e);
    }
  };

  async componentDidMount() {
    let id = await _storageService.retrieveUserId();
    let userToken = await _storageService.retrieveToken();
    console.log('USER UPDATE: ' + id + ', ' + userToken);
    await this.setState({id: id, userToken: userToken});
  }

  render() {

    return (
      <View>
        <Text>UPDATE INFORMATION</Text>

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
          title="Submit"
          color={this.state.buttonStyle}
          onPress={this.handleSubmitButtonClick}>
          Submit
        </Button>
      </View>
    );
  }
}
