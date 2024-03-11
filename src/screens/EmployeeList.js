import React, { useContext, useEffect, useState } from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Pressable,
  Alert,
} from 'react-native';
import { Modal } from 'react-native';
import { AuthContext } from '../store/authContext';

const EmployeeList = () => {
  const authCtx = useContext(AuthContext);

  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    getEmployees();
  }, [page, authCtx]);

  async function getEmployees() {
    const hostel = authCtx.user.hostel;
    if (authCtx.token) {
      const response = await fetch('http://192.168.1.7:3000/api/v1/employee', {
        method: 'POST',
        headers: {
          authorization: `Bearer ${authCtx.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ page, hostel }),
      });

      if (response.ok) {
        const data = await response.json();
        setEmployees(data.employees);
        setPages(data.count);
      } else {
        console.log('Error');
      }
    }
  }

  async function addEmployee(name, job) {
    const hostel = authCtx.user.hostel;
    const token = authCtx.token;
    const res = await fetch('http://192.168.1.7:3000/api/v1/employee/create', {
      method: 'POST',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, job, hostel }),
    });
    if (res.ok) {
      getEmployees();
      closeModal();
    } else {
      setError(true);
    }
  }

  async function deleteEmployee(id) {
    const token = authCtx.token;

    Alert.alert(
      'Delete Employee',
      'Are you sure you want to delete this employee?',
      [
        {
          text: 'Cancle',
          onPress: () => {
            Alert.alert('Employee delete aborted');
          },
        },
        {
          text: 'Ok',
          onPress: async () => {
            const res = await fetch('http://192.168.1.7:3000/api/v1/employee', {
              method: 'DELETE',
              headers: {
                authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ id }),
            });
            if (res.ok) {
              getEmployees();
            } else {
              console.log('Error');
            }
          },
          style: 'cancel',
        },
      ]
    );
  }

  function openModal() {
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
  }

  return (
    <View style={styles.cont}>
      {authCtx.user.rollno == 0 && (
        <TouchableOpacity onPress={openModal} style={styles.addbutton}>
          <Text style={styles.buttontext}>Add New Employee</Text>
        </TouchableOpacity>
      )}

      <Modal visible={showModal} onRequestClose={closeModal}>
        <View style={styles.modalCont}>
          <View style={styles.modalClose}>
            <Pressable onPress={closeModal}>
              <Text style={styles.closeButton}>X</Text>
            </Pressable>
          </View>
          <View style={styles.modalbody}>
            <Text style={styles.error}>
              {error && 'Unable to add Employee'}
            </Text>
            <Text style={styles.head}>Add Employee</Text>
            <View style={styles.input}>
              <TextInput placeholder='Name' />
            </View>
            <View style={styles.input}>
              <TextInput placeholder='Job' />
            </View>
            <TouchableOpacity
              onPress={() => {
                const name = document.querySelector('input[name="name"]').value;
                const job = document.querySelector('input[name="job"]').value;
                addEmployee(name, job);
              }}
              style={styles.addButton}
            >
              <Text style={styles.buttonText}>Add</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <FlatList
        data={employees}
        renderItem={({ item }) => (
          <View style={styles.list}>
            <Text style={styles.text}>{item.name}</Text>
            <Text style={styles.text}>{item.job}</Text>
            {authCtx.user.rollno == 0 && (
              <TouchableOpacity
                onPress={() => deleteEmployee(item.id)}
                style={styles.delete}
              >
                <Text>Delete</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />

      {pages > 1 && (
        <View style={styles.pages}>
          <TouchableOpacity
            onPress={() => setPage(page - 1)}
            style={styles.pagebutton}
          >
            <Text style={styles.pageText}>Prev</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setPage(page + 1)}
            style={styles.pagebutton}
          >
            <Text style={styles.pageText}>Next</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  cont: {
    flex: 1,
    margin: 20,
  },
  addbutton: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  buttontext: {
    color: '#fff',
    textAlign: 'center',
  },
  modalCont: {
    flex: 1,
    paddingTop: '20%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalClose: {
    position: 'absolute',
    top: 60,
    right: 20,
    marginRight: 10,
    marginTop: 10,
  },
  closeButton: {
    color: 'red',
    fontSize: 20,
  },
  modalbody: {
    flex: 1,
    marginTop: '20%',
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  error: {
    color: 'red',
  },
  head: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#f2f2f2',
    padding: 10,

    marginBottom: 10,
    borderRadius: 5,
  },
  addButton: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
  list: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#ddd',
    paddingVertical: 10,
  },
  text: {
    flex: 1,
    padding: 10,
  },
  delete: {
    padding: 10,
  },
  pages: {
    flexDirection: 'row',
    marginTop: 20,
  },
  pagebutton: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  pageText: {
    color: '#fff',
    textAlign: 'center',
  },
});

export default EmployeeList;
