import React, { Component } from 'react'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import HomeScreen from './HomeScreen'
import UserScreen from './UserScreen'

const Tab = createBottomTabNavigator()

export default class MainScreen extends Component {
  constructor (props) {
    super(props)

    this.state = {
      id: ''
    }
  }

  render () {
    return (
      <Tab.Navigator
        tabBarOptions={{
          style: { backgroundColor: '#f4511e' },
          labelStyle: { fontSize: 24, fontWeight: 'bold' },
          activeTintColor: 'white',
          inactiveTintColor: 'black'
        }}
      >
        <Tab.Screen
          name='HomeScreen'
          component={HomeScreen}
          options={{ title: 'Home' }}
        />
        <Tab.Screen
          name='UserScreen'
          component={UserScreen}
          options={{ title: 'User' }}
        />
      </Tab.Navigator>
    )
  }
}
