import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useAuthenticationContext } from '../context/AuthenticationContext';
import AppRoutes from './app.routes';
import AuthencationRoutes from './authentication.routes';

const Routes: React.FC = () => {
  const { user, loading } = useAuthenticationContext();
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#999" />
      </View>
    );
  }
  return user ? <AppRoutes /> : <AuthencationRoutes />;
};

export default Routes;
