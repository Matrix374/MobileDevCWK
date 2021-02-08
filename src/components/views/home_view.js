import React, {Component} from 'react';
import {View, FlatList, Text, Button} from 'react-native';
import Lib from '../lib/lib';

import LogOut from '../shared/logOut'

const common = new Lib();

export default class HomeView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userToken: '',
      isLoading: true,
      locations: [],
    };
  }

  getData = async () => {
    try {
      let response = await fetch('http://10.0.2.2:3333/api/1.0.0/find', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Authorization': this.state.userToken,
        },
      });

      let json = await response.json();

      this.setState({
        isLoading: false,
        locations: json,
      });
    } catch (err) {
      console.log(err);
    }
  };

  async componentDidMount() {
    let userToken = await common.retrieveToken()
    await this.setState({userToken: userToken});
    console.log('Home: ' + this.state.userToken);

    this.getData();
  }

  render() {
    
    const renderItem = ({item}) => (
      <View>
        <Text>{item.location_name}</Text>
        <Text>Location: {item.location_town}</Text>
        <Text>Overall Rating: {item.avg_overall_rating}</Text>
        <Text>Price Rating: {item.avg_price_rating}</Text>
        <Text>Quality Rating: {item.avg_quality_rating}</Text>
        <Text>Cleanliness Rating: {item.avg_clenliness_rating}</Text>
      </View>
    );
    
    if (this.state.isLoading) {
      return (
        <View>
          <Text>Loading...</Text>
          <LogOut/>
        </View>
        
      );
    } else {
      return (
        <View>
          <LogOut/>
          <FlatList
            data={this.state.locations}
            renderItem={renderItem}
            keyExtractor={(item) => item.location_id.toString()}
          />
        </View>
      );
    }
  }
}
