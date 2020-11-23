import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { View, StatusBar } from 'react-native';
import Routes from './routes/index';
import AppProvider from './context/AppContext';

const viewStyle = {
  backgroundColor: '#312e38',
  flex: 1,
};

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" />
      <AppProvider>
        <View style={viewStyle}>
          <Routes />
        </View>
      </AppProvider>
    </NavigationContainer>
  );
};

export default App;
