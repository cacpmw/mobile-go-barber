import React from 'react';
import { TextInputProps } from 'react-native';
import { Container, TextInput, Icon } from '../styles/components/input';

interface InputProperties extends TextInputProps {
  name: string;
  icon: string;
}

const Input: React.FC<InputProperties> = ({ name, icon, ...props }) => {
  return (
    <Container>
      <Icon name={icon} size={20} color="#666360" />
      <TextInput
        keyboardAppearance="dark"
        placeholderTextColor="#666360"
        {...props}
      />
    </Container>
  );
};

export default Input;
