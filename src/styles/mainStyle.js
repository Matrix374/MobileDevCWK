import {StyleSheet} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

export const Styles = StyleSheet.create({
  title: {
    fontSize: 24,
  },
  subtitle: {
    fontSize: 16,
  },
  subtitle_favourite: {
    fontSize: 16,
    color: 'red'
  },
  button: {
    display: 'flex',
    flex: 0.3,
    color: '#4a1a1a',
    justifyContent: 'flex-start',
  },
  buttonPress: {
    color: '#130e0b',
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#724620',
    padding: 20,
    margin: 10,
  },
  container_favourite: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#ac835a',
    padding: 20,
    margin: 10,
  },
  bg: {
    backgroundColor: '#4a1a1a',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});
