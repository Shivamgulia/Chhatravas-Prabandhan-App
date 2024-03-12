import { API_URL } from '@env';
import React, { useState, useContext, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { AuthContext } from '../store/authContext';
import Loading from '../components/UI/Loading';

function RaiseIssue() {
  const authCtx = useContext(AuthContext);

  const [roomNo, setRoomNo] = useState(authCtx?.user?.room.toString());
  const [raiser, setRaiser] = useState(authCtx?.user?.name);
  const [description, setDescription] = useState('');
  const [issue, setIssue] = useState('');
  const [hostel, setHostel] = useState(authCtx?.user?.hostel);
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    if (issue.replace(' ', '') != '' && description.replace(' ', '') != '') {
      setLoading(true);

      const res = await fetch(API_URL + '/api/v1/maintainance/raise', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: 'Bearer ' + authCtx.token,
        },
        body: JSON.stringify({ roomNo, raiser, description, issue, hostel }),
      });
      const data = await res.json();

      setLoading(false);
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
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.heading}>Raise Issue</Text>
        <KeyboardAvoidingView behavior='padding' style={styles.container1}>
          <View style={styles.form}>
            <View style={styles.inputDiv}>
              <Text style={styles.label}>Room No</Text>
              <TextInput style={styles.input} value={roomNo} editable={false} />
            </View>
            <View style={styles.inputDiv}>
              <Text style={styles.label}>Raiser</Text>
              <TextInput style={styles.input} value={raiser} editable={false} />
            </View>
            <View style={styles.inputDiv}>
              <Text style={styles.label}>Description</Text>
              <TextInput
                style={styles.input}
                value={description}
                onChangeText={setDescription}
              />
            </View>
            <View style={styles.inputDiv}>
              <Text style={styles.label}>Issue</Text>
              <TextInput
                style={styles.input}
                value={issue}
                onChangeText={setIssue}
              />
            </View>

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text>Raise Issue</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container1: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  form: {
    flex: 1,
    width: '60%',
    // backgroundColor: 'yellow',
  },
  inputDiv: {
    marginBottom: 10,
  },
  label: {
    marginBottom: 5,
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    width: '100%',
  },
  button: {
    backgroundColor: '#3498db',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  loading: {
    flex: 1,
  },
});

export default RaiseIssue;
