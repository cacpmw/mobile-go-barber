import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../services/api';
import {
  IAuthenticationContextData,
  IAuthenticationData,
} from './interfaces/AuthenticationContextInterface';

// context api
const AuthenticationContext = createContext<IAuthenticationContextData>(
  {} as IAuthenticationContextData,
);

// authentication hook
function useAuthenticationContext(): IAuthenticationContextData {
  const context = useContext(AuthenticationContext);
  if (!context) {
    throw new Error(
      'useAuthenticationContext must be used within an AuthenticationProvider',
    );
  }
  return context;
}

// component
const AuthenticationProvider: React.FC = ({ children }) => {
  // Initialize auth data if there any on localstorage otherwise set it to empty
  const [authenticationData, setAuthenticationData] = useState<
    IAuthenticationData
  >({} as IAuthenticationData);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStorageData() {
      const token = await AsyncStorage.getItem('@gobarber:token');
      const user = await AsyncStorage.getItem('@gobarber:user');
      if (token && user) {
        // automagically injects the token to every api call
        api.defaults.headers.Authorization = `Bearer ${token}`;
        setAuthenticationData({ token, user: JSON.parse(user) });
      }
      setLoading(false);
    }
    loadStorageData();
  }, []);

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('sessions', {
      email,
      password,
    });
    const { token, user } = response.data;
    await AsyncStorage.multiSet([
      ['@gobarber:token', token],
      ['@gobarber:user', JSON.stringify(user)],
    ]);
    // automagically injects the token to every api call
    api.defaults.headers.Authorization = `Bearer ${token}`;
    setAuthenticationData({
      token,
      user,
    });
  }, []);

  const signOut = useCallback(async () => {
    await AsyncStorage.multiRemove(['@gobarber:token', '@gobarber:user']);
    setAuthenticationData({} as IAuthenticationData);
  }, []);
  return (
    <AuthenticationContext.Provider
      value={{ user: authenticationData.user, signIn, signOut, loading }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};

export { AuthenticationProvider, useAuthenticationContext };
