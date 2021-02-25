import React, {Component} from 'react';
import {View, Text, FlatList, Button, Alert, ScrollView} from 'react-native';
import StorageService from '../../lib/storage_service';
import UserController from '../../controllers/userController';
import Methods from '../../lib/methods';

import {Styles} from '../../styles/mainStyle';

import LogOut from '../shared/logOut';
import Loading from '../shared/loading';
import Review from '../shared/review';

const _storageService = new StorageService();
const _userController = new UserController();
const _methods = new Methods();

export default class UserView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      id: '',
      userToken: '',
      user: [],
      user_reviews: [],
    };
  }

  handleUpdateButton = async () => {
    console.log('Update User Pressed');
    this.props.navigation.navigate('UserScreen', {
      screen: 'UserUpdate',
    });
  };

  getUser = async () => {
    let user = await _userController.GetUserAsync(
      this.state.id,
      this.state.userToken,
    );

    await this.saveFavourites(user.favourite_locations);
    await this.saveReviews(user.reviews);

    this.getReviews();

    this.setState({
      isLoading: false,
      user: user,
    });
  };

  getReviews = async () => {
    let user_reviews = await _storageService.retrieveReviews();

    this.setState({user_reviews: user_reviews});
  };

  saveReviews = async (reviews) => {
    let review_ids = _methods.getReviewIds(reviews);
    await _storageService.saveReviews(review_ids);
  };

  saveFavourites = async (fav_locations) => {
    let fav_ids = _methods.getFavouriteIds(fav_locations);
    await _storageService.saveFavourites(fav_ids);
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

  async componentWillUnmount() {
    await this._unsubscribe();
  }

  render() {
    const renderItem = ({item}) => (
      <View style={Styles.container_favourite}>
        <Text style={Styles.title}>
          Location: {item.location.location_name}
        </Text>
        <Text style={Styles.subtitle}>
          Location ID: {item.location.location_id}
        </Text>
        <Review
          review={item.review}
          location_id={item.location.location_id}
          userToken={this.state.userToken}
          navigation={this.props.navigation}
          user_reviews={this.state.user_reviews}
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
        <ScrollView style={Styles.bg}>
          <LogOut navigation={this.props.navigation} />
          <View style={Styles.container}>
            <Button
              title="Update User Information"
              onPress={this.handleUpdateButton}>
              Update User Information
            </Button>

            <Text style={Styles.title}>
              Name: {this.state.user.first_name} {this.state.user.last_name}
            </Text>
            <Text style={Styles.title}>E-Mail: {this.state.user.email}</Text>
            <Text style={Styles.title}>User Id: {this.state.user.user_id}</Text>
            <Text style={Styles.title}>Reviews Made:</Text>
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
          </View>
        </ScrollView>
      );
    }
  }
}
