import { Alert } from 'react-native';
import { func, shape } from 'prop-types';
import { signInWithEmailAndPassword, signInWithCredential, GoogleAuthProvider } from 'firebase/auth';
import React, { useState } from 'react';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { cloneDeep } from 'lodash';

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
import { useStateValue } from '../../../state';

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
  const [state, dispatch] = useStateValue();

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
      dispatch({ type: 'logIn', automaticallyLogged: 'false' });
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
      dispatch({ type: 'logIn', automaticallyLogged: 'false' });
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
