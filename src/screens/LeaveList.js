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
import Loading from "../components/UI/Loading";
// import { Picker } from "@react-native-picker/picker";
import { Dropdown } from "react-native-element-dropdown";

const data = [
  { label: "Pending", value: "Pending" },
  { label: "Approve", value: "Approved" },
  { label: "Deny", value: "Denied" },
];

function LeaveList() {
  const authCtx = useContext(AuthContext);

  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [leaves, setLeaves] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [leave, setLeave] = useState({});
  const [status, setStatus] = useState("");
  const [isFocus, setIsFocus] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (authCtx.isLoggedIn) {
      getLeaves();
    }
  }, [page]);

  async function getLeaves() {
    setLoading(true);
    if (!authCtx.isLoggedIn) {
      setLoading(false);
      return;
    }
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
    setLoading(false);
  }

  async function updateLeave(status) {
    setLoading(true);
    if (!authCtx.isLoggedIn) {
      setLoading(false);
      return;
    }

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
    setLoading(false);
  }

  function closeModal() {
    setShowModal(false);
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
      <Modal visible={showModal} onRequestClose={closeModal}>
        <View style={styles.modalContainer}>
          <View style={styles.modalClose}>
            <Pressable onPress={closeModal}>
              <Text style={styles.closeButton}>X</Text>
            </Pressable>
          </View>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Leave</Text>
            <View style={styles.data}>
              <Text style={styles.modalinside}>Applicant:</Text>
              <Text style={styles.modalinside}>{leave.applicant}</Text>
              <Text style={styles.modalinside}>Reason: </Text>
              <Text style={styles.modalinside}>{leave.reason}</Text>
              <Text style={styles.modalinside}>From: </Text>
              <Text style={styles.modalinside}>
                {leave.startdate?.substr(0, 10)}
              </Text>
              <Text style={styles.modalinside}>To: </Text>
              <Text style={styles.modalinside}>
                {leave.enddate?.substr(0, 10)}
              </Text>
              <Text style={styles.modalinside}>Status:</Text>
              {/* <TextInput
                value={leave.status}
                onChangeText={(status) => setLeave({ ...leave, status })}
                style={styles.input}
              /> */}
              <Dropdown
                style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
                placeholderStyle={styles.placeholderStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={data}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? "Select item" : "..."}
                searchPlaceholder="Search..."
                value={leave.status}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={(item) => {
                  setLeave({ ...leave, status: item.value });
                  setIsFocus(false);
                }}
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
              setLeave({
                ...item,
              });
              setShowModal(true);
            }}
          >
            <View style={styles.leaveItem}>
              <Text style={styles.leaveItemText}>Name: {item.applicant}</Text>
              <Text style={styles.leaveItemText}>Roll No.: {item.rollno}</Text>
              <Text style={styles.leaveItemText}>Reason: {item.reason}</Text>
              <Text style={styles.leaveItemText}>
                From: {item.startdate.substring(0, 10)}
              </Text>
              <Text style={styles.leaveItemText}>
                To: {item.enddate.substring(0, 10)}
              </Text>
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
    fontSize: 30,
    textAlign: "center",
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
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
    color: "#333",
  },
  loading: {
    flex: 1,
  },
  data: {
    flexWrap: "wrap",
    gap: 10,
  },
  modalinside: {
    fontSize: 18,
  },
  dropdown: {
    fontSize: 18,
  },
});
