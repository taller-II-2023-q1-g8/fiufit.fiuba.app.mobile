import React, { useEffect, useState } from 'react';
import { func, shape } from 'prop-types';
import { signOut } from 'firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import messaging from '@react-native-firebase/messaging';

import { updateDeviceToken } from '../../requests';
import { auth } from '../../../firebaseConfig';
import { useStateValue } from '../../state';
import texts from '../../texts';
import { fetchPlans } from '../../requests';
import { getRandomInt } from '../../utils';

import Home from './layout';

export default function HomeScreen({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [state, dispatch] = useStateValue();
  const [goals, setGoals] = useState(state.userGoals);

  useEffect(() => {
    messaging()
      .getToken()
      .then((token) => {
        updateDeviceToken(state.user.username, token);
      });
  }, []);
  const [suggestedPlans, setSuggestedPlans] = useState([]);

  function avgCalification(plan) {
    const { athletes } = plan;
    if (athletes.length === 0) return -1;
    const validCalificationsAths = athletes.filter((athlete) => athlete.calification_score >= 0);
    if (validCalificationsAths.length === 0) return -1;
    return (
      validCalificationsAths.reduce((suma, athlete) => suma + athlete.calification_score, 0) /
      validCalificationsAths.length
    );
  }

  useEffect(() => {
    async function getSuggestedPlans() {
      setLoading(true);
      const response = await fetchPlans('');
      const plans = await response.json();
      console.log('a', plans);
      console.log('b', JSON.stringify(plans, null, 2));

      plans.forEach((plan) => {
        plan.averageCalification = avgCalification(plan);
      });
      plans.sort((plan1, plan2) => plan2.averageCalification - plan1.averageCalification);
      console.log('wwwww', JSON.stringify(plans, null, 2));
      const numberOfSuggestedPlans = getRandomInt(3, 4);
      console.log('ww', numberOfSuggestedPlans);
      console.log(plans.slice(0, numberOfSuggestedPlans));
      setSuggestedPlans(plans.slice(0, numberOfSuggestedPlans));
      setLoading(false);
    }
    getSuggestedPlans();
  }, []);
  /*
  useEffect(() => {
    setLoading(true);
    async function fetchData() {
      // const response = await fetchUserGoalsByUsername(state.user.username);
      // const json = await response.json();
      // console.log('b', json.message);

      // Ordeno las goals del usuario según su deadline
      const sortedGoals = goals
        .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
        .filter((goal) => goal.status === 'in_progress');
      const now = new Date();

      // de las más cercanas a expirar, muestro 3
      const closestGoals = sortedGoals.filter((goal, index) => index < 3 || new Date(goal.deadline) < now);

      setGoals(closestGoals);
      setLoading(false);
    }
    fetchData();
  }, []);
  */

  const handleSignOutPress = async () => {
    setLoading(true);
    try {
      // Si la sesion actual es de un usuario federado hay que salir de su cuenta de google

      if (auth.currentUser.providerData[0].providerId === 'google.com') {
        await GoogleSignin.revokeAccess();
      }
      await signOut(auth);
    } catch (error) {
      setLoading(false);
      return;
    }
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
      athleteScreen: false
    });
  };

  const handlePlanPress = (plan) => {
    navigation.navigate(texts.SearchedTrainingPlan.name, { plan });
  };

  console.log('suggested', JSON.stringify(suggestedPlans, null, 2));
  return (
    <Home
      suggestedPlans={suggestedPlans}
      goals={goals}
      username={state.user.username}
      handleSignOutPress={handleSignOutPress}
      handleTrainerHome={handleTrainerHome}
      handleProfile={() => handleProfile()}
      handleSearchUsers={() => handleSearchUsers}
      handlePlanPress={handlePlanPress}
      loading={loading}
    />
  );
}

HomeScreen.propTypes = {
  navigation: shape({
    navigate: func.isRequired
  }).isRequired
};
