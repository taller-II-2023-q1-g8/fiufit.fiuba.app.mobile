import { Alert } from 'react-native';
import { func, shape } from 'prop-types';
import {
  signInWithEmailAndPassword,
  signInWithCredential,
  GoogleAuthProvider,
  signInAnonymously
} from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { cloneDeep } from 'lodash';
import * as LocalAuthentication from 'expo-local-authentication';

import TextField from '../../../components/Fields/TextField';
import {
  EMAIL_KEY,
  emailFieldType,
  PASSWORD_KEY,
  passwordFieldType
} from '../../../components/Fields/constants';
import { auth } from '../../../../firebaseConfig';
import texts from '../../../texts';
import { fetchUserByEmail } from '../../../requests';

import Login from './layout';

const fieldTexts = texts.Fields;

GoogleSignin.configure({
  webClientId: '587864716594-rieevghh6j6gi2m10lhb835u4ndn0631.apps.googleusercontent.com',
  offlineAccess: true
});

export default function LoginContainer({ navigation }) {
  const [loading, setLoading] = useState(false);
  const initialData = { email: '', password: '' };
  const [data, setData] = useState(initialData);
  const [errors, setErrors] = useState(initialData);
  const [isBiometricAvailable, setIsBiometricAvailable] = useState(false);

  const handleBiometricLogin = async () => {
    const result = await LocalAuthentication.authenticateAsync('Biometric Login');
    console.log({ result });
    // if (result.success) {
    //   console.log('Biometric authentication successful');
    //   // Biometric authentication successful
    //   // Check if the user exists in Firebase
    //   const { currentUser } = auth;
    //   if (currentUser) {
    //     console.log('User is already signed in');
    //     // User is already signed in, proceed with the app
    //     // For example, navigate to the home screen
    //   } else {
    //     // User is not signed in, create a new Firebase user using anonymous authentication
    //     signInAnonymously()
    //       .then((userCredential) => {
    //         console.log('User successfully logged in');
    //         // User successfully logged in
    //         // Handle the logged-in user
    //       })
    //       .catch((_error) => {
    //         console.log('Firebase authentication error');
    //         // Handle Firebase authentication error
    //       });
    //   }
    // } else {
    //   console.log('biometric authentification failed');
    //   // Biometric authentication failed or canceled
    //   if (result.error) {
    //     console.log('biometric authentification error');
    //     // Handle the error
    //   }
    // }
  };

  const checkBiometricAvailability = async () => {
    // if the user has the required hardware and has biometrics recorded in their OS
    const hasBiometricAuth =
      (await LocalAuthentication.hasHardwareAsync()) && (await LocalAuthentication.isEnrolledAsync());
    setIsBiometricAvailable(hasBiometricAuth);
    if (hasBiometricAuth) handleBiometricLogin();
  };

  useEffect(() => {
    checkBiometricAvailability();
  }, []);

  const handleOnChangeText = (name, value) => setData({ ...data, [name]: value });

  const thereIsAnError = () => Object.keys(errors).find((key) => data[key] === '');

  const fillErrors = (updatedErrors) =>
    Object.keys(errors).forEach((key) => {
      if (data[key] === '') updatedErrors[key] = 'Campo obligatorio';
    });

  const handleSubmitPress = async () => {
    const updatedErrors = cloneDeep(initialData);

    if (thereIsAnError()) {
      fillErrors(updatedErrors);
      setErrors(updatedErrors);
      return;
    }

    setLoading(true);
    try {
      const response = await fetchUserByEmail(data.email);
      const json = await response.json();
      if (json.message.is_admin) {
        Alert.alert('admins cant login to the app');
        setLoading(false);
        return;
      }
      await signInWithEmailAndPassword(auth, data.email, data.password);
    } catch (error) {
      Alert.alert('Error', error.message);
    }
    setLoading(false);
  };

  const handleRegister = () => {
    navigation.navigate(texts.Register.name);
  };

  const handleForgotPassword = () => {
    navigation.navigate(texts.ForgotPassword.name);
  };

  const handleGmailLogin = async () => {
    // Get the users ID token
    await GoogleSignin.signOut();
    const user = await GoogleSignin.signIn();
    setLoading(true);
    const response = await fetchUserByEmail(user.user.email);
    const json = await response.json();
    if (json.message == null) {
      setLoading(false);
      navigation.navigate(texts.FederatedRegister.name);
      return;
    }
    if (json.message.is_federated) {
      const googleCredential = GoogleAuthProvider.credential(user.idToken);
      // Sign-in the user with the credential
      await signInWithCredential(auth, googleCredential);
    } else {
      Alert.alert('Ese email ya tiene una cuenta asociada');
    }
    setLoading(false);
  };

  const fields = [
    {
      key: EMAIL_KEY,
      field: (
        <TextField
          error={errors.email}
          keyboardType={emailFieldType}
          name="email"
          onChangeText={handleOnChangeText}
          placeholder={fieldTexts.emailPlaceholder}
          title={fieldTexts.emailTitle}
        />
      )
    },
    {
      key: PASSWORD_KEY,
      field: (
        <TextField
          error={errors.password}
          keyboardType={passwordFieldType}
          name="password"
          onChangeText={handleOnChangeText}
          placeholder={fieldTexts.passwordPlaceholder}
          title={fieldTexts.passwordTitle}
        />
      )
    }
  ];

  return (
    <Login
      fields={fields}
      handleForgotPassword={() => handleForgotPassword()}
      handleGmailLogin={handleGmailLogin}
      handleRegister={() => handleRegister()}
      handleSubmitPress={handleSubmitPress}
      loading={loading}
    />
  );
}

LoginContainer.propTypes = {
  navigation: shape({
    navigate: func.isRequired
  }).isRequired
};
