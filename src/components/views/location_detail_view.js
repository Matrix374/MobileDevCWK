import React, {Component} from 'react';
import {View, Text, FlatList, Button, ToastAndroid} from 'react-native';

import Lib from '../lib/lib';
import Loading from '../shared/loading';
import Location from '../shared/location';
import Review from '../shared/review';

const common = new Lib();

export default class LocationDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userToken: '',
      location_id: null,
      isLoading: true,
      location: [],
    };
  }

  getData = async () => {
    try {
      let response = await fetch(
        'http://10.0.2.2:3333/api/1.0.0/location/' + this.state.location_id,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'X-Authorization': this.state.userToken,
          },
        },
      );

      let json = await response.json();

      this.setState({
        isLoading: false,
        location: json,
      });
    } catch (err) {
      console.log(err);
    }
  };

  async componentDidMount() {
    let location_id = this.props.route.params?.location_id;
    await this.setState({location_id: location_id});
    console.log('Location Id: ' +  this.state.location_id);

    let userToken = await common.retrieveToken();
    await this.setState({userToken: userToken});
    console.log('LocationDetail: ' + this.state.userToken);

    this.getData();
  }

  render() {

    const renderItem = ({item}) => (
      <View>
        <Review review={item}/>
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
        <View>
          <Text>Location ID: {this.state.location_id}</Text>
          <Location location={this.state.location} />
          <FlatList
            data={this.state.location.location_reviews}
            renderItem={renderItem}
            keyExtractor={(item) => item.review_id.toString()}
          />
        </View>
      );
    }
  }
}
