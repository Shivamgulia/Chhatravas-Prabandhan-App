import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Pressable,
} from "react-native";

import { Modal } from "react-native";
import { AuthContext } from "../../store/authContext";

import Loading from "../UI/Loading";

function MenuTable(props) {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [item, setItem] = useState(null);
  const [formData, setFormData] = useState(null);

  const authCtx = useContext(AuthContext);

  async function updateMenu() {
    setLoading(true);
    const res = await fetch(
      process.env.EXPO_PUBLIC_API_URL + "/api/v1/menu/update",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + authCtx.token,
        },
        body: JSON.stringify(formData),
      }
    );
    if (res.ok) {
      const data = await res.json();
      props.update();
    } else {
      Alert.alert("Request Failed");
    }
    setLoading(false);
  }

  function openModal(selectedItem) {
    setItem(selectedItem);
    setFormData(selectedItem);
    setShowModal(true);
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
    <ScrollView>
      <View style={styles.cont}>
        <Modal visible={showModal} onRequestClose={closeModal}>
          <View style={styles.modalContainer}>
            <View style={styles.modalClose}>
              <Pressable onPress={closeModal}>
                <Text style={styles.closeButton}>X</Text>
              </Pressable>
            </View>
            <Text style={styles.modalHeading}>{item?.day}</Text>
            <TextInput
              defaultValue={item?.breakfast}
              onChangeText={(text) => setItem({ ...item, breakfast: text })}
              style={styles.modalInput}
            />
            <TextInput
              defaultValue={item?.lunch}
              onChangeText={(text) => setItem({ ...item, lunch: text })}
              style={styles.modalInput}
            />
            <TextInput
              defaultValue={item?.snack}
              onChangeText={(text) => setItem({ ...item, snack: text })}
              style={styles.modalInput}
            />
            <TextInput
              defaultValue={item?.dinner}
              onChangeText={(text) => setItem({ ...item, dinner: text })}
              style={styles.modalInput}
            />
            <TouchableOpacity onPress={updateMenu} style={styles.updateButton}>
              <Text style={styles.buttonText}>Update</Text>
            </TouchableOpacity>
          </View>
        </Modal>

        <View style={styles.tableContainer}>
          <View style={styles.headContainer}>
            <View style={styles.column}>
              <Text style={styles.cell}>Day</Text>
            </View>
            <View style={styles.column}>
              <Text style={styles.cell}>Breakfast</Text>
            </View>
            <View style={styles.column}>
              <Text style={styles.cell}>Lunch</Text>
            </View>
            <View style={styles.column}>
              <Text style={styles.cell}>Snack</Text>
            </View>
            <View style={styles.column}>
              <Text style={styles.cell}>Dinner</Text>
            </View>
          </View>
          {props.menu.map((item, index) => (
            <TouchableOpacity
              key={item.id}
              onPress={() => {
                if (authCtx.user.rollno == 0) {
                  openModal(item);
                }
              }}
              style={styles.rowContainer}
            >
              <View style={styles.column}>
                <Text style={styles.cell}>{item.day}</Text>
              </View>
              <View style={styles.column}>
                <Text style={styles.cell}>{item.breakfast}</Text>
              </View>
              <View style={styles.column}>
                <Text style={styles.cell}>{item.lunch}</Text>
              </View>
              <View style={styles.column}>
                <Text style={styles.cell}>{item.snack}</Text>
              </View>
              <View style={styles.column}>
                <Text style={styles.cell}>{item.dinner}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  cont: {
    backgroundColor: "white",
    height: "100%",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    padding: "20%",
    justifyContent: "center",
    borderRadius: 10,
  },
  modalClose: {
    position: "absolute",
    top: 60,
    right: 20,
    marginRight: 10,
    marginTop: 10,
  },
  closeButton: {
    color: "red",
    fontSize: 20,
  },
  modalHeading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  modalInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
    color: "#333", // Dark grey color
  },
  updateButton: {
    backgroundColor: "#007bff", // Blue color
    borderRadius: 5,
    padding: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  tableContainer: {
    marginVertical: 20,

    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    backgroundColor: "#fff",
  },
  headContainer: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "lightblue",
    paddingVertical: 10,
  },
  rowContainer: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#f9f9f9",
    paddingVertical: 10,
  },
  column: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cell: {
    fontSize: 16,
    color: "#333",
  },
  loading: {
    flex: 1,
  },
});

export default MenuTable;
