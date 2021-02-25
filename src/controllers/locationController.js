export default class LocationController {
    getLocationData = async (loc_id, userToken) => {
      try {
        let response = await fetch(
          'http://10.0.2.2:3333/api/1.0.0/location/' + loc_id,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'X-Authorization': userToken,
            },
          },
        );
        return await response.json();
        
      } catch (e) {
        throw new Error('GET \'location/id Failed:\' ' + e);
      }
    };
  }
  