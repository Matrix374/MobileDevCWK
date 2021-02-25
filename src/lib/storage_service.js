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

  saveFavourites = async (favourites) => {
    try {
      await AsyncStorage.setItem(
        '@user_favourites',
        JSON.stringify(favourites),
      );
      console.log('Saved Favourites: ' + JSON.stringify(favourites));
    } catch (e) {
      console.error(e);
    }
  };

  saveReviews = async (reviews) => {
    try {
      await AsyncStorage.setItem('@user_reviews', JSON.stringify(reviews));
      console.log('Saved Reviews: ' + JSON.stringify(reviews));
    } catch (e) {
      console.error(e);
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

  retrieveReviews = async () => {
    try {
      let json = await AsyncStorage.getItem('@user_reviews');
      console.log('from lib, reviews retrieved: ' + JSON.stringify(json));
      return JSON.parse(json);
    } catch (e) {
      throw new Error('Review Retrieval Error: ' + e);
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
