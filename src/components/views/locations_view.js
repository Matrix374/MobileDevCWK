import React, {Component} from 'react';
import {View, FlatList, Text, Button, TouchableOpacity} from 'react-native';
import UserController from '../../controllers/userController';
import Methods from '../../lib/methods';
import StorageService from '../../lib/storage_service';
import {Styles} from '../../styles/mainStyle';

import Loading from '../shared/loading';
import LogOut from '../shared/logOut';

const _storageService = new StorageService();
const _userController = new UserController();
const _methods = new Methods();

export default class LocationsView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userToken: '',
      favourites: [],
      isLoading: true,
      locations: [],
      user: [],
    };
  }

  handleLocationButton = (id, favourite) => {
    console.log('Go to Location ' + id);
    this.props.navigation.navigate('LocationDetail', {
      location_id: id,
      favourite: favourite,
    });
  };

  getData = async () => {
    try {
      let response = await fetch('http://10.0.2.2:3333/api/1.0.0/find', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Authorization': this.state.userToken,
        },
      });

      let json = await response.json();

      this.setState({
        isLoading: false,
        locations: json,
      });
    } catch (e) {
      throw new Error(e);
    }
  };

  getUser = async () => {
    let user_id = await _storageService.retrieveUserId();
    let user = await _userController.GetUserAsync(
      user_id,
      this.state.userToken,
    );
    await this.saveFavourites(user.favourite_locations);
    await this.saveReviews(user.reviews);
    await this.saveLikes(user.liked_reviews);

    let favourites = await _storageService.retrieveFavourites();
    this.setState({favourites: favourites});
  };

  saveReviews = async (reviews) => {
    let review_ids = _methods.getReviewIds(reviews);
    console.log('review ids: ' + review_ids);
    await _storageService.saveReviews(review_ids);
  };

  saveLikes = async (liked_reviews) => {
    let review_ids = _methods.getReviewIds(liked_reviews);
    console.log('liked review ids: ' + review_ids);
    await _storageService.saveLikes(review_ids);
  };

  saveFavourites = async (fav_locations) => {
    let fav_ids = _methods.getFavouriteIds(fav_locations);
    await _storageService.saveFavourites(fav_ids);
  };

  async componentDidMount() {
    let userToken = await _storageService.retrieveToken();
    this.setState({userToken: userToken});

    console.log('Home: ' + this.state.userToken);
    console.log('Home Favourites: ' + this.state.favourites);

    this.getData();
    this.getUser();
    this._unsubscribe = this.props.navigation.addListener('focus', async () => {
      this.getData();
      this.getUser();
    });
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  render() {
    const renderItem = ({item}) => (
      <View
        style={
          this.state.favourites.includes(item.location_id)
            ? Styles.item_favourite
            : Styles.item
        }>
        <TouchableOpacity
          onPress={() => {
            this.handleLocationButton(
              item.location_id,
              this.state.favourites.includes(item.location_id),
            );
          }}>
          {this.state.favourites.includes(item.location_id) ? (
            <Text style={Styles.subtitle_favourite}>Favourited</Text>
          ) : null}
          <Text style={Styles.title}>{item.location_name}</Text>
          <Text style={Styles.subtitle}>Locations: {item.location_town}</Text>
          <Text style={Styles.subtitle}>Rating: {item.avg_overall_rating}</Text>
          <Text style={Styles.subtitle}>Price: {item.avg_price_rating}</Text>
        </TouchableOpacity>
      </View>
    );

    if (this.state.isLoading) {
      return (
        <View>
          <Loading />
          <LogOut />
        </View>
      );
    } else {
      return (
        <View style={Styles.container}>
          <FlatList
            data={this.state.locations}
            renderItem={renderItem}
            keyExtractor={(item) => item.location_id.toString()}
          />
        </View>
      );
    }
  }
}
