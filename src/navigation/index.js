import React, { useEffect, useState } from 'react';

import { auth } from '../../firebaseConfig';
import { firebaseObserver, loggedIn } from '../utils/hooks/useAuthentication';
import Loader from '../components/Loader';

import AuthStack from './components/AuthStack';
import UserStack from './components/UserStack';

export default function RootNavigation() {
  const [authenticated, setAuthenticated] = useState(loggedIn());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    firebaseObserver.subscribe('authStateChanged', (data) => {
      setAuthenticated(data);
      setIsLoading(false);
    });
    return () => {
      firebaseObserver.unsubscribe('authStateChanged');
    };
  }, []);

  const { currentUser } = auth;

  const Stack = authenticated ? (
    <UserStack email={currentUser.email} token={currentUser.getIdToken()} />
  ) : (
    <AuthStack />
  );

  /* Esto es porque para que firebase vea si el user esta autenticado o no
   * Tarda unos segundos y si el usuario esta logeado muestra la pantalla de login de todas formas
   * Hasta que termina de cargar firebase, mostramos un texto de loading(Cambiar en el futuro) */
  return (
    <>
      <Loader loading={isLoading} />
      {Stack}
    </>
  );
}
