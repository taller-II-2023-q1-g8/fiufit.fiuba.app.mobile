/* eslint-disable no-underscore-dangle */
/* eslint-disable react/prop-types */
import { View, Text } from 'react-native';
import React from 'react';
import { Button } from 'react-native-paper';
import * as LocalAuthentication from 'expo-local-authentication';
import * as SecureStore from 'expo-secure-store';
// import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

function SignInWithBiometricButton(props) {
  // const { signIn } = useAuthUser();

  /*
  -- casos:
    *) el usuario ingresa por primera vez, si no existe ID
            ==> se crea y la envia al backend donde se guarda
    *) el usuario vuelve a ingresar, si existe ID
            ==> la envia al backend en el request.
                ==>si el backend dice Ok, entonces entrar
                ==>si el backend dice No Ok, ???

  */

  const setBiometricId = async () => {
    console.log('entra a setBiometricId');
    try {
      const biometricId = await SecureStore.getItemAsync('secure_biometricId');
      console.log('obtiene biometricId');
      console.log({ biometricId });
      if (!biometricId) {
        const uuid = uuidv4();
        await SecureStore.setItemAsync('secure_biometricId', JSON.stringify(uuid));
      }
    } catch (error) {
      console.error('Error SecureStore.getItemAsync:', error);
    }
  };

  const handleAuthWithBiometric = async () => {
    console.log('entra');
    const results = await LocalAuthentication.authenticateAsync();
    console.log('obtiene resultados');
    console.log({ results });
    if (results.success) {
      console.log('es un success');
      await setBiometricId();
    } else if (results.error === 'user_cancel') {
      console.log('es un user_cancel');
      return;
    } else {
      console.log(`Error en ingreso biométrico: ${results.error}`);
      alert('Error en ingreso biométrico.');
      return;
    }

    console.log('comienza a cargar');
    props.setIsLoading(true);

    const biometricId = await SecureStore.getItemAsync('secure_biometricId');

    console.log({ biometricId });
    // const { email, password } = utils.getBiometricalMailAndPassword(biometricId);

    // const hashedPassword = utils.getSHAOf(utils.getSHAOf(password));

    // const response = await signInWithEmailAndPassword(auth, email, hashedPassword).catch((err) => {
    //   if (err.message !== 'Firebase: Error (auth/user-not-found).') {
    //     alert(err.message);
    //   }
    //   props.setIsLoading(false);
    // });

    // if (response === undefined) {
    //   console.log('todo: sendCreateUserWithBiometricRequest');
    //   // sendCreateUserWithBiometricRequest(email, hashedPassword);
    // } else {
    //   console.log('todo: sendSignInUserWithBiometricRequest');
    //   // sendSignInUserWithBiometricRequest(email, hashedPassword, response);
    // }
  };

  return (
    <View>
      <Button
        icon="fingerprint"
        mode="contained"
        color="purple"
        style={{ marginBottom: 10, borderRadius: 20 }}
        onPress={handleAuthWithBiometric}
      >
        <Text>Ingresar con biometria</Text>
      </Button>
    </View>
  );
}

export default SignInWithBiometricButton;
