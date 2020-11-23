import React from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { RectButtonProperties } from 'react-native-gesture-handler';
import { Container, ButtonText } from '../styles/components/button';

interface ButtonProperties extends RectButtonProperties {
  children: string;
}

const Button: React.FC<ButtonProperties> = ({ children, ...rest }) => {
  return (
    <Container {...rest}>
      <ButtonText>{children}</ButtonText>
    </Container>
  );
};

export default Button;
