import React, { useContext } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { AuthContext } from '../store/authContext';

const Home = () => {
  const authCtx = useContext(AuthContext);
  const navigation = useNavigation();
  console.log(authCtx.login);

  return (
    <View style={styles.cont}>
      <View style={styles.details}>
        <Text style={styles.text}>Email : {authCtx?.user?.email}</Text>
        <Text style={styles.text}>Name : {authCtx?.user?.name}</Text>
        <Text style={styles.text}>Roll No. : {authCtx?.user?.rollno}</Text>
        <Text style={styles.text}>Hostel : {authCtx?.user?.hostel}</Text>
        <Button
          title='go to warden'
          onPress={() => {
            console.log('got to warden');
            navigation.navigate('Warden');
          }}
        />
        <Button
          title='go to Dashboard'
          onPress={() => {
            console.log('got to dashboard');
            navigation.navigate('Dashboard');
          }}
        />
        <Button
          title='go to Issue'
          onPress={() => {
            console.log('got to Issue');
            navigation.navigate('Issue');
          }}
        />
        <Button
          title='go to Employess'
          onPress={() => {
            console.log('got to Employees');
            navigation.navigate('Employee List');
          }}
        />
        <Button
          title='go to Menu'
          onPress={() => {
            console.log('got to Menu');
            navigation.navigate('Menu');
          }}
        />
        <Button
          title='go to New Notice'
          onPress={() => {
            console.log('got to New Notice');
            navigation.navigate('NewNotice');
          }}
        />
      </View>
    </View>
  );
};
export default Home;

const styles = StyleSheet.create({
  cont: {
    flex: 1,
    alignItems: 'center',
  },
  details: {
    flex: 0.5,
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    padding: 5,
  },
});
