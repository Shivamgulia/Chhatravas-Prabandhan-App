import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from './src/store/authContext';

import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthStack from './src/Stacks/AuthStack';
import UserStack from './src/Stacks/UserStack';
import Navbar from './src/components/Navbar/Navbar';

const Stack = createNativeStackNavigator();

export default function Main() {
  const [loggedIn, setLoggedIn] = useState(false);
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    async function checkUser() {
      const token = await AsyncStorage.getItem('token');
      if (!!token) {
        setLoggedIn(true);
        const user = await AsyncStorage.getItem('user');
        const userObj = await JSON.parse(user);
        console.log(userObj);
        authCtx.setValues({ user: userObj, token });
      }
    }
    checkUser();
  }, []);

  useEffect(() => {
    setLoggedIn(authCtx.isLoggedIn);
  }, [authCtx]);

  return (
    <>
      <NavigationContainer>
        {!loggedIn && <AuthStack />}
        {loggedIn && <UserStack />}
        {loggedIn && (
          <View style={styles.navbar}>
            <Navbar />
          </View>
        )}
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  navbar: {
    flex: 0,
    // paddingBottom: 30,
    // paddingLeft: 10,
    // paddingRight: 10,
  },
});
