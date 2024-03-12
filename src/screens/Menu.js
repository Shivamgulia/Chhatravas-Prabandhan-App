import React, { useContext, useEffect, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import MenuTable from '../components/Tables/MenuTable';
import { AuthContext } from '../store/authContext';
import Loading from '../components/UI/Loading';

const Menu = () => {
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);

  const authCtx = useContext(AuthContext);

  async function getMenu() {
    setLoading(true);
    const res = await fetch(process.env.EXPO_PUBLIC_API_URL + '/api/v1/menu', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: 'Bearer ' + authCtx.token,
      },
      body: JSON.stringify({ hostel: authCtx.user.hostel }),
    });
    if (res.ok) {
      const data = await res.json();
      setMenu(data.menu);
    } else {
      Alert.alert('Request Failed');
    }
    setLoading(false);
  }

  useEffect(() => {
    getMenu();
  }, [authCtx]);

  if (loading) {
    return (
      <View style={styles.loading}>
        <Loading />
      </View>
    );
  }

  return (
    <View>
      <MenuTable menu={menu} update={getMenu} />
    </View>
  );
};

const styles = StyleSheet.create({
  loading: { flex: 1 },
});

export default Menu;
