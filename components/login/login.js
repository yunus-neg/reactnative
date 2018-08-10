import React, { Component } from "react";
import { Text, TextInput, View, Button } from "react-native";
import { init as firebase } from "../../firebase";

export default class login extends Component {
  state = {
    emailLogin: "",
    passwordLogin: "",
    userlogin: null
  };

  login = () => {
    const email = this.state.emailLogin;
    const password = this.state.passwordLogin;
    if (!email || !password) {
      this.setState({ userLogin: "error email or password empty" });
      return;
    }
    firebase
      .auth()
      .signInAndRetrieveDataWithEmailAndPassword(email, password)
      .then((res, req) => {
        this.setState({ userLogin: "user singed in" });
      })
      .catch(error => {
        // Handle Errors here.

        var errorCode = error.code;
        var errorMessage = error.message;

        this.setState({ userLogin: errorMessage });

        console.log(error);
      });
  };

  logout = () => {
    firebase
      .auth()
      .signOut()
      .then(
        () => {
          console.log("Sign-out successful.");
          this.setState({ userLogin: "user singed out" });
        },
        error => {
          console.log(" An error happened.", error);
        }
      );
  };

  render() {
    return (
      <View>
        <Text style={{ fontSize: 27 }}>Login</Text>
        <TextInput
          placeholder="email"
          textContentType="emailAddress"
          onChangeText={text => this.setState({ emailLogin: text })}
        />
        <View style={{ margin: 7 }} />

        <TextInput
          placeholder="Password"
          onChangeText={text => this.setState({ passwordLogin: text })}
          secureTextEntry
        />
        <View style={{ margin: 7 }} />
        <Button onPress={this.login} title="login" />
        <View style={{ margin: 7 }} />
        <Button onPress={this.logout} title="logout" />
        <Text>{this.state.userLogin}</Text>
        <View style={{ margin: 7 }} />
      </View>
    );
  }
}
