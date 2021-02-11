import AsyncStorage from '@react-native-async-storage/async-storage';

export default class Lib {
  retrieveToken = async () => {
    try {
      let json = await AsyncStorage.getItem('@user');
      let user = json != null ? JSON.parse(json) : null;

      if (user?.token) {
        console.log('from lib, token retrieved: ' + user.token);
        return user.token;
      } else return null;
    } catch (e) {
      throw new Error('Token Retrieval Error: ' + e);
    }
  };

  retrieveUserId = async () => {
    try {
      let json = await AsyncStorage.getItem('@user');
      let user = json != null ? JSON.parse(json) : null;
      if (user?.id) {
        console.log('from lib, id retrieved: ' + user.id);
        return user.id;
      } else return null;
    } catch (e) {
      throw new Error('ID Retrieval Error: ' + e);
    }
  };

  DeleteUser = async () => {
    try {
      AsyncStorage.removeItem('@user');
      console.log('from lib, Deletion Success');
    } catch (e) {
      throw new Error('User Data Deletion Error: ' + e);
    }
  };
}
