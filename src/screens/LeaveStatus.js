import React, { useEffect, useState, useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { AuthContext } from "../store/authContext";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  table: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  head: {
    flexDirection: "row",
    backgroundColor: "#007AFF",
    padding: 10,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  headItem: {
    flex: 1,
    color: "#fff",
    textAlign: "center",
  },
  body: {
    flexDirection: "row",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  bodyItem: {
    flex: 1,
    textAlign: "center",
  },
});

function LeaveStatus() {
  const authCtx = useContext(AuthContext);

  const [leaves, setLeaves] = useState([]);

  async function getLeaves() {
    const res = await fetch(
      process.env.EXPO_PUBLIC_API_URL + "/api/v1/leave/student",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: authCtx.token,
        },
        body: JSON.stringify({
          rollno: authCtx.user.rollno,
          hostel: authCtx.user.hostel,
        }),
      }
    );
    console.log("hii");
    if (res.ok) {
      const data = await res.json();
      console.log(data);
      setLeaves(data.leaves);
    } else {
      alert("Failed Fetch");
    }
  }

  useEffect(() => {
    if (authCtx.isLoggedIn) {
      getLeaves();
    }
  }, [authCtx]);

  return (
    <View style={styles.container}>
      <View style={styles.table}>
        <View style={styles.head}>
          <Text style={styles.headItem}>Reason</Text>
          <Text style={styles.headItem}>Start Date</Text>
          <Text style={styles.headItem}>Status</Text>
        </View>
        {leaves.map((item, index) => (
          <View key={index} style={styles.body}>
            <Text style={styles.bodyItem}>{item.reason}</Text>
            <Text style={styles.bodyItem}>{item.startdate.split("T", 1)}</Text>
            <Text style={styles.bodyItem}>{item.status}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

export default LeaveStatus;
