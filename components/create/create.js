import React, { Component } from "react";

import { Text, TextInput, View, Button } from "react-native";
import { init as firebase } from "../../firebase";

export default class create extends Component {
  state = {
    emailCreate: null,
    passwordCreate: null,
    usercreate: null
  };

  emailCreateChanged = text => {
    this.setState({ emailCreate: text });
  };
  passwordCreateChanged = text => {
    this.setState({ passwordCreate: text });
  };

  createuser = event => {
    const email = this.state.emailCreate;
    const password = this.state.passwordCreate;
    if (!email || !password) {
      this.setState({ usercreate: "error email or password empty" });
      return;
    }
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((res, req) => {
        this.setState({
          usercreate: "account created"
        });
      })
      .catch(error => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;

        this.setState({ usercreate: errorMessage });

        console.log(error);
      });
  };
  render() {
    return (
      <View>
        <TextInput
          placeholder="email"
          textContentType="emailAddress"

          onChangeText={text => this.emailCreateChanged(text)}
        />
        <View style={{ margin: 7 }} />

        <TextInput
          placeholder="Password"
          onChangeText={text => this.passwordCreateChanged(text)}
          secureTextEntry
        />
        <View style={{ margin: 7 }} />
        <Button onPress={this.createuser} title="create account" />
        <Text>{this.state.usercreate}</Text>
      </View>
    );
  }
}
