import React, {Component} from 'react';
import {View} from 'react-native';
import StorageService from '../lib/storage_service';
import ReviewForm from '../shared/reviewForm';

const _storageService = new StorageService();

export default class ReviewCreate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      review: {
        overall_rating: null,
        price_rating: null,
        quality_rating: null,
        clenliness_rating: null,
        review_body: '',
      },
      userToken: '',
      location_id: '',
    };
  }

  async componentDidMount() {
    let userToken = await _storageService.retrieveToken();
    let params = this.props.route.params;

    console.log('ReviewCreate Params: ' + params.location_id);
    await this.setState({
      userToken: userToken,
      location_id: params.location_id,
    });
  }

  render() {
    return (
      <View>
        <ReviewForm location_id={this.state.location_id} />
      </View>
    );
  }
}