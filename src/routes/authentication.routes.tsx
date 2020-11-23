import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

const Authentication = createStackNavigator();

const AuthenticationRoutes: React.FC = () => {
  return (
    <Authentication.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: '#312e38' },
      }}
      initialRouteName="SignIn"
    >
      <Authentication.Screen name="SignIn" component={SignIn} />
      <Authentication.Screen name="SignUp" component={SignUp} />
    </Authentication.Navigator>
  );
};

export default AuthenticationRoutes;
