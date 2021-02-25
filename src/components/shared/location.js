import React, {Component} from 'react';
import {View, Text, Image} from 'react-native';
import {Styles} from '../../styles/mainStyle';

export default class Location extends Component {
  constructor(props) {
    super(props);

    this.state = {
      location: [],
      favourite: false,
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
      <View style={Styles.location_detail}>
        <Image
          style={Styles.image}
          source={this.state.location.photo_path}></Image>
        <Text style={Styles.title}>
          {this.state.location.location_name}{' '}
          {this.state.favourite ? '* FAVOURITE *' : ''}
        </Text>
        <Text style={Styles.subtitle}>
          Location: {this.state.location.location_town}
        </Text>
        <Text style={Styles.subtitle}>
          Overall Rating: {this.state.location.avg_overall_rating}
        </Text>
        <Text style={Styles.subtitle}>
          Price Rating: {this.state.location.avg_price_rating}
        </Text>
        <Text style={Styles.subtitle}>
          Quality Rating: {this.state.location.avg_quality_rating}
        </Text>
        <Text style={Styles.subtitle}>
          Cleanliness Rating: {this.state.location.avg_clenliness_rating}
        </Text>
      </View>
    );
  }
}
