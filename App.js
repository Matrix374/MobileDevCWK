
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React, { Component } from 'react'
import RootScreen from './src/components/RootScreen'

const Stack = createStackNavigator()

class App extends Component {
  render () {
    return (
      <NavigationContainer>
        <Stack.Navigator
          headerMode='none'
        >
          <Stack.Screen name='Root' component={RootScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
}

export default App
