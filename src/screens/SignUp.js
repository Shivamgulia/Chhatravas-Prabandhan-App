import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';

import SignUpForm from '../components/Forms/SignUpForm';

WebBrowser.maybeCompleteAuthSession();

const SignUp = ({ navigation }) => {
  const [userInfo, setUserInfo] = useState();

  console.log(process.env.EXPO_PUBLIC_GOOGLE_CLIENT_IOS);
  console.log(process.env.EXPO_PUBLIC_GOOGLE_CLIENT_WEB);
  console.log(process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ANDROID);

  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_IOS,
    webClientId: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_WEB,
    androidClientId: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ANDROID,
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

// import { StyleSheet, Text, View, Button, Alert } from 'react-native';
// import React, { useState, useEffect } from 'react';
// import * as WebBrowser from 'expo-web-browser';
// import * as Google from 'expo-auth-session/providers/google';

// import {
//   GoogleSignin,
//   GoogleSigninButton,
//   statusCodes,
// } from '@react-native-google-signin/google-signin';

// import SignUpForm from '../components/Forms/SignUpForm';

// WebBrowser.maybeCompleteAuthSession();

// const SignUp = ({ navigation }) => {
//   const [userInfo, setUserInfo] = useState();
//   const [error, setError] = useState();

//   function configureGoogleSignIn() {
//     GoogleSignin.configure({
//       webClientId: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_WEB,
//       androidClientId: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ANDROID,
//       iosClientId: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_IOS,
//     });
//   }

//   useEffect(() => {
//     configureGoogleSignIn;
//   }, []);

//   async function signIn() {
//     console.log('SignIn');
//     try {
//       await GoogleSignin.hasPlayServices();
//       const user = await GoogleSignin.signIn();
//       setUserInfo(user);
//       setError(null);
//     } catch (e) {
//       setError(e);
//     }
//   }

//   return (
//     <View style={styles.cont}>
//       <Text style={styles.Title}>SignUp</Text>
//       <Button
//         title='Login'
//         onPress={() => {
//           navigation.navigate('Auth');
//         }}
//       ></Button>
//       {!userInfo && (
//         <GoogleSigninButton
//           size={GoogleSigninButton.Size.Standard}
//           color={GoogleSigninButton.Color.Light}
//           onPress={signIn}
//         />
//       )}
//       {userInfo && <SignUpForm user={userInfo} />}
//     </View>
//   );
// };

// export default SignUp;

// const styles = StyleSheet.create({
//   cont: {
//     flex: 1,
//     paddingTop: '20%',
//   },
// });
