import React, {Component} from 'react';
import {View, FlatList, Text} from 'react-native';

export default class HomeView extends Component {
  constructor(props) {
    super(props);

    this.state = {
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
          'X-Authorization': 'a16054733fd01a2c98d939ee4981b7df',
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

  componentDidMount() {
    this.getData();
  }

  /*componentWillUnmount() {
      this.setState({
          isLoading: false,
          locations: this.state.locations
      })
  }*/
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
        </View>
      );
    } else {
      return (
        <View>
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
