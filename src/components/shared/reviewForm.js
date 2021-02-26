import React, {Component, useState} from 'react';
import {View, Text, TextInput, Button, ScrollView, Alert} from 'react-native';
import {Styles} from '../../styles/mainStyle';
import profanities from '../../etc/profanityList';
import StorageService from '../../lib/storage_service';
import ReviewController from '../../controllers/reviewController';

const _storageService = new StorageService();
const _reviewController = new ReviewController();

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
      hasPhoto: false,
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

  checkReviewBodyForProfanities = () => {
    let body = this.state.review_body.toLowerCase();
    let foundProfanity = false;
    profanities.forEach((word) => {
      if (body.includes(word) === true) {
        foundProfanity = true;
      }
    });

    return foundProfanity;
  };

  checkErrors = () => {
    let errors = [];

    if (this.checkReviewBodyForProfanities() === true) {
      errors.push('Review Body Error: Profanities Found');
    }

    if (
      !this.state.quality_rating ||
      !this.state.price_rating ||
      !this.state.clenliness_rating ||
      !this.state.overall_rating
    ) {
      errors.push('Rating Error: Field Empty');
    }

    console.log(errors.toString());
    if (errors.length == 0) {
      return null;
    }
    return errors;
  };

  handleSubmitButtonClick = async () => {
    let errors = this.checkErrors();

    if (!errors) {
      console.log('Packaging Submission');
      this.setState({
        review: {
          overall_rating: parseInt(this.state.overall_rating),
          quality_rating: parseInt(this.state.quality_rating),
          price_rating: parseInt(this.state.price_rating),
          clenliness_rating: parseInt(this.state.clenliness_rating),
          review_body: this.state.review_body,
        },
      });
      if (this.state.review_id) {
        console.log('Updating...');
        if (this.patchReview() === true) {
          this.props.navigation.goBack();
        }
      } else {
        console.log('Submitting...');
        if (this.postReview() === true) {
          this.props.navigation.goBack();
        }
      }
    } else {
      //Submission Error
      console.log('Submission Error');
      let errorString = '';

      errors.forEach((e) => {
        errorString += e + '\n';
      });

      console.log(errorString);

      Alert.alert('Errors Found: \n' + errorString);
    }
  };

  postReview = async () => {
    try {
      console.log(
        'Sending POST request ' +
          JSON.stringify(this.state.review) +
          'TO http://10.0.2.2:3333/api/1.0.0/location/' +
          this.state.location_id +
          '/review with AUTH:' +
          this.state.userToken,
      );
      let response = await _reviewController.postReview(
        this.state.location_id,
        JSON.stringify(this.state.review),
        this.state.userToken,
      );

      if (response.ok) {
        console.log(response.status);
        Alert.alert('Review Created');
        return true;
      } else {
        Alert.alert(response.status + ':' + response.statusText);
        throw new Error(response.status);
      }
    } catch (e) {
      console.log(e);
    }
  };

  patchReview = async () => {
    try {
      console.log(
        'Sending PATCH request ' +
          JSON.stringify(this.state.review) +
          'TO http://10.0.2.2:3333/api/1.0.0/location/' +
          this.state.location_id +
          '/review/' +
          this.state.review_id +
          ' with AUTH:' +
          this.state.userToken,
      );
      let response = await _reviewController.patchReview(
        this.state.location_id,
        this.state.review_id,
        JSON.stringify(this.state.review),
        this.state.userToken,
      );

      if (response.ok) {
        console.log(response.status);
        Alert.alert('Review Updated');
        return true;
      } else {
        Alert.alert(response.status + ':' + response.statusText);
        throw new Error(response.status);
      }
    } catch (e) {
      console.log(e);
    }
  };

  checkPhoto = async () => {
    try {
      let response = await _reviewController.checkReviewPhoto(
        this.state.location_id,
        this.state.review_id,
        this.state.userToken,
      );

      if (response.ok) {
        console.log('Photo Exists');
        this.setState({hasPhoto: true});
      }
    } catch (e) {
      console.error(e);
    }
  };

  handleDeletePhotoButton = async () => {
    let success = await this.deletePhoto();

    if (success) {
      Alert.alert('Photo Deleted');
    }
  };

  deletePhoto = async () => {
    try {
      let response = await _reviewController.deleteReviewPhoto(
        this.state.location_id,
        this.state.review_id,
        this.state.userToken,
      );

      if (response.ok) {
        console.log('Photo Deleted');
        this.setState({hasPhoto: false});
        return true;
      } else {
        Alert.alert(response.status + ':' + response.statusText);
      }
    } catch (e) {
      console.error(e);
    }
  };

  async componentDidMount() {
    let userToken = await _storageService.retrieveToken();
    this.setState({
      userToken: userToken,
      review_id: this.props?.review_id,
      location_id: this.props.location_id,
    });

    console.log('props.review_id: ' + this.props?.review_id);
    console.log('state.review_id: ' + this.state.review_id);
    console.log('props.location:' + this.props.location_id);
    console.log('state.location:' + this.state.location_id);

    this.checkPhoto();
  }

  render() {
    let TakePhoto = (
      <Button
        title="Add Picture"
        onPress={() => {
          this.props.navigation.navigate('Camera', {
            location_id: this.state.location_id,
            review_id: this.state.review_id,
          });
        }}
      />
    );

    let DeletePhoto = (
      <Button
        title="Delete Picture"
        onPress={() => {
          this.handleDeletePhotoButton();
        }}
      />
    );

    let EditComponents = (
      <View>{this.state.hasPhoto === true ? DeletePhoto : TakePhoto}</View>
    );
    return (
      <ScrollView>
        <View style={Styles.item}>
          <Text style={Styles.title}>Quality Rating:</Text>
          <TextInput
            style={Styles.rating}
            placeholder="(Rate 1-5)"
            onChangeText={(input) => {
              this.handleQualityRatingInput(input);
            }}
            value={this.state.quality_rating}
          />
          {!!this.state.quality_rating_error && (
            <Text style={Styles.error}>{this.state.quality_rating_error}</Text>
          )}

          <Text style={Styles.title}>Price Rating:</Text>
          <TextInput
            style={Styles.rating}
            placeholder="(Rate 1-5)"
            onChangeText={(input) => {
              this.handlePriceRatingInput(input);
            }}
            value={this.state.price_rating}
          />
          {!!this.state.price_rating_error && (
            <Text style={Styles.error}>{this.state.price_rating_error}</Text>
          )}

          <Text style={Styles.title}>Cleanliness Rating:</Text>
          <TextInput
            style={Styles.rating}
            placeholder="(Rate 1-5)"
            onChangeText={(input) => {
              this.handleCleanlinessRatingInput(input);
            }}
            value={this.state.clenliness_rating}
          />
          {!!this.state.clenliness_rating_error && (
            <Text style={Styles.error}>
              {this.state.clenliness_rating_error}
            </Text>
          )}

          <Text style={Styles.title}>Overall Rating:</Text>
          <TextInput
            style={Styles.rating}
            placeholder="(Rate 1-5)"
            onChangeText={(input) => {
              this.handleOverallRatingInput(input);
            }}
            value={this.state.overall_rating}
          />
          {!!this.state.overall_rating_error && (
            <Text style={Styles.error}>{this.state.overall_rating_error}</Text>
          )}

          <Text style={Styles.title}>Comments:</Text>
          <TextInput
            style={Styles.review_body}
            placeholder={'Enter Comment... (maxLength: ' + maxChar + ')'}
            multiline={true}
            parseIntOfLines={4}
            maxLength={maxChar}
            onChangeText={(input) => {
              this.handleReviewBodyInput(input);
            }}
            value={this.state.review_body}
          />

          {this.state.review_id ? EditComponents : null}
        </View>

        <View style={{paddingHorizontal: 75, borderRadius: 200}}>
          <Button
            title={this.state.review_id ? 'Update' : 'Submit'}
            onPress={this.handleSubmitButtonClick}>
            Submit
          </Button>
        </View>
      </ScrollView>
    );
  }
}
