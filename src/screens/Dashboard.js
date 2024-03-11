// import { StyleSheet, Text, View } from 'react-native';
// import React from 'react';

// const Dashboard = () => {
//   return (
//     <View>
//       <Text>Dashboard</Text>
//     </View>
//   );
// };

// export default Dashboard;

// const styles = StyleSheet.create({});

import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from 'react-native';

import { Modal } from 'react-native';

import { AuthContext } from '../store/authContext';

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
    const res1 = await fetch('http://192.168.1.7:3000/api/v1/menu', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: 'Bearer ' + authCtx.token,
      },
      body: JSON.stringify({ hostel: authCtx.user.hostel }),
    });
    if (res1.ok) {
      const data = await res1.json();
      setMenu(data.menu[date.getDay() - 1]);
    } else {
      console.log(res1);
    }

    const res2 = await fetch('http://192.168.1.7:3000/api/v1/notices', {
      headers: {
        'Content-Type': 'application/json',
        authorization: 'Bearer ' + authCtx.token,
      },
    });
    if (res2.ok) {
      const data = await res2.json();
      setNotices(data.notices);
    } else {
      console.log(res2);
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

  return (
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
        animationType='slide'
        transparent={true}
        visible={showModal}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
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
                  <Text>{notice.head}</Text>
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  extras: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  sideCont: {
    flex: 1,
    marginRight: 5,
  },
  sideHead: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  sidelist: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 5,
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
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  noticeboard: {
    flex: 1,
  },
  noticehead: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  notice: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
  },
  emergency: {
    flex: 1,
    marginLeft: 5,
  },
  emergencyhead: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  emergencylist: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 5,
  },
  emergencyitem: {
    fontSize: 16,
  },
  modalCont: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'grey',
    padding: 20,
  },
  modalClose: {
    position: 'absolute',
    right: 30,
    top: 60,
  },
  closeButton: {
    fontSize: 30,
    backgroundColor: 'white',
    padding: 10,
  },
  modalBody: {
    padding: 40,
    backgroundColor: 'white',
  },
  modalHead: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalNotice: {
    fontSize: 16,
  },
});

const Days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

const Months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export default NoticeBoard;
