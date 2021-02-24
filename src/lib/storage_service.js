import AsyncStorage from '@react-native-async-storage/async-storage';

export default class StorageService {
  saveItem = async (key, item) => {
    try {
      await AsyncStorage.setItem(key, item);
    } catch (e) {
      throw new Error('Storage Error: ' + e);
    }
  };

  saveUser = async (user) => {
    try {
      await AsyncStorage.setItem('@user', JSON.stringify(user));
      console.log('User saved: ' + JSON.stringify(user));
    } catch (e) {
      throw new Error(e);
    }
  };

  retrieveFavourites = async () => {
    try {
      let json = await AsyncStorage.getItem('@user_favourites');
      console.log('from lib, favourites retrieved: ' + JSON.stringify(json));
      return JSON.parse(json);
    } catch (e) {
      throw new Error('Favourite Retrieval Error: ' + e);
    }
  };
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
