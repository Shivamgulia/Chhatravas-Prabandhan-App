import { API_URL } from '@env';
import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { AuthContext } from '../store/authContext';

const Notice = () => {
  const authCtx = useContext(AuthContext);
  const [head, setHead] = useState('');
  const [details, setDetails] = useState('');
  const [loading, setLoading] = useState(false);

  const submitionHandler = async () => {
    const noticeData = { head, details };
    setLoading(true);
    try {
      const res = await fetch(API_URL + '/api/v1/notices', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: 'Bearer ' + authCtx.token,
        },
        body: JSON.stringify(noticeData),
      });

      if (res.ok) {
        const data = await res.json();
        Alert.alert('Notice added successfully');
      } else {
        Alert.alert('Error', 'Failed to add notice');
      }
    } catch (error) {
      Alert.alert('Error', 'An unexpected error occurred');
    }
    setLoading(false);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView behavior='padding' style={styles.container}>
        <Text style={styles.formHead}>Notice</Text>
        <View style={styles.inputDiv}>
          <TextInput
            style={styles.input}
            placeholder='Heading'
            onChangeText={setHead}
            value={head}
          />
        </View>
        <View style={styles.inputDiv}>
          <TextInput
            style={[styles.input, { height: 100 }]}
            placeholder='Details'
            onChangeText={setDetails}
            value={details}
            multiline
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={submitionHandler}>
          <Text style={styles.buttonText}>Add New Notice</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  formHead: {
    fontSize: 24,
    marginBottom: 20,
  },
  inputDiv: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 16,
  },
  button: {
    backgroundColor: 'blue',
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
};

export default Notice;
