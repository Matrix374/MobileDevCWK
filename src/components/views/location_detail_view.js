import React, {Component} from 'react';
import {View, Text, FlatList, Button, ToastAndroid} from 'react-native';
import {Styles} from '../../styles/mainStyle';

import StorageService from '../lib/storage_service';
import Loading from '../shared/loading';
import Location from '../shared/location';
import Review from '../shared/review';

const _storageService = new StorageService();

export default class LocationDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userToken: '',
      favourite: false,
      location_id: null,
      isLoading: true,
      location: [],
    };
  }

  handleReviewButton = async () => {
    console.log('Leave Review Pressed');
    this.props.navigation.navigate('ReviewCreate', {location_id: this.state.location_id, review_id: null})
  };

  getData = async () => {
    try {
      let response = await fetch(
        'http://10.0.2.2:3333/api/1.0.0/location/' + this.state.location_id,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'X-Authorization': this.state.userToken,
          },
        },
      );

      let json = await response.json();

      this.setState({
        isLoading: false,
        location: json,
      });
    } catch (e) {
      throw new Error('Location Detail: ' + e);
    }
  };

  handleFavouriteButton = async () => {
    console.log('Favourite Pressed');

    if (this.state.favourite) {
      this.deleteFavourite();
      this.setState({favourite: false});
    } else {
      this.postFavourite();
      this.setState({favourite: true});
    }
  };

  postFavourite = async () => {
    try {
      let response = await fetch(
        'http://10.0.2.2:3333/api/1.0.0/location/' +
          this.state.location_id.toString() +
          '/favourite',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Authorization': this.state.userToken,
          },
        },
      );

      if (response.ok) {
        console.log('Favourited');
      }
    } catch (e) {
      console.log(e);
    }
  };

  deleteFavourite = async () => {
    try {
      let response = await fetch(
        'http://10.0.2.2:3333/api/1.0.0/location/' +
          this.state.location_id +
          '/favourite',
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'X-Authorization': this.state.userToken,
          },
        },
      );

      if (response.ok) {
        console.log('Un-Favourited');
      }
    } catch (e) {
      console.log(e);
    }
  };

  async componentDidMount() {
    let location_id = this.props.route.params?.location_id;
    let favourite = this.props.route.params?.favourite;
    await this.setState({location_id: location_id, favourite: favourite});
    console.log('Location Id: ' + this.state.location_id);
    console.log('Favourite: ' + this.state.favourite);

    let userToken = await _storageService.retrieveToken();
    await this.setState({userToken: userToken});
    console.log('LocationDetail: ' + this.state.userToken);

    this.getData();
  }

  render() {
    const renderItem = ({item}) => (
      <View style={Styles.container}>
        <Review
          review={item}
          location_id={this.state.location_id}
          userToken={this.state.userToken}
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
          <Text>Location ID: {this.state.location_id}</Text>
          <Location location={this.state.location} />
          <Button title="Leave a Review" onPress={this.handleReviewButton}>
            Leave a Review
          </Button>
          <Button
            title={this.state.favourite ? 'Un-Favourite' : 'Favourite'}
            onPress={this.handleFavouriteButton}></Button>
          <FlatList
            data={this.state.location.location_reviews}
            renderItem={renderItem}
            keyExtractor={(item) => item.review_id.toString()}
          />
        </View>
      );
    }
  }
}
