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
    const user = await GoogleSignin.signIn();
    console.log(user);
    setLoading(true);
    const response = await fetchUserByEmail(user.user.email);
    const json = await response.json();
    console.log(json);
    if (json.message == null || json.message.is_federated) {
      // No existe el email en el backend o ya ingreso alguna vez con gmail
      // Create a Google credential with the token
      const googleCredential = GoogleAuthProvider.credential(user.idToken);
      // Sign-in the user with the credential
      const userSignIn = signInWithCredential(auth, googleCredential);
      userSignIn
        .then(async (userCred) => {
          // Si el fetchUser da null, significa que entro con google x primera vez
          // Hay que registrarlo a mano, sacando los datos que sean posibles de google
          // Y los que no pedirle la info
          if (json.message == null) {
            /*
            const values = {
              username: user.user.email,
              firstname: user.user.givenName,
              gender: null,
              email: user.user.email,
              phone_number: null,
              lastname: user.user.familyName,
              birth_date: null,
              password: null,
              weight_in_kg: null,
              height_in_cm: null,
              is_federated: true
            };
            const r = await registerRequest(values);
            */
            console.log('Register');
          }
          console.log('Exito logeando con google');
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
