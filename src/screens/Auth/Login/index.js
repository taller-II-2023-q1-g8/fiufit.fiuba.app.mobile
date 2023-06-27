import { Alert } from 'react-native';
import { cloneDeep } from 'lodash';
import { func, shape } from 'prop-types';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { signInWithEmailAndPassword, signInWithCredential, GoogleAuthProvider } from 'firebase/auth';
import messaging from '@react-native-firebase/messaging';
import React, { useEffect, useState } from 'react';
import * as TaskManager from 'expo-task-manager';
import * as Location from 'expo-location';

import { auth } from '../../../../firebaseConfig';
import { fetchUserByEmail } from '../../../requests';
import { useStateValue } from '../../../state';
import texts from '../../../texts';

import { getFields } from './utils';
import Login from './layout';

const LOCATION_TRACKING = 'location-tracking';

GoogleSignin.configure({
  webClientId: '587864716594-rieevghh6j6gi2m10lhb835u4ndn0631.apps.googleusercontent.com',
  offlineAccess: true
});

export default function LoginContainer({ navigation }) {
  const [loading, setLoading] = useState(false);
  const initialData = { email: '', password: '' };
  const [data, setData] = useState(initialData);
  const [errors, setErrors] = useState(initialData);
  const [, dispatch] = useStateValue();

  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }
  useEffect(() => {
    dispatch({ type: 'resetValues' });
    if (requestUserPermission()) {
      messaging()
        .getToken()
        .then((token) => {
          console.log('Token: ', token);
        });
    }
  }, []);
  useEffect(() => {
    const stopLocation = () => {
      TaskManager.isTaskRegisteredAsync(LOCATION_TRACKING).then((tracking) => {
        if (tracking) {
          Location.stopLocationUpdatesAsync(LOCATION_TRACKING);
        }
      });
    };
    stopLocation();
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

  const fields = getFields(handleOnChangeText, errors);

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
