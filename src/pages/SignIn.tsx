import React from 'react';
import {
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Button from '../components/Button';
import Input from '../components/Input';
import {
  Container,
  Title,
  ForgotPassword,
  ForgotPasswordText,
  CreateAccount,
  CreateAccountText,
} from '../styles/pages/signin';
import logo from '../assets/logo.png';

const SignIn: React.FC = () => {
  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <ScrollView contentContainerStyle={{ flex: 1 }}>
          <Container>
            <Image source={logo} />
            <View>
              <Title>Credentials</Title>
            </View>
            <Input name="email" icon="mail" placeholder="Email" />
            <Input name="password" icon="lock" placeholder="Password" />
            <Button
              onPress={() => {
                console.log('entrar');
              }}
            >
              Entrar
            </Button>
            <ForgotPassword
              onPress={() => {
                console.log('esqueci a senha');
              }}
            >
              <ForgotPasswordText>Esqueci minha senha</ForgotPasswordText>
            </ForgotPassword>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
      <CreateAccount>
        <Icon name="log-in" size={20} color="#ff9000" />
        <CreateAccountText>Criar Conta</CreateAccountText>
      </CreateAccount>
    </>
  );
};

export default SignIn;
