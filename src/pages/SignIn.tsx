import React from 'react';
import { Image } from 'react-native';
import { Container, Title } from '../styles/pages/sign';
import logo from '../assets/logo.png';

const SignIn: React.FC = () => {
  return (
    <Container>
      <Image source={logo} />
      <Title>Credentials</Title>
    </Container>
  );
};

export default SignIn;
