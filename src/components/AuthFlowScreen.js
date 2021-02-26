
import { createStackNavigator } from '@react-navigation/stack'
import React, { Component } from 'react'

import LogInView from './views/logIn_view'
import RegisterView from './views/register_view'

const Stack = createStackNavigator()

export default class AuthFlowScreen extends Component {
  constructor (props) {
    super(props)

    this.state = {}
  }

  render () {
    return (
      <Stack.Navigator>
        <Stack.Screen name='LogIn' component={LogInView} />
        <Stack.Screen name='Register' component={RegisterView} />
      </Stack.Navigator>
    )
  }
}
