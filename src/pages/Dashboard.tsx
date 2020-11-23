import React from 'react';
import { Button, View } from 'react-native';
import { useAuthenticationContext } from '../context/AuthenticationContext';

const Dashboard: React.FC = () => {
  const { signOut } = useAuthenticationContext();
  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <Button title="Exit" onPress={signOut} />
    </View>
  );
};

export default Dashboard;
