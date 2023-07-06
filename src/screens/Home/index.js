import React, { useEffect, useState } from 'react';
import { func, shape } from 'prop-types';
import { signOut } from 'firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import messaging from '@react-native-firebase/messaging';
import { Alert } from 'react-native';

import {
  updateDeviceToken,
  fetchPlans,
  updateLoginTime,
  fetchCompletedPlanMetricsByUsername
} from '../../requests';
import { auth } from '../../../firebaseConfig';
import { useStateValue } from '../../state';
import texts from '../../texts';
import { getRandomInt } from '../../utils';

import Home from './layout';

export default function HomeScreen({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [state, dispatch] = useStateValue();
  const [goals, setGoals] = useState(state.userGoals);
  const [suggestedPlans, setSuggestedPlans] = useState([]);
  const [lastPlans, setLastPlans] = useState([]);

  useEffect(() => {
    messaging()
      .getToken()
      .then((token) => {
        updateDeviceToken(state.user.username, token);
      });
    updateLoginTime(state.user.username);
  }, []);
  useEffect(() => {
    const fetchLastPlans = async () => {
      const response = await fetchPlans('');
      const plans = await response.json();
      const completedPlansResponse = await fetchCompletedPlanMetricsByUsername(state.user.username);
      const completedPlans = await completedPlansResponse.json();
      const aux = completedPlans.message;
      aux.sort((plan1, plan2) => new Date(plan2.created_at) - new Date(plan1.created_at));
      const unique = [];
      const aux2 = [];
      aux.forEach((plan) => {
        if (!unique.includes(plan.plan_title)) {
          unique.push(plan.plan_title);
          aux2.push(plan);
        }
      });
      aux2.splice(3);
      const lastPlansItems = [];
      aux2.forEach((plan) => {
        const planData = plans.find((data) => data.title === plan.plan_title);
        if (planData !== undefined) {
          lastPlansItems.push({
            type: 'training_plan_completed',
            title: plan.plan_title,
            plan: planData,
            difficulty: planData.difficulty,
            tags: planData.tags,
            id: planData.id,
            date: plan.created_at
          });
        }
      });
      setLastPlans(lastPlansItems);
    };
    if (!loading) {
      const g = state.userGoals;
      setGoals(g);
      fetchLastPlans();
    }
  }, [state.userGoals]);

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
    async function fetchSuggestedPlans() {
      const response = await fetchPlans('');
      const plans = await response.json();
      plans.forEach((plan) => {
        plan.averageCalification = avgCalification(plan);
      });
      plans.sort((plan1, plan2) => plan2.averageCalification - plan1.averageCalification);
      console.log('Intereses', state.user.interests);
      if (state.user.interests !== null && state.user.interests.length > 0) {
        const plansInterests = plans.filter((plan) => {
          if (state.user.interests.some((v) => plan.tags.includes(v))) {
            return true;
          }
          return false;
        });
        plansInterests.forEach((plan) => console.log(plan.title, plan.tags));
        if (plansInterests.length < 1) {
          const numberOfSuggestedPlans = getRandomInt(3, 4);
          setSuggestedPlans(plans.slice(0, numberOfSuggestedPlans));
        } else {
          const numberOfSuggestedPlans = getRandomInt(3, 4);
          setSuggestedPlans(plansInterests.slice(0, numberOfSuggestedPlans));
        }
      } else {
        const numberOfSuggestedPlans = getRandomInt(3, 4);
        setSuggestedPlans(plans.slice(0, numberOfSuggestedPlans));
      }
    }
    if (!loading) {
      fetchSuggestedPlans();
    }
  }, [state.user.interests]);
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const response = await fetchPlans('');
      const plans = await response.json();
      const completedPlansResponse = await fetchCompletedPlanMetricsByUsername(state.user.username);
      const completedPlans = await completedPlansResponse.json();
      const aux = completedPlans.message;
      aux.sort((plan1, plan2) => new Date(plan2.created_at) - new Date(plan1.created_at));
      const unique = [];
      const aux2 = [];
      aux.forEach((plan) => {
        if (!unique.includes(plan.plan_title)) {
          unique.push(plan.plan_title);
          aux2.push(plan);
        }
      });
      aux2.splice(3);
      const lastPlansItems = [];
      aux2.forEach((plan) => {
        const planData = plans.find((data) => data.title === plan.plan_title);
        if (planData !== undefined) {
          lastPlansItems.push({
            type: 'training_plan_completed',
            title: plan.plan_title,
            plan: planData,
            difficulty: planData.difficulty,
            tags: planData.tags,
            id: planData.id,
            date: plan.created_at
          });
        }
      });
      setLastPlans(lastPlansItems);
      // setSuggestedPlans que dependa tambien de tus intereses
      plans.forEach((plan) => {
        plan.averageCalification = avgCalification(plan);
      });
      plans.sort((plan1, plan2) => plan2.averageCalification - plan1.averageCalification);
      console.log('Intereses', state.user.interests);
      if (state.user.interests !== null && state.user.interests.length > 0) {
        const plansInterests = plans.filter((plan) => {
          if (state.user.interests.some((v) => plan.tags.includes(v))) {
            return true;
          }
          return false;
        });
        plansInterests.forEach((plan) => console.log(plan.title, plan.tags));
        const numberOfSuggestedPlans = getRandomInt(3, 4);
        setSuggestedPlans(plansInterests.slice(0, numberOfSuggestedPlans));
      } else {
        const numberOfSuggestedPlans = getRandomInt(3, 4);
        setSuggestedPlans(plans.slice(0, numberOfSuggestedPlans));
      }
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
    if (plan.blocked === 'true') {
      Alert.alert(texts.BlockedPlan.alert);
    } else {
      navigation.navigate(texts.SearchedTrainingPlan.name, { plan });
    }
  };

  return (
    <Home
      suggestedPlans={suggestedPlans}
      lastPlans={lastPlans}
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
