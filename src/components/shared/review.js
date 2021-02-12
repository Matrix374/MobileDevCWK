import React, {Component} from 'react';
import {View, Text} from 'react-native';

export default class Review extends Component {
  constructor(props) {
    super(props);

    this.state = {
      review: [],
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

  async componentDidMount() {
    await this.getReview();
  }

  render() {

    return (
      <View>
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

