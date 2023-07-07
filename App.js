import { StyleSheet, Text, View } from "react-native";
import React from "react";
import AppleLogin from "./AppleLogin";
import GoogleLogin from "./GoogleLogin";
import GithubLogin from "./GithubLogin";

const App = () => {
  return (
    <View>
      <Text>Please render any Login component </Text>
      {/* <AppleLogin />
      <GoogleLogin />
      <GithubLogin /> */}
    </View>
  );
};

export default App;

const styles = StyleSheet.create({});
