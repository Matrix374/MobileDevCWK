import {Alert} from 'react-native';

export default class UserController {
  //returns user
  async GetUserAsync(id, userToken) {
    try {
      console.log(
        'Sending GET request TO http://10.0.2.2:3333/api/1.0.0/user/' + id,
      );
      let response = await fetch('http://10.0.2.2:3333/api/1.0.0/user/' + id, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Authorization': userToken,
        },
      });

      if (response.ok) {
        let user = await response.json();
        return user;
      } else {
        console.log(response.status);
      }
    } catch (e) {
      throw new Error(e);
    }
  }

  //returns boolean
  async PatchUserAsync(id, userToken, user) {
    try {
      console.log(
        'Sending PATCH request ' +
          user +
          'TO http://10.0.2.2:3333/api/1.0.0/user/' +
          id +
          ' with AUTH:' +
          userToken,
      );
      let response = await fetch('http://10.0.2.2:3333/api/1.0.0/user/' + id, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'X-Authorization': userToken,
        },
        body: user,
      });

      if (response.ok) {
        return true;
      } else {
        console.log(response.status);
      }
    } catch (e) {
      console.error(e);
      Alert.alert('There seemed to be an error: ' + e);
    }
  }

  //returns boolean
  async RegisterUserAsync(user) {
    try {
      console.log(
        'Sending POST Request ' +
          user +
          ' TO http://10.0.2.2:3333/api/1.0.0/user/',
      );
      let response = await fetch('http://10.0.2.2:3333/api/1.0.0/user/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: user,
      });

      if (response.ok) {
        let json = await response.json();

        console.log('json: ' + JSON.stringify(json));

        return true;
      } else {
        throw new Error(response.status);
      }
    } catch (e) {
      throw new Error(e);
    }
  }

  async LogInUserAsync(user) {
    try {
      console.log(
        'Sending POST Request TO http://10.0.2.2:3333/api/1.0.0/user/login',
      );
      let response = await fetch('http://10.0.2.2:3333/api/1.0.0/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: user,
      });

      console.log(response.status);
      if (response.ok) {
        let user = await response.json();

        console.log('user: ' + JSON.stringify(user));

        return user;
      } else {
        return null;
      }
    } catch (e) {
      console.error(e);
    }
  }

  async LogOutUserAsync(userToken) {
    try {
      let response = await fetch('http://10.0.2.2:3333/api/1.0.0/user/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Authorization': userToken,
        },
      });

      if (response.ok) {
        console.log('Logged Out');
        return true;
      } else {
        console.log(response.status);
        return false;
      }
    } catch (e) {
      console.error(e);
    }
  }
}
