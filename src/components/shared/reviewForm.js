import React, {Component, useState} from 'react';
import {View, Text, TextInput, Button} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import StorageService from '../lib/storage_service';

const _storageService = new StorageService();
const maxChar = 240;
const maxRating = 5;

const ratingRangeErrorMessage = 'Value must be between 1-5';

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
      overall_rating: null,
      overall_rating_error: '',
      price_rating: null,
      price_rating_error: '',
      quality_rating: null,
      quality_rating_error: '',
      clenliness_rating: null,
      clenliness_rating_error: '',
      review_body: '',
      userToken: '',
      location_id: '',
      review_id: '',
    };
  }

  isRatingValid = (value) => {
    return !isNaN(value) && value > 0 && value <= maxRating;
  };

  isReviewBodyValid = (value) => {
    return !(value <= maxChar) || !value;
  };

  handleQualityRatingInput = (input) => {
    let isNum = this.isRatingValid(input);

    if (isNum) {
      this.setState({
        quality_rating: input,
        quality_rating_error: '',
      });
    } else {
      this.setState({
        quality_rating: '',
        quality_rating_error: ratingRangeErrorMessage,
        error: true,
      });
    }
  };

  handlePriceRatingInput = (input) => {
    let isNum = this.isRatingValid(input);

    if (isNum) {
      this.setState({price_rating: input, price_rating_error: ''});
    } else {
      this.setState({
        price_rating: '',
        price_rating_error: ratingRangeErrorMessage,
        error: true,
      });
    }
  };

  handleCleanlinessRatingInput = (input) => {
    let isNum = this.isRatingValid(input);

    if (isNum) {
      this.setState({
        clenliness_rating: input,
        clenliness_rating_error: '',
      });
    } else {
      this.setState({
        clenliness_rating: '',
        clenliness_rating_error: ratingRangeErrorMessage,
        error: true,
      });
    }
  };

  handleOverallRatingInput = (input) => {
    let isNum = this.isRatingValid(input);

    if (isNum) {
      this.setState({
        overall_rating: input,
        overall_rating_error: '',
      });
    } else {
      this.setState({
        overall_rating: '',
        overall_rating_error: ratingRangeErrorMessage,
        error: true,
      });
    }
  };

  handleReviewBodyInput = (input) => {
    if (this.isReviewBodyValid(input)) this.setState({review_body: input});
  };

  checkErrors = async () => {
    let foundError = false;

    let ratings = [
      this.state.quality_rating,
      this.state.price_rating,
      this.state.clenliness_rating,
      this.state.overall_rating
    ];

    //ToDo: Change Placeholder Error Validation
    //the error will not be recorded if there's no error on the ratings side
    if (this.state.review_body === '') {
      console.log('Review Body Error')
      foundError = true;
    }

    ratings.forEach(async (rating, i) => {
      if (!this.isRatingValid(rating)) {
        foundError = true;
        console.log('Rating Error, Rating # ' + i);
        return;
      }
    });

    console.log("Found Error? " + foundError);
    return foundError;
  };
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
        <ScrollView>
          <Text>Quality Rating:</Text>
          <TextInput
            placeholder="(Rate 1-5)"
            onChangeText={(input) => {
              this.handleQualityRatingInput(input);
            }}
            value={this.state.quality_rating}
          />
          {!!this.state.quality_rating_error && (
            <Text style={{color: 'red'}}>
              {this.state.quality_rating_error}
            </Text>
          )}

          <Text>Price Rating:</Text>
          <TextInput
            placeholder="(Rate 1-5)"
            onChangeText={(input) => {
              this.handlePriceRatingInput(input);
            }}
            value={this.state.price_rating}
          />
          {!!this.state.price_rating_error && (
            <Text style={{color: 'red'}}>{this.state.price_rating_error}</Text>
          )}

          <Text>Cleanliness Rating:</Text>
          <TextInput
            placeholder="(Rate 1-5)"
            onChangeText={(input) => {
              this.handleCleanlinessRatingInput(input);
            }}
            value={this.state.clenliness_rating}
          />
          {!!this.state.clenliness_rating_error && (
            <Text style={{color: 'red'}}>
              {this.state.clenliness_rating_error}
            </Text>
          )}

          <Text>Overall Rating:</Text>
          <TextInput
            placeholder="(Rate 1-5)"
            onChangeText={(input) => {
              this.handleOverallRatingInput(input);
            }}
            value={this.state.overall_rating}
          />
          {!!this.state.overall_rating_error && (
            <Text style={{color: 'red'}}>
              {this.state.overall_rating_error}
            </Text>
          )}

          <Text>Comments:</Text>
          <TextInput
            placeholder={'Enter Comment... (maxLength: ' + maxChar + ')'}
            multiline={true}
            parseIntOfLines={4}
            maxLength={maxChar}
            onChangeText={(input) => {
              this.handleReviewBodyInput(input);
            }}
            value={this.state.review_body}
          />
        </ScrollView>
      </View>
    );
  }
}
