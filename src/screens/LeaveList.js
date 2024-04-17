import React, { useEffect, useState, useContext } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Pressable,
} from "react-native";
import { Modal } from "react-native";
import { AuthContext } from "../store/authContext";

function LeaveList() {
  const authCtx = useContext(AuthContext);

  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [leaves, setLeaves] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [leave, setLeave] = useState({});

  useEffect(() => {
    getLeaves();
  }, [page]);

  async function getLeaves() {
    const hostel = authCtx.user.hostel;
    if (authCtx.token) {
      const response = await fetch(
        process.env.EXPO_PUBLIC_API_URL + "/api/v1/leave",
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
      } else {
        const data = await response.json();
        setPages(data.pages);
        setLeaves(data.leaves);
      }
    }
  }

  async function updateLeave(status) {
    const reqObj = { id: leave.id, status };

    const res = await fetch(
      process.env.EXPO_PUBLIC_API_URL + "/api/v1/leave/update",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: authCtx.token,
        },
        body: JSON.stringify(reqObj),
      }
    );
    getLeaves();
    closeModal();
  }

  function closeModal() {
    setShowModal(false);
  }

  return (
    <View style={styles.container}>
      <Modal visible={showModal} onRequestClose={closeModal}>
        <View style={styles.modalContainer}>
          <View style={styles.modalClose}>
            <Pressable onPress={closeModal}>
              <Text style={styles.closeButton}>X</Text>
            </Pressable>
          </View>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Leave</Text>
            <View>
              <Text>Applicant: {leave.applicant}</Text>
              <Text>Reason: {leave.reason}</Text>
              <Text>From: {leave.startdate}</Text>
              <Text>To: {leave.enddate}</Text>
              <Text>Status:</Text>
              <TextInput
                value={leave.status}
                onChangeText={(status) => setLeave({ ...leave, status })}
                style={styles.input}
              />
              <TouchableOpacity
                onPress={() => updateLeave(leave.status)}
                style={styles.btn}
              >
                <Text style={styles.btnText}>Update Status</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <FlatList
        data={leaves}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              setLeave(item);
              setShowModal(true);
            }}
          >
            <View style={styles.leaveItem}>
              <Text style={styles.leaveItemText}>Name: {item.applicant}</Text>
              <Text style={styles.leaveItemText}>Roll No.: {item.rollno}</Text>
              <Text style={styles.leaveItemText}>Reason: {item.reason}</Text>
              <Text style={styles.leaveItemText}>From: {item.startdate}</Text>
              <Text style={styles.leaveItemText}>To: {item.enddate}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
      {pages > 1 && (
        <View style={styles.btnContainer}>
          <TouchableOpacity
            onPress={() => {
              if (page > 1) setPage(page - 1);
            }}
            style={styles.btn}
          >
            <Text style={styles.btnText}>prev</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              if (pages > page) setPage(page + 1);
            }}
            style={styles.btn}
          >
            <Text style={styles.btnText}>next</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

export default LeaveList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
  },
  modalClose: {
    position: "absolute",
    right: 30,
    top: 60,
  },
  closeButton: {
    fontSize: 30,
    // backgroundColor: "white",
    color: "red",
    padding: 10,
  },
  leaveItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  leaveItemText: {
    fontSize: 16,
    marginBottom: 5,
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  btn: {
    padding: 10,
    backgroundColor: "#007AFF",
    borderRadius: 5,
  },
  btnText: {
    color: "#fff",
    fontSize: 16,
  },
});
