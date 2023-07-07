import React from "react";
import {
  AppleButton,
  appleAuth,
} from "@invertase/react-native-apple-authentication";
import { SafeAreaView } from "react-native";
import auth from "@react-native-firebase/auth";

export default function App() {
  const handleAppleLogin = async () => {
    // Start the sign-in request
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });

    // Ensure Apple returned a user identityToken
    if (!appleAuthRequestResponse.identityToken) {
      throw new Error("Apple Sign-In failed - no identify token returned");
    }

    // Create a Firebase credential from the response
    const { identityToken, nonce } = appleAuthRequestResponse;
    const appleCredential = auth.AppleAuthProvider.credential(
      identityToken,
      nonce
    );

    // Sign the user in with the credential
    const response = auth().signInWithCredential(appleCredential);
    console.log(response);
  };
  return (
    <SafeAreaView>
      <AppleButton
        buttonStyle={AppleButton.Style.WHITE}
        buttonType={AppleButton.Type.SIGN_IN}
        style={{
          width: 160,
          height: 45,
        }}
        onPress={handleAppleLogin}
      />
    </SafeAreaView>
  );
}
