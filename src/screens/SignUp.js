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
      const hasplay = await GoogleSignin.hasPlayServices();
      console.log("hello1", hasplay);
      const user = await GoogleSignin.signIn();
      console.log(user);
      if (user.user.email.includes("hbtu.ac.in")) {
        setUserInfo(user.user);
        setError(null);
        await GoogleSignin.signOut();
      } else {
        setError("User college email only");
        await GoogleSignin.signOut();
      }
    } catch (e) {
      console.log("error", JSON.stringify(e));
      setError("Error Occured");
      console.log(statusCodes);
    }
  }

  return (
    <View style={styles.cont}>
      {!userInfo && (
        <View style={styles.signupButton}>
          <Text>{error}</Text>
          <GoogleSigninButton
            size={GoogleSigninButton.Size.Standard}
            color={GoogleSigninButton.Color.Light}
            onPress={signIn}
          />
        </View>
      )}
      {userInfo && (
        <View style={styles.signupButton}>
          <SignUpForm user={userInfo} />
        </View>
      )}
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  cont: {
    flex: 1,
  },
  signupButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
