import React, {Component} from 'react';
import {View, FlatList, Text, Button} from 'react-native';
import Lib from '../lib/lib';
import {Styles} from '../../styles/mainStyle';

import Loading from '../shared/loading';
import Location from '../shared/location';
import LogOut from '../shared/logOut';

const common = new Lib();

export default class LocationsView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userToken: '',
      isLoading: true,
      locations: [],
    };
  }

  handleLocationButton = (id) => {
    console.log('Go to Location ' + id)
    this.props.navigation.navigate('LocationDetail', {location_id: id})
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
    let userToken = await common.retrieveToken();
    await this.setState({userToken: userToken});
    console.log('Home: ' + this.state.userToken);

    this.getData();
  }

  render() {
    const renderItem = ({item}) => (
      <View style={Styles.container}>
        <Location location={item} />
        <Button
          style={Styles.button}
          title="Details"
          onPress={() => {this.handleLocationButton(item.location_id)}}></Button>
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
