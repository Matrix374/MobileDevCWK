import React, {Component, useState} from 'react';
import {View, Text, TextInput, Button} from 'react-native';
import {onChange} from 'react-native-reanimated';
import StorageService from '../lib/storage_service';

const _storageService = new StorageService();

export default class ReviewForm extends Component {
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
      review_id: '',
    };
  }

  handleReviewBodyInput = (input) => {
    this.setState({review: {review_body: input}});
  };

  async componentDidMount() {
    let userToken = await _storageService.retrieveToken();
    await this.setState({
      userToken: userToken,
      review_id: this.props.review_id,
      location_id: this.props.location_id,
    });
  }

  render() {
    return (
      <View>
        <TextInput
          placeholder={props?.placeholder ? props.placeholder : ''}
          onChangeText={(input) => {
            this.handleReviewBodyInput(input);
          }}
          value={this.state.review_body}
        />

        <Text>State.Review: {JSON.stringify(this.state.review)}</Text>
        <Text>State: {JSON.stringify(this.state)}</Text>
      </View>
    );
  }
}
