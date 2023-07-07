import * as React from "react";
import * as WebBrowser from "expo-web-browser";
import { makeRedirectUri, useAuthRequest } from "expo-auth-session";
import { Button, SafeAreaView } from "react-native";
import auth from "@react-native-firebase/auth";

WebBrowser.maybeCompleteAuthSession();

const CLIENT_ID = "a732445baf43c6ec254c";
const CLIENT_SECRET = "0d2b4301a79e0a5b29673ac9bxxxxxxxxxx";

// Endpoint
const discovery = {
  authorizationEndpoint: "https://github.com/login/oauth/authorize",
  tokenEndpoint: "https://github.com/login/oauth/access_token",
  revocationEndpoint:
    "https://github.com/settings/connections/applications/a732445baf43c6ec254c",
};

export default function App() {
  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: CLIENT_ID,
      scopes: ["user:email"],
      redirectUri: makeRedirectUri({
        scheme: "com.zaferayan.samplegoogleauth",
      }),
    },
    discovery
  );

  const handleAuthCode = async (code) => {
    const accessToken = await fetch(
      "https://github.com/login/oauth/access_token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          client_id: CLIENT_ID,
          client_secret: CLIENT_SECRET,
          code,
        }),
      }
    )
      .then((res) => res.text())
      .then((data) => data.split("&")[0].split("=")[1]);
    const credential = auth.GithubAuthProvider.credential(accessToken);
    const response = await auth().signInWithCredential(credential);
    console.log("response", response);
  };

  React.useEffect(() => {
    if (response?.type === "success") {
      const { code } = response.params;
      handleAuthCode(code);
    }
  }, [response]);

  return (
    <SafeAreaView>
      <Button
        disabled={!request}
        title="Github Login"
        onPress={() => {
          promptAsync();
        }}
      />
    </SafeAreaView>
  );
}
