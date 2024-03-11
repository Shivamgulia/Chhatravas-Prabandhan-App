import React, { useContext } from 'react';
import { StyleSheet, Button } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from '../screens/Home';
import { AuthContext } from '../store/authContext';
import Warden from '../screens/Warden';
import StudentList from '../screens/StudentList';
import MaintenanceList from '../screens/MaintenanceList';
import Dashboard from '../screens/Dashboard';
import RaiseIssue from '../screens/RaiseIssue';
import EmployeeList from '../screens/EmployeeList';

const Stack = createNativeStackNavigator();

const UserStack = () => {
  const authCtx = useContext(AuthContext);
  return (
    <Stack.Navigator options={{}}>
      <Stack.Screen
        name='Home'
        component={Home}
        options={{
          headerRight: () => {
            return <Button title='Out' onPress={authCtx.logout} />;
          },
        }}
      />
      <Stack.Screen
        name='Warden'
        component={Warden}
        options={{
          headerRight: () => {
            return <Button title='Out' onPress={authCtx.logout} />;
          },
        }}
      />
      <Stack.Screen
        name='Student List'
        component={StudentList}
        options={{
          headerRight: () => {
            return <Button title='Out' onPress={authCtx.logout} />;
          },
        }}
      />
      <Stack.Screen
        name='Maintenance List'
        component={MaintenanceList}
        options={{
          headerRight: () => {
            return <Button title='Out' onPress={authCtx.logout} />;
          },
        }}
      />
      <Stack.Screen
        name='Dashboard'
        component={Dashboard}
        options={{
          headerRight: () => {
            return <Button title='Out' onPress={authCtx.logout} />;
          },
        }}
      />
      <Stack.Screen
        name='Issue'
        component={RaiseIssue}
        options={{
          headerRight: () => {
            return <Button title='Out' onPress={authCtx.logout} />;
          },
        }}
      />
      <Stack.Screen
        name='Employee List'
        component={EmployeeList}
        options={{
          headerRight: () => {
            return <Button title='Out' onPress={authCtx.logout} />;
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default UserStack;

const styles = StyleSheet.create({});
