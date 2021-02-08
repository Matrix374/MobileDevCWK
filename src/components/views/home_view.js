import React, {Component} from 'react';
import {View, FlatList, Text, Button} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default class HomeView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userToken: '',
      isLoading: true,
      locations: [],
    };
  }

  getData = async (userToken) => {
    try {
      let response = await fetch('http://10.0.2.2:3333/api/1.0.0/find', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Authorization': userToken,
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

  handleLogOutButton = () => {
    this.DeleteUserToken();

    this.props.navigation.navigate('Splash')
  };

  DeleteUserToken = async () => {
    try {
      AsyncStorage.removeItem('@userToken');
      console.log('Deletion Success');
    } catch (e) {
      throw new Error(e.toString());
    }
  };

  async componentDidMount() {
    console.log('pre-state: ' + this.state.userToken);

    const route = this.props.route;

    console.log('params: ' + route.params?.userToken);

    this.setState({userToken: route.params?.userToken});

    this.getData(route.params?.userToken);
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

    const navigation = this.props.navigation;
    if (this.state.isLoading) {
      return (
        <View>
          <Text>Loading</Text>
          <Button title="Log Out" onPress={this.handleLogOutButton}>
            Log Out
          </Button>
        </View>
      );
    } else {
      return (
        <View>
          <Button title="Log Out" onPress={this.handleLogOutButton}>
            Log Out
          </Button>
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
