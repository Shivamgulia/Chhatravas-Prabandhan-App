import React, { useContext } from "react";
import { StyleSheet, Button } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "../screens/Home";
import { AuthContext } from "../store/authContext";
import Warden from "../screens/Warden";
import StudentList from "../screens/StudentList";
import MaintenanceList from "../screens/MaintenanceList";
import Dashboard from "../screens/Dashboard";
import RaiseIssue from "../screens/RaiseIssue";
import EmployeeList from "../screens/EmployeeList";
import Menu from "../screens/Menu";
import NewNotice from "../screens/NewNotice";
import IconButton from "../components/UI/IconButton";
import LeaveList from "../screens/LeaveList";
import LeaveForm from "../screens/LeaveForm";
import LeaveStatus from "../screens/LeaveStatus";

const Stack = createNativeStackNavigator();

const UserStack = () => {
  const authCtx = useContext(AuthContext);
  return (
    <Stack.Navigator
      screenOptions={{
        headerRight: ({ tintColor }) => {
          return (
            <IconButton
              icon="exit"
              color={tintColor}
              size={24}
              onPress={authCtx.logout}
            />
          );
        },
      }}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Dashboard" component={Dashboard} />
      <Stack.Screen name="Warden" component={Warden} />
      <Stack.Screen name="Student List" component={StudentList} />
      <Stack.Screen name="Maintenance List" component={MaintenanceList} />
      <Stack.Screen name="Issue" component={RaiseIssue} />
      <Stack.Screen name="Employee List" component={EmployeeList} />
      <Stack.Screen name="Menu" component={Menu} />
      <Stack.Screen name="NewNotice" component={NewNotice} />
      <Stack.Screen name="Leave List" component={LeaveList} />
      <Stack.Screen name="Leave Form" component={LeaveForm} />
      <Stack.Screen name="Leave Status" component={LeaveStatus} />
    </Stack.Navigator>
  );
};

export default UserStack;

const styles = StyleSheet.create({});
