import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';

import SignUpForm from '../components/Forms/SignUpForm';

WebBrowser.maybeCompleteAuthSession();

const SignUp = ({ navigation }) => {
  const [userInfo, setUserInfo] = useState();

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ANDROID,
    iosClientId: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_IOS,
  });

  async function handleSignUpWithGoogle() {
    if (response?.type === 'success') {
      await getUserInfo(response.authentication.accessToken);
    }
  }

  async function getUserInfo(token) {
    if (!token) {
      return;
    }
    try {
      const response = await fetch(
        'https://www.googleapis.com/userinfo/v2/me',
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const user = await response.json();
      setUserInfo(user);
    } catch (error) {
      Alert.alert('Error', error);
    }
  }

  useEffect(() => {
    handleSignUpWithGoogle();
  }, [response]);

  return (
    <View style={styles.cont}>
      <Text style={styles.Title}>SignUp</Text>
      <Button
        title='Login'
        onPress={() => {
          navigation.navigate('Auth');
        }}
      ></Button>
      {!userInfo && <Button title='SignUp' onPress={() => promptAsync()} />}
      {userInfo && <SignUpForm user={userInfo} />}
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  cont: {
    flex: 1,
    paddingTop: '20%',
  },
});
