import React, {Component} from 'react';

import UserView from './views/user_view';
import {createStackNavigator} from '@react-navigation/stack';
import UserUpdateView from './views/user_update_view';

const Stack = createStackNavigator();

export default class UserScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="User"
          component={UserView}
          options={{
            title: 'User',
            headerStyle: {
              backgroundColor: '#f4511e',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen name="UserUpdate" component={UserUpdateView} />
      </Stack.Navigator>
    );
  }
}
