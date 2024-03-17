import { StyleSheet, Text, View, Button, Alert } from "react-native";
import React, { useState, useEffect } from "react";
// import * as WebBrowser from "expo-web-browser";
// import * as Google from "expo-auth-session/providers/google";

import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from "@react-native-google-signin/google-signin";

import SignUpForm from "../components/Forms/SignUpForm";

// WebBrowser.maybeCompleteAuthSession();

const SignUp = ({ navigation }) => {
  const [userInfo, setUserInfo] = useState();
  const [error, setError] = useState();

  function configureGoogleSignIn() {
    GoogleSignin.configure({
      webClientId: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_WEB,
      androidClientId: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ANDROID,
      iosClientId: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_IOS,
    });
  }

  useEffect(() => {
    configureGoogleSignIn();
  }, []);

  async function signIn() {
    console.log("SignIn");
    try {
      await GoogleSignin.hasPlayServices();
      console.log("hello1");
      const user = await GoogleSignin.signIn();
      console.log(user);
      if (user.user.email.includes("hbtu.ac.in")) {
        setUserInfo(user.user);
        setError(null);
      } else {
        setError("User college email only");
      }
    } catch (e) {
      console.log("error", e);
      setError("error" + JSON.stringify(e));
    }
  }

  return (
    <View style={styles.cont}>
      <Text style={styles.Title}>SignUp</Text>
      <Button
        title="Login"
        onPress={() => {
          navigation.navigate("Auth");
        }}
      ></Button>
      {!userInfo && (
        <>
          <Text>{error}</Text>
          <GoogleSigninButton
            size={GoogleSigninButton.Size.Standard}
            color={GoogleSigninButton.Color.Light}
            onPress={signIn}
          />
        </>
      )}
      {userInfo && <SignUpForm user={userInfo} />}
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  cont: {
    flex: 1,
    paddingTop: "20%",
  },
});
