import { API_URL } from '@env';

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  ScrollView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import React, { useContext, useState } from 'react';
import { AuthContext } from '../store/authContext';
import Loading from '../components/UI/Loading';

export default function Auth({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const authCtx = useContext(AuthContext);

  async function login() {
    if (email.replace(' ', '') != '' && password.replace(' ', '') != '') {
      setLoading(true);
      try {
        const res = await fetch(API_URL + '/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });

        const data = await res.json();
        if (res.ok) {
          const token = data.token;
          const user = data.user;

          authCtx.login(data);
        } else {
        }
      } catch (e) {
        Alert.alert('Request Failed');
      }
      setLoading(false);
    } else {
      Alert.alert('Incompleted Field', 'Fill Username and Password Properly');
    }
  }

  if (loading) {
    return (
      <View style={styles.loading}>
        <Loading />
      </View>
    );
  }

  return (
    <View style={styles.scrollCont}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView style={styles.cont} behavior='height'>
          <>
            <View style={styles.head}>
              <Text style={styles.title}>Hostel Management System</Text>
              <Text style={styles.title}>Auth</Text>
            </View>
            <View style={styles.form}>
              <View style={styles.inputDiv}>
                <Text style={styles.label}>Username</Text>
                <TextInput
                  style={styles.input}
                  placeholder='JhoneDoe'
                  autoCapitalize='none'
                  onChangeText={setEmail}
                />
              </View>
              <View style={styles.inputDiv}>
                <Text style={styles.label}>Password</Text>
                <TextInput
                  style={styles.input}
                  placeholder='Password'
                  autoCapitalize='none'
                  onChangeText={setPassword}
                />
              </View>
              <Button title='Login' onPress={login}></Button>
            </View>
          </>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollCont: {
    flex: 1,
    paddingTop: '25%',
    width: '100%',
  },
  cont: {
    flex: 1,
    justifyContent: 'center',
  },
  head: {},
  title: {
    fontSize: 50,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  form: {
    flex: 1,
    justifyContent: 'center',
  },
  inputDiv: {
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  label: {
    padding: 10,
    fontSize: 20,
  },
  input: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    fontSize: 20,
    width: '60%',
  },
  loading: {
    flex: 1,
  },
});
