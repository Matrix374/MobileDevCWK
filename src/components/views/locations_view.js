import React, {Component} from 'react';
import {View, FlatList, Text, Button} from 'react-native';
import StorageService from '../lib/storage_service';
import {Styles} from '../../styles/mainStyle';

import Loading from '../shared/loading';
import Location from '../shared/location';
import LogOut from '../shared/logOut';

const _storageService = new StorageService();

export default class LocationsView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userToken: '',
      favourites: [],
      isLoading: true,
      locations: [],
    };
  }

  handleLocationButton = (id, favourite) => {
    console.log('Go to Location ' + id)
    this.props.navigation.navigate('LocationDetail', {location_id: id, favourite: favourite})
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
    } catch (e) {
      throw new Error(e);
    }
  };

  async componentDidMount() {
    let userToken = await _storageService.retrieveToken();
    let favourites = await _storageService.retrieveFavourites();
    await this.setState({userToken: userToken, favourites: favourites});
    console.log('Home: ' + this.state.userToken);
    console.log('Home Favourites: ' + this.state.favourites);

    this.getData();
  }

  render() {
    const renderItem = ({item}) => (
      <View style={Styles.container}>
        <Location location={item} favourite={this.state.favourites.includes(item.location_id)}/>
        <Button
          style={Styles.button}
          title="Details"
          onPress={() => {this.handleLocationButton(item.location_id, this.state.favourites.includes(item.location_id))}}></Button>
      </View>
    );

    if (this.state.isLoading) {
      return (
        <View>
          <Loading />
          <LogOut />
        </View>
      );
    } else {
      return (
        <View>
          <LogOut navigation={this.props.navigation}/>
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
