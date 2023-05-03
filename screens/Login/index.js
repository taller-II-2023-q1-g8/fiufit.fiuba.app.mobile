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
import { fetchUserByEmail } from '../../requests';

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
    const user = await GoogleSignin.signIn();
    // Hacer un get al back con el email a ver si existe el user
    // Si existe preguntarle que quiere hacer?
    // Agregar al back de users columna de federado
    setLoading(true);
    const response = await fetchUserByEmail(user.user.email);
    const json = await response.json();
    // En vez de true seria: json.message.esFederado
    if (json.message == null || true) {
      // No existe el email en el backend o ya ingreso alguna vez con gmail
      // Create a Google credential with the token
      const googleCredential = GoogleAuthProvider.credential(user.idToken);
      // Sign-in the user with the credential
      const userSignIn = signInWithCredential(auth, googleCredential);
      userSignIn
        .then((userCred) => {
          console.log(userCred);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      // Intenta ingresar con un email ya asociado a una cuenta con contrasenia
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
