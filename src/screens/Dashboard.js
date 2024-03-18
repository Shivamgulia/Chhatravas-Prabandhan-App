import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  Alert,
  ScrollView,
} from "react-native";

import { Modal } from "react-native";

import { AuthContext } from "../store/authContext";
import Loading from "../components/UI/Loading";

const NoticeBoard = () => {
  const [showModal, setShowModal] = useState(false);
  const [notice, setNotice] = useState({});
  const [loading, setLoading] = useState({});
  const [notices, setNotices] = useState([]);
  const [menu, setMenu] = useState({});
  const date = new Date();
  const authCtx = useContext(AuthContext);

  async function getData() {
    setLoading(true);
    try {
      const res1 = await fetch(
        process.env.EXPO_PUBLIC_API_URL + "/api/v1/menu",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: "Bearer " + authCtx.token,
          },
          body: JSON.stringify({ hostel: authCtx.user.hostel }),
        }
      );

      if (res1.ok) {
        const data = await res1.json();
        setMenu(data.menu[date.getDay() - 1]);
      } else {
        Alert.alert("Request failed");
      }

      const res2 = await fetch(
        process.env.EXPO_PUBLIC_API_URL + "/api/v1/notices",
        {
          headers: {
            "Content-Type": "application/json",
            authorization: "Bearer " + authCtx.token,
          },
        }
      );

      if (res2.ok) {
        const data = await res2.json();
        setNotices(data.notices);
      } else {
        Alert.alert("Request failed");
      }
    } catch (e) {
      Alert.alert("Request Failed", e);
    }
    setLoading(false);
  }

  useEffect(() => {
    getData();
  }, []);

  function openModal(notice) {
    setNotice(notice);
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
    <ScrollView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.extras}>
          <View style={styles.sideCont}>
            <Text style={styles.sideHead}>Today</Text>
            <View style={styles.sidelist}>
              <Text style={styles.sideitem1}>{date.getDate()}</Text>
              <Text style={styles.sideitem2}>{Months[date.getMonth()]}</Text>
              <Text style={styles.sideitem3}>{Days[date.getDay()]}</Text>
            </View>
          </View>

          <View style={styles.sideCont}>
            <Text style={styles.sideHead}>Today's Menu</Text>
            {loading ? (
              <Text>Loading</Text>
            ) : (
              <View style={styles.sidelist}>
                <Text style={styles.sideitem1}>{menu?.breakfast}</Text>
                <Text style={styles.sideitem2}>{menu?.snack}</Text>
                <Text style={styles.sideitem3}>{menu?.dinner}</Text>
              </View>
            )}
          </View>
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={showModal}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            closeModal();
          }}
        >
          <View style={styles.modalCont}>
            <View style={styles.modalClose}>
              <Pressable onPress={closeModal}>
                <Text style={styles.closeButton}>X</Text>
              </Pressable>
            </View>
            <View style={styles.modalBody}>
              <Text style={styles.modalHead}>{notice.head}</Text>
              <Text style={styles.modalNotice}>{notice.details}</Text>
            </View>
          </View>
        </Modal>

        <View style={styles.body}>
          <View style={styles.noticeboard}>
            <Text style={styles.noticehead}>Notices</Text>
            {loading ? (
              <Text>Loading...</Text>
            ) : (
              <View>
                {notices.map((notice, index) => (
                  <TouchableOpacity
                    style={styles.notice}
                    key={index}
                    onPress={() => openModal(notice)}
                  >
                    <Text style={styles.noticeText}>{notice.head}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          <View style={styles.emergency}>
            <Text style={styles.emergencyhead}>Emergency Numbers</Text>
            <View style={styles.emergencylist}>
              <Text style={styles.emergencyitem}>Police: 100</Text>
              <Text style={styles.emergencyitem}>Ambulance: 102</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  extras: {
    flex: 1,
    justifyContent: "space-between",
  },
  sideCont: {
    backgroundColor: "#007bff",
    borderRadius: 10,
    flex: 1,
    padding: 10,
    marginVertical: 5,
  },
  sideHead: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  sidelist: {
    borderColor: "#ccc",
  },
  sideitem1: {
    fontSize: 16,
  },
  sideitem2: {
    fontSize: 16,
  },
  sideitem3: {
    fontSize: 16,
  },
  body: {
    flex: 2,
    marginTop: 20,
    justifyContent: "space-between",
  },
  noticeboard: {
    flex: 2,
    backgroundColor: "#007bff",
    borderRadius: 10,
  },
  noticehead: {
    fontSize: 20,
    padding: 10,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#a9d6e5",
  },
  notice: {
    borderBottomWidth: 1,
    borderTopWidth: 1,
    padding: 10,
    paddingLeft: 20,
    borderColor: "#a9d6e5",
  },
  noticeText: {
    color: "#a9d6e5",
  },
  emergency: {
    flex: 1,
    padding: 10,
    position: "relative",
    bottom: 0,
  },
  emergencyhead: {
    fontSize: 20,
    fontWeight: "bold",
    color: "red",
    marginBottom: 5,
  },
  emergencylist: {
    borderColor: "#ccc",
    padding: 5,
  },
  emergencyitem: {
    fontSize: 16,
  },
  modalCont: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "grey",
    padding: 20,
  },
  modalClose: {
    position: "absolute",
    right: 30,
    top: 60,
  },
  closeButton: {
    fontSize: 30,
    backgroundColor: "white",
    padding: 10,
  },
  modalBody: {
    padding: 40,
    backgroundColor: "white",
  },
  modalHead: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalNotice: {
    fontSize: 16,
  },
  loading: { flex: 1 },
});

const Days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const Months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default NoticeBoard;
