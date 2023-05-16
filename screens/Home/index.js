import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { func, shape } from 'prop-types';
import { signOut } from 'firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

import { auth } from '../../firebaseConfig';
import { useStateValue } from '../../utils/state/state';
import texts from '../../texts';
import { fetchUserGoalsByUsername } from '../../requests';

import Home from './layout';

export default function HomeScreen({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [state, dispatch] = useStateValue();
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    setLoading(true);
    async function fetchData() {
      const response = await fetchUserGoalsByUsername(state.user.username);
      const json = await response.json();
      console.log('b', json.message);

      // Ordeno las goals del usuario según su deadline
      const sortedGoals = json.message
        .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
        .filter((goal) => goal.status === 'in_progress');
      const now = new Date();

      // de las más cercanas a expirar, muestro 3
      const closestGoals = sortedGoals.filter((goal, index) => index < 3 || new Date(goal.deadline) < now);
      console.log('bb', closestGoals);

      setGoals(closestGoals);
      setLoading(false);
    }
    fetchData();
  }, []);

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
  const handleTrainerHome = () => {
    dispatch({
      type: 'changeCurrentStack',
      newScreen: false
    });
  };
  return (
    <Home
      goals={goals}
      username={state.user.username}
      handleSignOutPress={handleSignOutPress}
      handleTrainerHome={handleTrainerHome}
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
