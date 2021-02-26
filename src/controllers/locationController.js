import {Alert} from 'react-native';

const url = 'http://10.0.2.2:3333/api/1.0.0/location/';

export default class LocationController {
  getLocationData = async (loc_id, userToken) => {
    try {
      let response = await fetch(url + loc_id, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Authorization': userToken,
        },
      });

      if (response.ok) return await response.json();
      else Alert.alert('Error: Location Not Found');
    } catch (e) {
      throw new Error('GET Location Failed: ' + e);
    }
  };

  postLocationFavourite = async (loc_id, userToken) => {
    try {
      return await fetch(url + loc_id + '/favourite', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Authorization': userToken,
        },
      });
    } catch (e) {
      throw new Error('GET Location Failed: ' + e);
    }
  };

  deleteLocationFavourite = async (loc_id, userToken) => {
    try {
      return await fetch(url + loc_id + '/favourite', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'X-Authorization': userToken,
        },
      });
    } catch (e) {
      throw new Error('GET Location Failed: ' + e);
    }
  };
}
