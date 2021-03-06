import React, { useCallback, useRef } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  View,
  TextInput,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';
import { ValidationError } from 'yup';
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
import api from '../services/api';
import { signUpValidator, getValidationErrors } from '../validator/Validator';
import { useAuthenticationContext } from '../context/AuthenticationContext';

const SignIn: React.FC = () => {
  const navigator = useNavigation();
  const formReference = useRef<FormHandles>(null);
  const passwordInputReference = useRef<TextInput>(null);

  interface SignInFormData {
    email: string;
    password: string;
  }
  const { signIn } = useAuthenticationContext();

  const handleSignIn = useCallback(
    async (data: SignInFormData) => {
      try {
        formReference.current?.setErrors({});
        await signUpValidator.validate(data, { abortEarly: false });
        await signIn(data);
      } catch (error) {
        if (error instanceof ValidationError) {
          const errors = getValidationErrors(error);
          formReference.current?.setErrors(errors);
        }
        console.log(error);
        Alert.alert('Something went wrong!', "We couldn't register");
      }
    },
    [signIn],
  );
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
            <Form
              style={{ width: '100%' }}
              ref={formReference}
              onSubmit={handleSignIn}
            >
              <Input
                autoFocus
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="email-address"
                name="email"
                icon="mail"
                placeholder="Email"
                returnKeyType="next"
                onSubmitEditing={() => {
                  passwordInputReference.current?.focus();
                }}
              />
              <Input
                secureTextEntry
                ref={passwordInputReference}
                name="password"
                icon="lock"
                placeholder="Password"
                returnKeyType="send"
                onSubmitEditing={() => {
                  formReference.current?.submitForm();
                }}
              />
              <Button
                onPress={() => {
                  formReference.current?.submitForm();
                }}
              >
                Sign In
              </Button>
            </Form>

            <ForgotPassword
              onPress={() => {
                console.log('esqueci a senha');
              }}
            >
              <ForgotPasswordText>Forgot my password</ForgotPasswordText>
            </ForgotPassword>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
      <CreateAccount onPress={() => navigator.navigate('SignUp')}>
        <Icon name="log-in" size={20} color="#ff9000" />
        <CreateAccountText>Create Account</CreateAccountText>
      </CreateAccount>
    </>
  );
};

export default SignIn;
