import React, { useState } from 'react';
import { Alert } from 'react-native';
import { func, shape } from 'prop-types';
import { signOut } from 'firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

import { auth } from '../../firebaseConfig';
import { useStateValue } from '../../utils/state/state';
import texts from '../../texts';

import Home from './layout';

export default function HomeScreen({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [state, dispatch] = useStateValue();

  const handleSignOutPress = async () => {
    setLoading(true);
    try {
      // Si la sesion actual es de un usuario federado hay que salir de su cuenta de google

      if (auth.currentUser.providerData[0].providerId === 'google.com') {
        await GoogleSignin.revokeAccess();
      }
      await signOut(auth);
    } catch (error) {
      console.log(error);
      setLoading(false);
      return;
    }
    Alert.alert('Log out', 'Saliste correctamente');
    setLoading(false);
  };

  const handleProfile = () => {
    navigation.navigate(texts.UserProfile.name);
  };

  const handleSearchUsers = () => {
    navigation.navigate(texts.SearchUsers.name);
  };

  return (
    <Home
      username={state.user.username}
      handleSignOutPress={handleSignOutPress}
      handleProfile={() => handleProfile()}
      handleSearchUsers={() => handleSearchUsers(navigation)}
      loading={loading}
    />
  );
}

HomeScreen.propTypes = {
  navigation: shape({
    navigate: func.isRequired
  }).isRequired
};
