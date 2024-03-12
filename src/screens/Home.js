import React, { useContext } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { AuthContext } from '../store/authContext';
import Navbar from '../components/Navbar/Navbar';

const Home = () => {
  const authCtx = useContext(AuthContext);
  const navigation = useNavigation();

  return (
    <View style={styles.cont}>
      <View style={styles.Heading}>
        <Text style={styles.head}>User Details</Text>
      </View>
      <View style={styles.details}>
        <Text style={styles.text}>Email : {authCtx?.user?.email}</Text>
        <Text style={styles.text}>Name : {authCtx?.user?.name}</Text>
        {authCtx?.user?.rollno != 0 && (
          <Text style={styles.text}>Roll No. : {authCtx?.user?.rollno}</Text>
        )}
        <Text style={styles.text}>Hostel : {authCtx?.user?.hostel}</Text>
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
  Heading: {
    padding: 20,
  },
  head: { fontSize: 30 },
  details: {
    flex: 0.5,
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    padding: 5,
  },
});
