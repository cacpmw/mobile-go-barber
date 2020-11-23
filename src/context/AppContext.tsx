import React from 'react';
import { AuthenticationProvider } from './AuthenticationContext';

const AppProvider: React.FC = ({ children }) => {
  return <AuthenticationProvider>{children}</AuthenticationProvider>;
};
export default AppProvider;
