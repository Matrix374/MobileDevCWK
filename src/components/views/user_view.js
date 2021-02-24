import React, {Component} from 'react';
import {View, Text, FlatList, Button, Alert, ScrollView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import StorageService from '../../lib/storage_service';
import Loading from '../shared/loading';
import Review from '../shared/review';
import {Styles} from '../../styles/mainStyle';

const _storageService = new StorageService();

export default class UserView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      id: '',
      userToken: '',
      user: [],
    };
  }

  handleUpdateButton = async () => {
    console.log('Update User Pressed');
    this.props.navigation.navigate('UserScreen', {
      screen: 'UserUpdate',
    });
  };

  getUser = async () => {
    try {
      console.log('Getting User');
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

      if (response.ok) {
        let json = await response.json();

        console.log(JSON.stringify(json.reviews[0].review));

        this.saveFavourites(json.favourite_locations);
        this.setState({
          isLoading: false,
          user: json,
        });
      } else {
        console.log(response.status);
        this.setState({
          isLoading: false,
        });
      }
    } catch (e) {
      throw new Error(e);
    }
  };

  saveFavourites = async (fav_locations) => {
    let fav_ids = [];

    fav_locations.forEach((fav) => {
      fav_ids.push(fav.location_id);
    });

    try {
      await AsyncStorage.setItem('@user_favourites', JSON.stringify(fav_ids));
      console.log('Saved ' + JSON.stringify(fav_ids));
    } catch (e) {
      console.log(e);
    }
  };

  async componentDidMount() {
    let id = await _storageService.retrieveUserId();
    let userToken = await _storageService.retrieveToken();
    console.log('USER: ' + id + ', ' + userToken);
    await this.setState({id: id, userToken: userToken});

    await this.getUser();
    this._unsubscribe = this.props.navigation.addListener('focus', async () => {
      await this.getUser();
    });
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  render() {
    const renderItem = ({item}) => (
      <View style={Styles.container}>
        <Text>Location: {item.location.location_name}</Text>
        <Text>Location ID: {item.location.location_id}</Text>
        <Review
          review={item.review}
          location_id={item.location.location_id}
          userToken={this.state.userToken}
          navigation={this.props.navigation}
        />
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
          <ScrollView>
            <Button
              title="Update User Information"
              onPress={this.handleUpdateButton}>
              Update User Information
            </Button>
            <Text>User Id: {this.state.user.user_id}</Text>
            <Text>First Name: {this.state.user.first_name}</Text>
            <Text>Last Name: {this.state.user.last_name}</Text>
            <Text>E-Mail: {this.state.user.email}</Text>
            <Text>Reviews Made:</Text>
            <FlatList
              data={this.state.user.reviews}
              renderItem={renderItem}
              keyExtractor={(item) => item.review.review_id}
            />
            <Text>Reviews Liked:</Text>
            <FlatList
              data={this.state.user.liked_reviews}
              renderItem={renderItem}
              keyExtractor={(item) => item.review.review_id}
            />
          </ScrollView>
        </View>
      );
    }
  }
}
