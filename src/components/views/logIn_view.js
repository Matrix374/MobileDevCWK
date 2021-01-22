import React, {Component} from 'react';
import {
    View,
    Text, 
    TextInput, 
    Button} from 'react-native';

export default class LogInView extends Component{
    
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            buttonStyle: "#c79274"
        }
    }

    handleEmailChange = (email) => {
        this.setState({email: email})
    }

    handlePasswordChange = (password) => {
        this.setState({password: password})
    }

    handleLogInButtonClick = () => {
        //do stuff
        let colour = this.state.buttonStyle = "#130e0b";
        this.setState({buttonStyle: colour})
    }

    handleRegisterButtonClick = () => {
        //doStuff
    }

    render() {
        return (
            <View>
                <Text>COVFEFE LOG-IN</Text>
                
                <TextInput
                placeholder = "Enter Email"
                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                onChangeText={this.handleEmailChange}
                value={this.state.email}
                /><TextInput
                placeholder = "Enter Password"
                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                onChangeText={this.handlePasswordChange}
                value={this.state.password}
                />

                <Button title="Log-In" color={this.state.buttonStyle} onPress={this.handleLoginButtonClick}>Log-In</Button>
                <Button title="Register" color={this.state.buttonStyle} onPress={this.handleRegisterButtonClick}>Register</Button>
            </View>
          );
    };

}