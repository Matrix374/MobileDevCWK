import {StyleSheet} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

export const Styles = StyleSheet.create({
  button: {
    display: "flex",
    flex: 0.3,
    color: '#4a1a1a',
    justifyContent: "flex-start"
  },
  buttonPress: {
    color: '#130e0b',
  },
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: '#ac835a',
    padding: 20,
    margin: 10,
  },
  bg: {
    backgroundColor: "#724620"
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  }
});
