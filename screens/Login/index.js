import { Alert } from 'react-native';
import { func, shape } from 'prop-types';
import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';

import TextField from '../../components/Fields/TextField';
import {
  emailFieldType,
  passwordFieldType
} from '../../components/Fields/constants';
import { auth } from '../../firebaseConfig';
import texts from '../../texts';

import Login from './layout';

const fieldTexts = texts.Fields;

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

  const handleOnEmailChange = (userMail) => setEmail(userMail);
  const handleOnPasswordChange = (userPassword) => setPassword(userPassword);

  const fields = [
    <TextField
      error={mailError}
      keyboardType={emailFieldType}
      onChangeText={handleOnEmailChange}
      placeholder={fieldTexts.emailPlaceholder}
      title={fieldTexts.emailTitle}
    />,
    <TextField
      error={passwordError}
      keyboardType={passwordFieldType}
      onChangeText={handleOnPasswordChange}
      placeholder={fieldTexts.passwordPlaceholder}
      title={fieldTexts.passwordTitle}
    />
  ];

  return (
    <Login
      fields={fields}
      handleForgotPassword={() => handleForgotPassword()}
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
