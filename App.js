import { StatusBar } from 'expo-status-bar';
import Main from './Main';
import AuthContextProvider from './src/store/authContext';

export default function App() {
  return (
    <>
      <AuthContextProvider>
        <StatusBar style='auto' />
        <Main />
      </AuthContextProvider>
    </>
  );
}
