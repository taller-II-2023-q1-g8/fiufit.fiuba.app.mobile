import React, { useEffect, useState } from 'react';
import * as LocalAuthentication from 'expo-local-authentication';
import { View, Text } from 'react-native';

import { auth } from '../../firebaseConfig';
import { firebaseObserver, loggedIn } from '../utils/hooks/useAuthentication';
import { useStateValue } from '../state';
import Loader from '../components/Loader';

import AuthStack from './components/AuthStack';
import UserStack from './components/UserStack';

export default function RootNavigation() {
  const [authenticated, setAuthenticated] = useState(loggedIn());
  const [isLoading, setIsLoading] = useState(true);
  const { currentUser } = auth;
  const [isBiometricAuthenticated, setIsBiometricAuthenticated] = useState(false);
  const [state] = useStateValue();

  const handleBiometricAuth = async () => {
    try {
      const hasBiometricAuth = await LocalAuthentication.hasHardwareAsync();
      if (!hasBiometricAuth) return;

      const isEnrolled = await LocalAuthentication.isEnrolledAsync();
      if (!isEnrolled) return;

      const result = await LocalAuthentication.authenticateAsync();
      if (result.success) {
        setIsBiometricAuthenticated(true);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    firebaseObserver.subscribe('authStateChanged', (data) => {
      setAuthenticated(data);
    });

    return () => {
      firebaseObserver.unsubscribe('authStateChanged');
    };
  }, []);

  useEffect(() => {
    const showBiometricVerification = authenticated && state.automaticallyLogged;
    if (showBiometricVerification === true) handleBiometricAuth();
    else setIsLoading(false);
  }, [authenticated]);

  const shouldAuth = () =>
    (authenticated && state.automaticallyLogged === true && !isBiometricAuthenticated) || !authenticated;

  /* Esto es porque para que firebase vea si el user esta autenticado o no
   * Tarda unos segundos y si el usuario esta logeado muestra la pantalla de login de todas formas
   * Hasta que termina de cargar firebase, mostramos un texto de loading(Cambiar en el futuro) */
  return (
    <>
      <Loader loading={isLoading} />
      {!isLoading &&
        (shouldAuth() ? (
          <AuthStack />
        ) : (
          <UserStack email={currentUser.email} token={currentUser.getIdToken()} />
        ))}
    </>
  );
}
