import React, { useCallback, useRef } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  View,
  TextInput,
  Alert,
  Keyboard,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import { ValidationError } from 'yup';
import Button from '../components/Button';
import Input from '../components/Input';
import { Container, Title, SignIn, SignInText } from '../styles/pages/signup';
import logo from '../assets/logo.png';
import api from '../services/api';
import { signUpValidator, getValidationErrors } from '../validator/Validator';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const formReference = useRef<FormHandles>(null);
  const passwordInputReference = useRef<TextInput>(null);
  const emailInputReference = useRef<TextInput>(null);
  const navigator = useNavigation();
  const handleSignUp = useCallback(
    async (data: SignUpFormData) => {
      try {
        formReference.current?.setErrors({});
        await signUpValidator.validate(data, { abortEarly: false });
        await api.post('users', data);
        // showToast({
        //   title: 'Welcome',
        //   type: 'success',
        //   description: 'Successfully signed up',
        // });
        Alert.alert('All set!', 'You can sign in now.');
        navigator.navigate('SignIn');
      } catch (error) {
        if (error instanceof ValidationError) {
          const errors = getValidationErrors(error);
          formReference.current?.setErrors(errors);
        }
        console.log(error);

        Alert.alert('Something went wrong!', "We couldn't register");
        // showToast({
        //   type: 'error',
        //   title: 'Algo deu errado!',
        //   description: 'Não foi possivel realizar o cadastro.',
        // });
      }
    },
    [navigator],
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
              <Title>Create Account</Title>
            </View>
            <Form
              ref={formReference}
              style={{ width: '100%' }}
              onSubmit={handleSignUp}
            >
              <Input
                autoCapitalize="words"
                autoFocus
                autoCorrect={false}
                name="name"
                icon="user"
                placeholder="Name"
                returnKeyType="next"
                onSubmitEditing={() => {
                  emailInputReference.current?.focus();
                }}
              />
              <Input
                ref={emailInputReference}
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
                ref={passwordInputReference}
                secureTextEntry
                name="password"
                icon="lock"
                placeholder="Password"
                returnKeyType="send"
                textContentType="newPassword"
                onSubmitEditing={() => {
                  Keyboard.dismiss();
                  formReference.current?.submitForm();
                }}
              />
              <Button
                onPress={() => {
                  formReference.current?.submitForm();
                }}
              >
                Sign Up
              </Button>
            </Form>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
      <SignIn onPress={() => navigator.navigate('SignIn')}>
        <Icon name="arrow-left" size={20} color="#fff" />
        <SignInText>Sign In</SignInText>
      </SignIn>
    </>
  );
};

export default SignUp;
