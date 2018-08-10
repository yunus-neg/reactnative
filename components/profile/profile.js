import React, { Component } from "react";
import { Text, TextInput, View, Button } from "react-native";
import { init as firebase } from "../../firebase";

export default class profile extends Component {
  state = {
    firsname: null,
    lastname: null,
    cvurl: null,
    creditname: null,
    creditnumber: null
  };

  update = () => {
    var user = firebase.auth().currentUser;
    if (!user) {
      alert("you need to sign in");
      return;
    }
    let uid = user["uid"];

    let database = firebase.database();
    let userdata = database.ref("users/" + uid);
    let msg = {
      firstname: this.state.firsname,
      lastname: this.state.lastname,
      cvurl: this.state.cvurl,
      creditname: this.state.creditname,
      creditnumber: this.state.creditnumber
    };
    userdata.update(msg);
    this.refresh();
  };

  refresh = () => {
    this.setState({
      firsname: null,
      lastname: null,
      cvurl: null,
      creditname: null,
      creditnumber: null
    });
    var user = firebase.auth().currentUser;
    if (!user) {
      alert("you need to sign in");
      return;
    }
    let uid = user["uid"];

    let database = firebase.database();
    let userdata = database.ref("users/" + uid);

    userdata.once("value").then(Gotdata => {
      let data = Gotdata.val();
      this.setState({
        firsname: data["firstname"] || null,
        lastname: data["lastname"] || null,
        cvurl: data["cvurl"] || null,
        creditname: data["creditname"] || null,
        creditnumber: data["creditnumber"] || null
      });
      console.log(this.state);
      console.log(data);
    });
  };

  render() {
    return (
      <View>
        <View style={{ margin: 7 }} />
        <Button onPress={this.refresh} title="refresh" />
        <View style={{ margin: 7 }} />

        <TextInput
          placeholder="firs name"
          onChangeText={text => this.setState({ firsname: text })}
          value={this.state.firsname}
        />
        <View style={{ margin: 7 }} />

        <TextInput
          placeholder="last name"
          onChangeText={text => this.setState({ lastname: text })}
          value={this.state.lastname}
        />
        <View style={{ margin: 7 }} />

        <TextInput
          placeholder="Cv URL"
          onChangeText={text => this.setState({ cvurl: text })}
          value={this.state.cvurl}
        />
        <View style={{ margin: 7 }} />

        <TextInput
          placeholder="credit name"
          onChangeText={text => this.setState({ creditname: text })}
          value={this.state.creditname}
        />
        <View style={{ margin: 7 }} />

        <TextInput
          placeholder="credit number"
          onChangeText={text => this.setState({ creditnumber: text })}
          value={this.state.creditnumber}
        />
        <Button onPress={this.update} title="update" />
      </View>
    );
  }
}
