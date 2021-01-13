import React, { useCallback, useRef } from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Alert,
  Keyboard,
  TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import { ValidationError } from 'yup';
import Icon from 'react-native-vector-icons/Feather';
import ImagePicker from 'react-native-image-picker';
import Button from '../components/Button';
import Input from '../components/Input';
import {
  Container,
  Title,
  UserAvatarButton,
  UserAvatar,
  BackButton,
} from '../styles/pages/profile';
import api from '../services/api';
import { profileValidator, getValidationErrors } from '../validator/Validator';
import { useAuthenticationContext } from '../context/AuthenticationContext';

interface ProfileFormData {
  name: string;
  email: string;
  newPassword: string;
  oldPassword: string;
  passwordConfirmation: string;
}

const Profile: React.FC = () => {
  const formReference = useRef<FormHandles>(null);
  const { user, updateUserData, signOut } = useAuthenticationContext();
  const { goBack } = useNavigation();
  const oldPasswordInputReference = useRef<TextInput>(null);
  const newPasswordInputReference = useRef<TextInput>(null);
  const passwordConfirmationInputReference = useRef<TextInput>(null);
  const emailInputReference = useRef<TextInput>(null);
  const navigator = useNavigation();
  const handleSignUp = useCallback(
    async (data: ProfileFormData) => {
      try {
        formReference.current?.setErrors({});
        await profileValidator.validate(data, { abortEarly: false });
        const {
          name,
          email,
          oldPassword,
          newPassword,
          passwordConfirmation,
        } = data;
        const payload = {
          name,
          email,
          ...(oldPassword
            ? {
              oldPassword,
              newPassword,
              passwordConfirmation,
            }
            : {}),
        };
        const response = await api.put('user-data', payload);
        updateUserData(response.data);
        Alert.alert('All set!', 'Your data has been updated.');
        navigator.goBack();
      } catch (error) {
        if (error instanceof ValidationError) {
          const errors = getValidationErrors(error);
          formReference.current?.setErrors(errors);
        }

        Alert.alert('Something went wrong!', "We couldn't register");
      }
    },
    [navigator, updateUserData],
  );
  const handleGoBack = useCallback(() => {
    goBack();
  }, [goBack]);

  const handleUpdateAvatar = useCallback(async () => {
    ImagePicker.showImagePicker(
      {
        title: 'Select Avatar',
        cancelButtonTitle: 'Cancel',
        takePhotoButtonTitle: 'Open camera',
        chooseFromLibraryButtonTitle: 'Choose from gallery',
      },
      response => {
        if (response.didCancel) {
          return;
        }
        if (response.error) {
          Alert.alert("We couldn't update your photo.");
        }
        {
          const source = { uri: response.uri };
          const data = new FormData();
          data.append('avatar', {
            type: 'image/jpeg',
            uri: source.uri,
            name: `${user.id}.jpg`,
          });

          api.patch('/users/avatar', data).then(apiResponse => {
            updateUserData(apiResponse.data);
          });
        }
      },
    );
  }, [updateUserData, user.id]);
  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <ScrollView contentContainerStyle={{ flex: 1 }}>
          <Container>
            <BackButton onPress={handleGoBack}>
              <Icon name="chevron-left" size={24} color="#999591" />
            </BackButton>
            <UserAvatarButton onPress={handleUpdateAvatar}>
              <UserAvatar source={{ uri: user.avatarUrl }} />
            </UserAvatarButton>
            <Button onPress={signOut}>Logout</Button>
            <Title>Profile</Title>
            <Form
              initialData={user}
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
                  oldPasswordInputReference.current?.focus();
                }}
              />

              <Input
                ref={oldPasswordInputReference}
                containerStyle={{ marginTop: 16 }}
                secureTextEntry
                name="oldPassword"
                icon="lock"
                placeholder="Old Password"
                returnKeyType="next"
                textContentType="newPassword"
                onSubmitEditing={() => {
                  newPasswordInputReference.current?.focus();
                }}
              />
              <Input
                ref={newPasswordInputReference}
                secureTextEntry
                name="newPassword"
                icon="lock"
                placeholder="New Password"
                returnKeyType="next"
                textContentType="newPassword"
                onSubmitEditing={() => {
                  passwordConfirmationInputReference.current?.focus();
                }}
              />
              <Input
                ref={passwordConfirmationInputReference}
                secureTextEntry
                name="passwordConfirmation"
                icon="lock"
                placeholder="New password confirmation"
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
                Save
              </Button>
            </Form>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

export default Profile;
