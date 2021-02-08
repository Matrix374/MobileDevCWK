import AsyncStorage from '@react-native-async-storage/async-storage';

export default class Lib {
  retrieveToken = async () => {
    try {
      let userToken = await AsyncStorage.getItem('@userToken');

      console.log('from lib, token retrieved: ' + userToken);
      return userToken;
    } catch (e) {
      console.log(e.toString());
    }
  };

  DeleteUserToken = async () => {
    try {
      AsyncStorage.removeItem('@userToken');
      console.log('from lib, Deletion Success');
    } catch (e) {
      throw new Error(e.toString());
    }
  };
}
