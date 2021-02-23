import React, {Component} from 'react';
import {Button, View, Text} from 'react-native';

export default class Review extends Component {
  constructor(props) {
    super(props);

    this.state = {
      review: [],
      userToken: ''
    };
  }

  getReview = async () => {
    try {
      console.log('trying to retrieve reviews');
      let review = this.props.review;
      await this.setState({review: review});
    } catch (e) {
      throw new Error(e);
    }
  };

  handleDeleteReviewButton = async () => {
    //Are you sure?
    this.deleteReview();
    //Reset View
  };

  handleUpdateReviewButton = async () => {
    this.props.navigation.navigate('ReviewUpdate', {
      location_id: this.state.location_id,
      review_id: this.state.review.review_id,
    });
  };

  deleteReview = async () => {
    try {
      console.log(
        'Sending DELETE request ' +
          JSON.stringify(this.state.review) +
          'TO http://10.0.2.2:3333/api/1.0.0/location/' +
          this.state.location_id +
          '/review/' +
          this.state.review.review_id +
          ' with AUTH:' +
          this.state.userToken,
      );
      let response = await fetch(
        'http://10.0.2.2:3333/api/1.0.0/location/' +
          this.state.location_id +
          '/review/' +
          this.state.review.review_id,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'X-Authorization': this.state.userToken,
          },
        },
      );

      if (response.ok) {
        console.log(response.status);
        this.setState({success: true});
      } else {
        throw new Error(response.status);
      }
    } catch (e) {
      console.log(e);
    }
  };

  async componentDidMount() {
    await this.getReview();

    let userToken = this.props.userToken;
    let loc_id = this.props.location_id;

    await this.setState({userToken: userToken, location_id: loc_id});
  }

  render() {
    return (
      <View>
        <Button title="Update Review" onPress={this.handleUpdateReviewButton}>
          Update Review
        </Button>
        <Button title="Delete Review" onPress={this.handleDeleteReviewButton}>
          Delete Review
        </Button>
        <Text>Review Id: {this.state.review.review_id}</Text>
        <Text>Overall Rating: {this.state.review.overall_rating}</Text>
        <Text>Price Rating: {this.state.review.price_rating}</Text>
        <Text>Quality Rating: {this.state.review.quality_rating}</Text>
        <Text>Cleanliness Rating: {this.state.review.clenliness_rating}</Text>
        <Text>{this.state.review.review_body}</Text>
      </View>
    );
  }
}
