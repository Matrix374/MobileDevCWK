import React, {Component} from 'react';
import {Button, View, Text, Image} from 'react-native';
import {Styles} from '../../styles/mainStyle';

export default class Review extends Component {
  constructor(props) {
    super(props);

    this.state = {
      review: [],
      userToken: '',
      like: false,
      hasPhoto: false,
      photoUrl: '',
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

  getPhoto = async () => {
    let url =
      'http://10.0.2.2:3333/api/1.0.0/location/' +
      this.state.location_id +
      '/review/' +
      this.state.review.review_id +
      '/photo';

    try {
      console.log('Sending GET Request TO ' + url);
      let response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Authorization': this.state.userToken,
        },
      });

      if (response.ok) {
        console.log('Photo Exists');
        this.setState({hasPhoto: true});
      }
    } catch (e) {
      console.error(e);
    }
  };

  handleLikeButton = async () => {
    console.log('Like Button Pressed');

    if (this.state.like) {
      await this.deleteLike();
      this.setState({like: false});
    } else {
      await this.postLike();
      this.setState({like: true});
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

  postLike = async () => {
    //doStuff
    try {
      console.log(
        'Sending POST request ' +
          JSON.stringify(this.state.review) +
          'TO http://10.0.2.2:3333/api/1.0.0/location/' +
          this.state.location_id +
          '/review/' +
          this.state.review.review_id +
          '/like with AUTH:' +
          this.state.userToken,
      );
      let response = await fetch(
        'http://10.0.2.2:3333/api/1.0.0/location/' +
          this.state.location_id +
          '/review/' +
          this.state.review.review_id +
          '/like',
        {
          method: 'POST',
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

  deleteLike = async () => {
    //doStuff
    try {
      console.log(
        'Sending POST request ' +
          JSON.stringify(this.state.review) +
          'TO http://10.0.2.2:3333/api/1.0.0/location/' +
          this.state.location_id +
          '/review/' +
          this.state.review.review_id +
          '/like with AUTH:' +
          this.state.userToken,
      );
      let response = await fetch(
        'http://10.0.2.2:3333/api/1.0.0/location/' +
          this.state.location_id +
          '/review/' +
          this.state.review.review_id +
          '/like',
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

    await this.getPhoto();
  }

  render() {
    let EditComponents = (
      <View>
        <Button title="Update Review" onPress={this.handleUpdateReviewButton}>
          Update Review
        </Button>
        <Button title="Delete Review" onPress={this.handleDeleteReviewButton}>
          Delete Review
        </Button>
      </View>
    );

    let PhotoComponent = (
      <View>
        <Image
          style={Styles.image_thumb}
          source={{
            uri:
              'http://10.0.2.2:3333/api/1.0.0/location/' +
              this.state.location_id +
              '/review/' +
              this.state.review.review_id +
              '/photo',
          }}
        />
      </View>
    );

    return (
      <View>
        {this.state.hasPhoto === true ? PhotoComponent : null}
        <Text style={Styles.subtitle}>
          Review Id: {this.state.review.review_id}
        </Text>
        <Text style={Styles.subtitle}>
          Overall Rating: {this.state.review.overall_rating}
        </Text>
        <Text style={Styles.subtitle}>
          Price Rating: {this.state.review.price_rating}
        </Text>
        <Text style={Styles.subtitle}>
          Quality Rating: {this.state.review.quality_rating}
        </Text>
        <Text style={Styles.subtitle}>
          Cleanliness Rating: {this.state.review.clenliness_rating}
        </Text>
        <Text style={Styles.review_body}>{this.state.review.review_body}</Text>

        {this.props?.user_reviews.includes(this.state.review.review_id) === true
          ? EditComponents
          : null}

        <Button
          title={this.state.like ? 'Remove Like' : 'Like'}
          onPress={this.handleLikeButton}></Button>
      </View>
    );
  }
}
