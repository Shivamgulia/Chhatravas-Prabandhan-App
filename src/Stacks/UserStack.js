import React, { useContext } from 'react';
import { StyleSheet, Button, Pressable } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from '../screens/Home';
import { AuthContext } from '../store/authContext';
import Warden from '../screens/Warden';
import StudentList from '../screens/StudentList';
import MaintenanceList from '../screens/MaintenanceList';
import Dashboard from '../screens/Dashboard';
import RaiseIssue from '../screens/RaiseIssue';
import EmployeeList from '../screens/EmployeeList';
import Menu from '../screens/Menu';
import NewNotice from '../screens/NewNotice';

import { IoLogOut } from 'react-icons/io5';

const Stack = createNativeStackNavigator();

const UserStack = () => {
  const authCtx = useContext(AuthContext);
  return (
    <Stack.Navigator options={{}}>
      <Stack.Screen
        name='Home'
        component={Home}
        options={{
          headerRight: (
            <Pressable onPress={authCtx.logout}>
              <Text>
                <IoLogOut />
              </Text>
            </Pressable>
          ),
        }}
      />
      <Stack.Screen
        name='Warden'
        component={Warden}
        options={{
          headerRight: (
            <Pressable onPress={authCtx.logout}>
              <Text>
                <IoLogOut />
              </Text>
            </Pressable>
          ),
        }}
      />
      <Stack.Screen
        name='Student List'
        component={StudentList}
        options={{
          headerRight: (
            <Pressable onPress={authCtx.logout}>
              <Text>
                <IoLogOut />
              </Text>
            </Pressable>
          ),
        }}
      />
      <Stack.Screen
        name='Maintenance List'
        component={MaintenanceList}
        options={{
          headerRight: (
            <Pressable onPress={authCtx.logout}>
              <Text>
                <IoLogOut />
              </Text>
            </Pressable>
          ),
        }}
      />
      <Stack.Screen
        name='Dashboard'
        component={Dashboard}
        options={{
          headerRight: (
            <Pressable onPress={authCtx.logout}>
              <Text>
                <IoLogOut />
              </Text>
            </Pressable>
          ),
        }}
      />
      <Stack.Screen
        name='Issue'
        component={RaiseIssue}
        options={{
          headerRight: (
            <Pressable onPress={authCtx.logout}>
              <Text>
                <IoLogOut />
              </Text>
            </Pressable>
          ),
        }}
      />
      <Stack.Screen
        name='Employee List'
        component={EmployeeList}
        options={{
          headerRight: (
            <Pressable onPress={authCtx.logout}>
              <Text>
                <IoLogOut />
              </Text>
            </Pressable>
          ),
        }}
      />
      <Stack.Screen
        name='Menu'
        component={Menu}
        options={{
          headerRight: (
            <Pressable onPress={authCtx.logout}>
              <Text>
                <IoLogOut />
              </Text>
            </Pressable>
          ),
        }}
      />
      <Stack.Screen
        name='NewNotice'
        component={NewNotice}
        options={{
          headerRight: (
            <Pressable onPress={authCtx.logout}>
              <Text>
                <IoLogOut />
              </Text>
            </Pressable>
          ),
        }}
      />
    </Stack.Navigator>
  );
};

export default UserStack;

const styles = StyleSheet.create({});
