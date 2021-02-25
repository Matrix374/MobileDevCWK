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
      location_id: '',
      review_id: '',
    };
  }

  takePicture = async () => {
    if (this.camera) {
      const options = {quality: 0.5, base64: true};
      const data = await this.camera.takePictureAsync(options);

      console.log(data.uri);
      console.log(
        'Sending POST Request TO http://10.0.2.2:3333/api/1.0.0/location/' +
          this.state.location_id +
          '/review/' +
          this.state.review_id +
          '/photo with AUTH: ' +
          this.state.userToken,
      );
      let url =
        'http://10.0.2.2:3333/api/1.0.0/location/' +
        this.state.location_id +
        '/review/' +
        this.state.review_id +
        '/photo';

      try {
        let response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'image/jpeg',
            'X-Authorization': this.state.userToken,
          },
          body: data,
        });

        if (response.ok) {
          this.props.navigation.goBack();
          Alert.alert('Photo Uploaded');
        } else {
          Alert.alert("Error: " + response.status.toString());
        }
      } catch (e) {
        console.error(e);
        Alert.alert('Issue with Uploading Photo');
      }
    }
  };

  async componentDidMount() {
    let userToken = await _storageService.retrieveToken();
    let params = this.props.route.params;
    await this.setState({
      userToken: userToken,
      location_id: params.location_id,
      review_id: params.review_id,
    });
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
