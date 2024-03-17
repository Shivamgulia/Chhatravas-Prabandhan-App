import { StyleSheet, Pressable, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Auth from "../screens/Auth";

import React from "react";
import SignUp from "../screens/SignUp";

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  const navigation = useNavigation();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Auth"
        component={Auth}
        options={{
          headerRight: () => {
            return (
              <Pressable
                onPress={() => {
                  navigation.navigate("SignUp");
                }}
              >
                <Text>SignUp</Text>
              </Pressable>
            );
          },
        }}
      />
      <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
  );
};

export default AuthStack;

const styles = StyleSheet.create({});
