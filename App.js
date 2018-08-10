import * as React from "react";
import { ScrollView } from "react-native";

import Login from "./components/login/login";
import Create from "./components/create/create";
import Profile from "./components/profile/profile";
export default class AssetExample extends React.Component {
  render() {
    return (
      <ScrollView style={{ padding: 20 }}>
        <Login />
        <Create />
        <Profile/>
      </ScrollView>
    );
  }
}
