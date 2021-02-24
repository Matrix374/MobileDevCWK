import React, {Component} from 'react';
import {View, Button} from 'react-native';

import StorageService from '../../lib/storage_service';
import Methods from '../../lib/methods';
import UserController from '../../controllers/userController';

const _storageService = new StorageService();
const _methods = new Methods();
const _userController = new UserController();

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
    return await _userController.LogOutUserAsync(this.state.userToken);
  }

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
