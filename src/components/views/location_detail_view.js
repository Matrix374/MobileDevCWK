import React, {Component} from 'react';
import {View, FlatList, Button, Alert} from 'react-native';
import {Styles} from '../../styles/mainStyle';

import StorageService from '../../lib/storage_service';
import LocationController from '../../controllers/locationController';
import Loading from '../shared/loading';
import Location from '../shared/location';
import Review from '../shared/review';

const _storageService = new StorageService();
const _locationController = new LocationController();

export default class LocationDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userToken: '',
      favourite: false,
      location_id: null,
      isLoading: true,
      location: [],
      user_reviews: [],
      user_likes: [],
    };
  }

  handleReviewButton = async () => {
    console.log('Leave Review Pressed');
    this.props.navigation.navigate('ReviewCreate', {
      location_id: this.state.location_id,
      review_id: null,
    });
  };

  getData = async () => {
    try {
      let json = await _locationController.getLocationData(
        this.state.location_id,
        this.state.userToken,
      );

      this.setState({
        isLoading: false,
        location: json,
      });
    } catch (e) {
      throw new Error('Location Detail: ' + e);
    }
  };

  getReviews = async () => {
    let user_reviews = await _storageService.retrieveReviews();

    this.setState({user_reviews: user_reviews});
  };

  getLikes = async () => {
    let user_likes = await _storageService.retrieveLikes();

    this.setState({user_likes: user_likes});
  };

  handleFavouriteButton = async () => {
    console.log('Favourite Button Pressed');

    if (this.state.favourite) {
      await this.deleteFavourite();
    } else {
      await this.postFavourite();
    }
  };

  postFavourite = async () => {
    try {
      let response = await _locationController.postLocationFavourite(
        this.state.location_id,
        this.state.userToken,
      );

      if (response.ok) {
        console.log('Favourited ' + this.state.location.location_name);
        this.setState({favourite: true});
        Alert.alert('Favourited ' + this.state.location.location_name);
      } else {
        Alert.alert('Error: ' + response.status + ':' + response.statusText);
      }
    } catch (e) {
      console.log(e);
    }
  };

  deleteFavourite = async () => {
    try {
      let response = await _locationController.deleteLocationFavourite(
        this.state.location_id,
        this.state.userToken,
      );

      if (response.ok) {
        console.log('Un-Favourited ' + this.state.location.location_name);
        this.setState({favourite: false});
        Alert.alert('Un-Favourited ' + this.state.location.location_name);
      } else {
        Alert.alert('Error: ' + response.status + ':' + response.statusText);
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
    this.getReviews();
    this.getLikes();

    this._unsubscribe = this.props.navigation.addListener('focus', async () => {
      this.getData();
      this.getReviews();
      this.getLikes();
    });
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  render() {
    const renderItem = ({item}) => (
      <View style={Styles.item}>
        <Review
          review={item}
          location_id={this.state.location_id}
          userToken={this.state.userToken}
          navigation={this.props.navigation}
          user_reviews={this.state.user_reviews}
          like={this.state.user_likes.includes(item.review_id)}
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
        <View style={Styles.bg}>
          <FlatList
            ListHeaderComponent={
              <>
                <View style={Styles.item}>
                  <Location location={this.state.location} />
                  <Button
                    color="red"
                    title="Leave a Review"
                    onPress={this.handleReviewButton}>
                    Leave a Review
                  </Button>
                  <Button
                    color="red"
                    title={this.state.favourite ? 'Un-Favourite' : 'Favourite'}
                    onPress={this.handleFavouriteButton}></Button>
                </View>
              </>
            }
            data={this.state.location.location_reviews}
            renderItem={renderItem}
            keyExtractor={(item) => item.review_id.toString()}
          />
        </View>
      );
    }
  }
}
