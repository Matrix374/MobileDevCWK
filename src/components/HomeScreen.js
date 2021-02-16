

import React, {Component} from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import LocationsView from './views/locations_view';
import LocationDetail from './views/location_detail_view'
import ReviewCreate from './views/review_create_view'

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
        <Stack.Screen name="ReviewCreate" component={ReviewCreate}/>
      </Stack.Navigator>
    );
  }
}
