import { useState, useEffect } from "react";
import { Text, SafeAreaView, Button } from "react-native";
import auth from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

GoogleSignin.configure({
  webClientId: "575805126642-163oitqg69b0ciphdgi1ea1qptrbg021",
});

export default function App() {
  const onGoogleButtonPress = async () => {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    const response = await auth().signInWithCredential(googleCredential);
    console.log(response);
  };

  return (
    <SafeAreaView>
      <Button title="Google Sign-In" onPress={onGoogleButtonPress} />
    </SafeAreaView>
  );
}
