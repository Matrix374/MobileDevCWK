import React, {Component} from 'react';
import {View, Text, FlatList, Button, ToastAndroid} from 'react-native';
import Lib from '../lib/lib';
import Loading from '../shared/loading';
import Review from '../shared/review';
import { Styles } from '../../styles/mainStyle'

const common = new Lib();

export default class HomeView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      id: '',
      userToken: '',
      user: [],
    };
  }

  getUser = async () => {
    try {
      let response = await fetch(
        'http://10.0.2.2:3333/api/1.0.0/user/' + this.state.id,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'X-Authorization': this.state.userToken,
          },
        },
      );

      let json = await response.json();

      console.log(JSON.stringify(json.reviews[0].review));

      this.setState({
        isLoading: false,
        user: json,
      });
    } catch (e) {
      throw new Error(e);
    }
  };

  async componentDidMount() {
    let id = await common.retrieveUserId();
    let userToken = await common.retrieveToken();
    console.log('USER: ' + id + ', ' + userToken);
    await this.setState({id: id, userToken: userToken});
    await this.getUser();
  }

  render() {
    const renderItem = ({item}) => (
      <View style={Styles.container}>
        <Text>Location: {item.location.location_name}</Text>
        <Review review={item.review} />
      </View>
    );

    if (this.state.isLoading) {
      return (
        <View>
          <Loading />
        </View>
      );
    } else {
      return (
        <View>
          <Text>User Id: {this.state.user.user_id}</Text>
          <Text>First Name: {this.state.user.first_name}</Text>
          <Text>Last Name: {this.state.user.last_name}</Text>
          <Text>E-Mail: {this.state.user.email}</Text>
          <FlatList
            data={this.state.user.reviews}
            renderItem={renderItem}
          />
        </View>
      );
    }
  }
}
