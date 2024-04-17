import React, { useEffect, useState, useContext } from "react";
import { View, Text, Button, StyleSheet, Alert } from "react-native";
import { AuthContext } from "../store/authContext";
import Loading from "../components/UI/Loading";

function Maintainance() {
  const authCtx = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [maintainance, setMaintainance] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  async function fetchMaintainance() {
    setLoading(true);
    if (!authCtx.isLoggedIn) {
      setLoading(false);
      return;
    }
    try {
      const hostel = await authCtx.user.hostel;
      if (authCtx.token) {
        const response = await fetch(
          process.env.EXPO_PUBLIC_API_URL + "/api/v1/maintainance",
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
          setMaintainance(data.maintainance);
          setPages(data.pages);
        }
      }
    } catch (e) {
      Alert.alert("Request Failed");
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchMaintainance();
  }, [page]);

  if (loading) {
    return (
      <View style={styles.loading}>
        <Loading />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <View style={styles.listContainer}>
          {maintainance.map((item) => (
            <View key={item.id} style={styles.itemContainer}>
              <Text>Name: {item.raiser}</Text>
              <Text>Room No: {item.room_no}</Text>
              <Text>Issue: {item.issue}</Text>
              <Text>Description: {item.description}</Text>
              <Text>Issue Date: {item.issue_date}</Text>
              <Text>Status: {item.status === 1 ? "Active" : "Resolved"}</Text>
            </View>
          ))}
        </View>
      )}
      {pages > 1 && (
        <View style={styles.btnsContainer}>
          <Button
            title="Prev"
            onPress={() => {
              if (page > 1) setPage(page - 1);
            }}
          />
          <Button
            title="Next"
            onPress={() => {
              if (pages < page) setPage(page + 1);
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
    justifyContent: "space-between",
  },
  listContainer: {
    marginBottom: 10,
  },
  itemContainer: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 10,
  },
  btnsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  loading: {
    flex: 1,
  },
});

export default Maintainance;
