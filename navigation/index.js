import React, {useEffect, useState} from 'react';
import {firebaseObserver, loggedIn} from '../utils/hooks/useAuthentication';
import {View, Text} from 'react-native'
import UserStack from './userStack';
import AuthStack from './authStack';
import {auth} from "../firebaseConfig";

export default function RootNavigation() {

    const [authenticated, setAuthenticated] = useState(loggedIn());
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        firebaseObserver.subscribe('authStateChanged', data => {
            setAuthenticated(data);
            setIsLoading(false);
        });
        return () => { firebaseObserver.unsubscribe('authStateChanged'); }
    }, []);
    /*Esto es porque para que firebase vea si el user esta autenticado o no
    * Tarda unos segundos y si el usuario esta logeado muestra la pantalla de login de todas formas
    * Hasta que termina de cargar firebase, mostramos un texto de loading(Cambiar en el futuro)*/
    return isLoading ? <View><Text> Loading... </Text></View>:
        authenticated ? <UserStack email={auth.currentUser.email} token={auth.currentUser.getIdToken()}/> :
            <AuthStack />;
}