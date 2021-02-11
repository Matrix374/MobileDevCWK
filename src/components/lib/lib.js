import AsyncStorage from '@react-native-async-storage/async-storage';

export default class Lib {

  retrieveToken = async () => {
    try {
      let json = await AsyncStorage.getItem('@user');
      let user = json != null ? JSON.parse(json) : null;
      console.log('from lib, token retrieved: ' + user.token);
      return user.token;
    } catch (e) {
      console.log("Token Retrieval Error: " + e.toString());
    }
  };

  retrieveUserId = async() => {
    try {
      let json = await AsyncStorage.getItem('@user');
      let user = json != null ? JSON.parse(json) : null;
      console.log('from lib, id retrieved: ' + user.id);
      return user.id;
    } catch (e) {
      console.log("ID Retrieval Error: " + e.toString());
    }
  }

  DeleteUser = async () => {
    try {
      AsyncStorage.removeItem('@user');
      console.log('from lib, Deletion Success');
    } catch (e) {
      console.log("User Data Deletion Error: " + e.toString());
    }
  };
}
