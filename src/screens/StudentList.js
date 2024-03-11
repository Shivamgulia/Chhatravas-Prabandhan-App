// import { StyleSheet, Text, View } from 'react-native';
// import React from 'react';

// const StudentList = () => {
//   return (
//     <View>
//       <Text>StudentList</Text>
//     </View>
//   );
// };

// export default StudentList;

// const styles = StyleSheet.create({});

import React, { useEffect, useState, useContext } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import { AuthContext } from '../store/authContext';

function StudentList() {
  const authCtx = useContext(AuthContext);

  const [page, setPage] = useState(1);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    getStudents();
  }, [page, authCtx]);

  async function getStudents() {
    const hostel = await authCtx.user.hostel;
    console.log(hostel);
    console.log(authCtx.token);
    if (authCtx.token) {
      console.log('auth', authCtx.token);
      const response = await fetch('http://192.168.1.7:3000/api/v1/student', {
        method: 'POST',
        headers: {
          authorization: `Bearer ${authCtx.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ page, hostel }),
      });

      if (!response.ok) {
        console.log('Error');
      } else {
        const data = await response.json();
        setStudents(data.students);
        console.log(data);
      }
    }
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
      <View style={styles.buttonsContainer}>
        <Button
          title='Prev'
          onPress={() => {
            if (page > 1) setPage(page - 1);
          }}
        />
        <Button
          title='Next'
          onPress={() => {
            setPage(page + 1);
          }}
        />
      </View>
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
    borderBottomColor: '#ccc',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});

export default StudentList;
