import React, {Component} from 'react';
import {View, Text} from 'react-native';

export default class Location extends Component {
  constructor(props) {
    super(props);

    this.state = {
      location: [],
      favourite: false
    };
  }

  getLocation = async () => {
    try {
      let location = this.props.location;
      let favourite = this.props.favourite;
      await this.setState({location: location, favourite: favourite});
    } catch (e) {
      throw new Error(e);
    }
  };

  async componentDidMount() {
    await this.getLocation();
  }

  render() {

    return (
      <View>
        <Text>{this.state.location.location_name} {this.state.favourite ? '* FAVOURITE *' : ''}</Text>
        <Text>Location: {this.state.location.location_town}</Text>
        <Text>Overall Rating: {this.state.location.avg_overall_rating}</Text>
        <Text>Price Rating: {this.state.location.avg_price_rating}</Text>
        <Text>Quality Rating: {this.state.location.avg_quality_rating}</Text>
        <Text>Cleanliness Rating: {this.state.location.avg_clenliness_rating}</Text>
      </View>
    );
  }
}
