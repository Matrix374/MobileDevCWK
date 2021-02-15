

import React, {Component} from 'react';

import LocationsView from './views/locations_view';
import LocationDetail from './views/location_detail_view'
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Locations" component={LocationsView} />
        <Stack.Screen name="LocationDetail" component={LocationDetail} />
      </Stack.Navigator>
    );
  }
}
