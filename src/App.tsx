import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { View, StatusBar } from 'react-native';
import AuthenticationRoutes from './routes/index';

const viewStyle = {
  backgroundColor: '#312e38',
  flex: 1,
};

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" />
      <View style={viewStyle}>
        <AuthenticationRoutes />
      </View>
    </NavigationContainer>
  );
};

export default App;
