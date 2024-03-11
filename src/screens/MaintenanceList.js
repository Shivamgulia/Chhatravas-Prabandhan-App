// import { StyleSheet, Text, View } from 'react-native';
// import React from 'react';

// const MaintenanceList = () => {
//   return (
//     <View>
//       <Text>MaintenanceList</Text>
//     </View>
//   );
// };

// export default MaintenanceList;

// const styles = StyleSheet.create({});

import React, { useEffect, useState, useContext } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { AuthContext } from '../store/authContext';

function Maintainance() {
  const authCtx = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [maintainance, setMaintainance] = useState([]);
  const [page, setPage] = useState(1);

  async function fetchMaintainance() {
    const hostel = await authCtx.user.hostel;
    if (authCtx.token) {
      const response = await fetch(
        'http://192.168.1.7:3000/api/v1/maintainance',
        {
          method: 'POST',
          headers: {
            authorization: `Bearer ${authCtx.token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ page, hostel }),
        }
      );

      if (!response.ok) {
        console.log('Error');
      } else {
        const data = await response.json();
        setMaintainance(data.maintainance);
        console.log(data);
      }
    }
  }

  useEffect(() => {
    setLoading(true);
    fetchMaintainance();
    setLoading(false);
  }, []);

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
              <Text>Status: {item.status === 1 ? 'Active' : 'Resolved'}</Text>
            </View>
          ))}
        </View>
      )}
      <View style={styles.btnsContainer}>
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
  listContainer: {
    marginBottom: 10,
  },
  itemContainer: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
  },
  btnsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default Maintainance;
