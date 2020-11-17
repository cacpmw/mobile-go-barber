import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignIn from '../pages/SignIn';
import SignOut from '../pages/SignOut';

const Authentication = createStackNavigator();

const AuthenticationRoutes: React.FC = () => {
  return (
    <Authentication.Navigator
      screenOptions={{
        headerShown: true,
        cardStyle: { backgroundColor: '#312e38' },
      }}
    >
      <Authentication.Screen name="SignIn" component={SignIn} />
      <Authentication.Screen name="SignOut" component={SignOut} />
    </Authentication.Navigator>
  );
};

export default AuthenticationRoutes;
