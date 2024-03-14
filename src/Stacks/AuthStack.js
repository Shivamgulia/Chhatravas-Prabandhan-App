import { StyleSheet } from 'react-native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Auth from '../screens/Auth';

import React from 'react';
import SignUp from '../screens/SignUp';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Auth'
        component={Auth}
        headerShown={false}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name='SignUp'
        component={SignUp}
        headerShown={false}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;

const styles = StyleSheet.create({});
