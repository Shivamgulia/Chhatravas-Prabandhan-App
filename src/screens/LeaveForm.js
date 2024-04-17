import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { AuthContext } from "../store/authContext";

function LeaveForm() {
  const authCtx = useContext(AuthContext);

  const [name, setName] = useState("");
  const [rollno, setRollNo] = useState("");
  const [reason, setReason] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    setName(authCtx.user.name);
    setRollNo(authCtx.user.rollno);
  }, [authCtx]);

  async function submitionHandler() {
    const formData = {
      name,
      rollno,
      reason,
      startdate: startDate,
      enddate: endDate,
      hostel: authCtx.user.hostel,
    };

    try {
      const res = await fetch(
        process.env.EXPO_PUBLIC_API_URL + "/api/v1/leave/raise",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: authCtx.token,
          },
          body: JSON.stringify(formData),
        }
      );

      if (res.ok) {
        alert("Application Sent");
      } else {
        alert("Application Failed");
      }
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <View style={styles.container}>
      <Text>LeaveForm</Text>
      <View style={styles.form}>
        <View style={styles.inputDiv}>
          <Text style={styles.label}>Name</Text>
          <TextInput value={name} style={styles.input} editable={false} />
        </View>
        <View style={styles.inputDiv}>
          <Text style={styles.label}>Rollno</Text>
          <TextInput value={rollno} style={styles.input} editable={false} />
        </View>
        <View style={styles.inputDiv}>
          <Text style={styles.label}>Reason</Text>
          <TextInput
            onChangeText={setReason}
            style={styles.input}
            placeholder="Enter reason"
            required
          />
        </View>
        <View style={styles.inputDiv}>
          <Text style={styles.label}>From Date</Text>
          <TextInput
            onChangeText={setStartDate}
            style={styles.input}
            placeholder="YYYY-MM-DD"
            required
          />
        </View>
        <View style={styles.inputDiv}>
          <Text style={styles.label}>To Date</Text>
          <TextInput
            onChangeText={setEndDate}
            style={styles.input}
            placeholder="YYYY-MM-DD"
            required
          />
        </View>
        <TouchableOpacity onPress={submitionHandler} style={styles.button}>
          <Text style={styles.buttonText}>Raise Leave Application</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default LeaveForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  form: {
    marginTop: 20,
  },
  inputDiv: {
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});
