import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';

import Loading from '../UI/Loading';

function SignUpForm({ user }) {
  const [formData, setFormData] = useState({ name: '', email: '', rollno: '' });
  const [formError, setFormError] = useState('');
  const [password, setPassword] = useState('');
  const [confrimPassword, setConfrimPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const signUp = async () => {
    // Logic for signing up

    if (password === confrimPassword) {
      setLoading(true);
      try {
        const res = await fetch(
          process.env.EXPO_PUBLIC_API_URL + '/api/auth/signup',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              ...formData,
              password: password,
            }),
          }
        );

        if (!res.ok) {
          const data = await res.json();
          setFormError(data.message);
        } else {
          Alert.alert('Sign Up Success Full');
        }
      } catch (e) {
        Alert.alert('Sign Up Failed', e);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    const name = user.given_name;

    const rollno = user.email.replace('@hbtu.ac.in', '');

    setFormData({ name: name, email: user.email, rollno: rollno });
  }, [user]);

  if (loading) {
    return (
      <View>
        <Loading />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Sign Up Form</Text>
      <View style={styles.infoDiv}>
        <View style={styles.userInfoDiv}>
          <Text style={styles.info}>Name :</Text>
          <Text style={styles.info}> {formData.name}</Text>
        </View>
        <View style={styles.userInfoDiv}>
          <Text style={styles.info}>Email :</Text>
          <Text style={styles.info}>{formData.email}</Text>
        </View>
        <View style={styles.userInfoDiv}>
          <Text style={styles.info}>Roll No :</Text>
          <Text style={styles.info}>{formData.rollno}</Text>
        </View>
      </View>
      {formError !== '' && <Text style={styles.error}>{formError}</Text>}
      <View style={styles.form}>
        <View style={styles.inputDiv}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            secureTextEntry={true}
            placeholder='Enter password'
            style={styles.input}
            onChangeText={setPassword}
          />
        </View>
        <View style={styles.inputDiv}>
          <Text style={styles.label}>Confirm Password</Text>
          <TextInput
            secureTextEntry={true}
            placeholder='Confirm password'
            style={styles.input}
            onChangeText={setConfrimPassword}
          />
        </View>
        <TouchableOpacity onPress={signUp} style={styles.button}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F9F9F9',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  infoDiv: {
    marginBottom: 20,
  },
  userInfoDiv: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  info: {
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 20,
  },
  form: {
    flexDirection: 'column',
  },
  inputDiv: {
    marginBottom: 20,
  },
  label: {
    marginBottom: 5,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 5,
  },
  button: {
    padding: 10,
    backgroundColor: '#007BFF',
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});

export default SignUpForm;
