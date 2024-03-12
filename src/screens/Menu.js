import { API_URL } from '@env';
import React, { useContext, useEffect, useState } from 'react';
import { View } from 'react-native';
import MenuTable from '../components/Tables/MenuTable';
import { AuthContext } from '../store/authContext';

const Menu = () => {
  const [menu, setMenu] = useState([]);

  const authCtx = useContext(AuthContext);

  async function getMenu() {
    const res = await fetch(API_URL + '/api/v1/menu', {
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
      console.log(data);
    } else {
      console.log(res);
    }
  }

  useEffect(() => {
    getMenu();
  }, [authCtx]);

  return (
    <View>
      <MenuTable menu={menu} update={getMenu} />
    </View>
  );
};

export default Menu;
