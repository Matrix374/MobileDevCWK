import React, {Component} from 'react';
import {View, Button, Alert} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {Styles} from '../../styles/mainStyle';
import StorageService from '../../lib/storage_service';

const _storageService = new StorageService();

export default class Camera extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userToken: '',
    };
  }

  takePicture = async () => {
    if (this.camera) {
      const options = {quality: 0.5, base64: true};
      const data = await this.camera.takePictureAsync(options);

      console.log(data.uri, this.state.userToken);

      return fetch('http://10.0.2.2:3333/api/1.0.0/location/' +
      this.state.location_id +
      '/review/' +
      this.state.review.review_id + '/photo', {
        method: 'POST',
        headers: {
          'Content-Type': 'image/jpeg',
          'X-Authorization': this.state.userToken,
        },
        body: data,
      })
        .then((response) => {
          Alert.alert('Picture Added!');
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  async componentDidMount() {
    let userToken = _storageService.retrieveToken();
    await this.setState({userToken: userToken});
  }

  render() {
    return (
      <View style={{flex: 1, width: '100%'}}>
        <RNCamera
          ref={(ref) => {
            this.camera = ref;
          }}
          style={Styles.preview}
          captureAudio={false}
        />

        <Button
          title="Take Photo"
          onPress={() => {
            this.takePicture();
          }}
        />
      </View>
    );
  }
}
