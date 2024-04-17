import React, { useEffect, useState, useContext } from "react";
import { View, Text, Button, FlatList, StyleSheet, Alert } from "react-native";
import { AuthContext } from "../store/authContext";
import Loading from "../components/UI/Loading";

function StudentList() {
  const authCtx = useContext(AuthContext);

  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authCtx.isLoggedIn) {
      getStudents();
    }
  }, [page, authCtx]);

  async function getStudents() {
    setLoading(true);
    if (!authCtx.isLoggedIn) {
      setLoading(false);
      return;
    }
    try {
      const hostel = await authCtx.user.hostel;
      if (authCtx.token) {
        const response = await fetch(
          process.env.EXPO_PUBLIC_API_URL + "/api/v1/student",
          {
            method: "POST",
            headers: {
              authorization: `Bearer ${authCtx.token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ page, hostel }),
          }
        );

        if (!response.ok) {
          Alert.alert("Request Failed");
        } else {
          const data = await response.json();
          setStudents(data.students);
          setPages(data.pages);
          console.log(data);
        }
      }
    } catch (e) {
      Alert.alert("Request Failed");
    }
    setLoading(false);
  }

  if (loading) {
    return (
      <View style={styles.loading}>
        <Loading />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={students}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text>Name: {item.name}</Text>
            <Text>Roll No: {item.rollno}</Text>
            <Text>Father Name: {item.fathername}</Text>
            <Text>Branch: {item.branch}</Text>
            <Text>Room No: {item.roomno}</Text>
          </View>
        )}
      />
      {pages > 1 && (
        <View style={styles.buttonsContainer}>
          <Button
            title="Prev"
            onPress={() => {
              if (page > 1) setPage(page - 1);
            }}
          />
          <Button
            title="Next"
            onPress={() => {
              if (page < pages) setPage(page + 1);
            }}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  itemContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  loading: { flex: 1 },
});

export default StudentList;
