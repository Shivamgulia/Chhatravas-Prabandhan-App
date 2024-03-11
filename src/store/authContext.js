import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';

export const AuthContext = React.createContext({
  isLoggedIn: false,
  token: '',
  user: {},
  login: () => {},
  logout: () => {},
  setValues: () => {},
});

export default function AuthContextProvider({ children }) {
  const [authToken, setToken] = useState();
  const [authUser, setUser] = useState();

  function login({ user, token }) {
    setToken(token);
    setUser(user);
    AsyncStorage.setItem('token', token);
    AsyncStorage.setItem('user', JSON.stringify(user));
  }

  function logout() {
    setToken(null);
    setUser(null);
    AsyncStorage.removeItem('token');
    AsyncStorage.removeItem('user');
  }

  function setValues({ user, token }) {
    setToken(token);
    setUser(user);
  }

  const value = {
    token: authToken,
    user: authUser,
    isLoggedIn: !!authToken,
    login: login,
    logout: logout,

    setValues: setValues,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
