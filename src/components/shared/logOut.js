import React, {Component} from 'react';
import {View, Button} from 'react-native';

import StorageService from '../../lib/storage_service';
import Methods from '../../lib/methods';

const _storageService = new StorageService();
const _methods = new Methods();

export default class LogOut extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userToken: '',
    };
  }

  handleLogOutButton = async () => {
    if (await this.postLogOut()) await _storageService.DeleteUser();

    _methods.checkLoggedIn(this.props.navigation);
  };

  postLogOut = async () => {
    try {
      let response = await fetch('http://10.0.2.2:3333/api/1.0.0/user/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Authorization': this.state.userToken,
        },
      });

      if (response.ok) {
        console.log('Logged Out');
        return true;
      } else {
        throw new Error(response.status);
      }
    } catch (e) {
      console.log(e);
    }
  };

  async componentDidMount() {
    let userToken = await _storageService.retrieveToken();
    await this.setState({userToken: userToken});
    console.log('LogOut: ' + this.state.userToken);
  }

  render() {
    return (
      <View>
        <Button title="Log Out" onPress={this.handleLogOutButton}>
          Log Out
        </Button>
      </View>
    );
  }
}
