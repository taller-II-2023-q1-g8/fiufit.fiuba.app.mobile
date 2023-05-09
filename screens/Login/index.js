import { Alert } from 'react-native';
import { func, shape } from 'prop-types';
import { signInWithEmailAndPassword, signInWithCredential, GoogleAuthProvider } from 'firebase/auth';
import React, { useState } from 'react';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

import TextField from '../../components/Fields/TextField';
import {
  EMAIL_KEY,
  emailFieldType,
  PASSWORD_KEY,
  passwordFieldType
} from '../../components/Fields/constants';
import { auth } from '../../firebaseConfig';
import texts from '../../texts';
import { fetchUserByEmail, registerRequest } from '../../requests';

import Login from './layout';

const fieldTexts = texts.Fields;

GoogleSignin.configure({
  webClientId: '587864716594-rieevghh6j6gi2m10lhb835u4ndn0631.apps.googleusercontent.com',
  offlineAccess: true
});
export default function LoginContainer({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [mailError, setMailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmitPress = async () => {
    setMailError('');
    setPasswordError('');
    if (!email) {
      setMailError('Email obligatorio');
      return;
    }
    if (!password) {
      setPasswordError('Contraseña obligatoria');
      return;
    }
    setLoading(true);
    try {
      // Se deberia encriptar la password
      await signInWithEmailAndPassword(auth, email, password);
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
    console.log(json);
    if (json.message.is_federated) {
      const googleCredential = GoogleAuthProvider.credential(user.idToken);
      // Sign-in the user with the credential
      await signInWithCredential(auth, googleCredential);
    } else {
      Alert.alert('Ese email ya tiene una cuenta asociada');
    }
    setLoading(false);
  };
  const handleOnEmailChange = (userMail) => setEmail(userMail);
  const handleOnPasswordChange = (userPassword) => setPassword(userPassword);

  const fields = [
    {
      key: EMAIL_KEY,
      field: (
        <TextField
          error={mailError}
          keyboardType={emailFieldType}
          onChangeText={handleOnEmailChange}
          placeholder={fieldTexts.emailPlaceholder}
          title={fieldTexts.emailTitle}
        />
      )
    },
    {
      key: PASSWORD_KEY,
      field: (
        <TextField
          error={passwordError}
          keyboardType={passwordFieldType}
          onChangeText={handleOnPasswordChange}
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
      handleRegister={() => handleRegister()}
      handleSubmitPress={handleSubmitPress}
      handleGmailLogin={handleGmailLogin}
      loading={loading}
    />
  );
}

LoginContainer.propTypes = {
  navigation: shape({
    navigate: func.isRequired
  }).isRequired
};
