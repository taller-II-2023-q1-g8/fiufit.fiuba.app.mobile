import React, { useEffect, useState } from 'react';
import { shape, func } from 'prop-types';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { signOut } from 'firebase/auth';
import * as TaskManager from 'expo-task-manager';
import * as Location from 'expo-location';
import { Alert } from 'react-native';

import {
  fetchFollowedUsersByUsername,
  fetchFollowerUsersByUsername,
  fetchUserProfileByUsername,
  fetchAthletePlansByID,
  fetchAthletesID,
  fetchUserGoalsByUsername
} from '../../requests';
import { useStateValue } from '../../state';
import texts from '../../texts';
import { getProfilePicURL } from '../../utils';
import { auth } from '../../../firebaseConfig';

import UserProfile from './layout';

const LOCATION_TRACKING = 'location-tracking';

export default function UserProfileContainer({ navigation }) {
  const [data, setData] = useState({});
  const [state, dispatch] = useStateValue();
  const [profPicUrl, setProfPicUrl] = useState(null);
  const [profPicLoading, setProfPicLoading] = useState(true);
  const [loading, setLoading] = useState(true);
  const [athleteID, setAthleteID] = useState(null);

  const fetchProfPicUrl = async () => {
    const url = await getProfilePicURL(state.user.username);
    setProfPicUrl(url);
    setProfPicLoading(false);
  };

  useEffect(() => {
    fetchProfPicUrl();
  }, []);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const userResponse = await fetchUserProfileByUsername(state.user.username);
      const userJson = await userResponse.json();
      const followersResponse = await fetchFollowerUsersByUsername(state.user.username);
      const followersJson = await followersResponse.json();
      const AthletesResponse = await fetchAthletesID();
      const athletesJson = await AthletesResponse.json();
      const foundAthlete = await athletesJson.find((athlete) => athlete.external_id === state.user.username);
      setAthleteID(foundAthlete.id);
      const plansResponse = await fetchAthletePlansByID(foundAthlete.id);
      const plansJson = await plansResponse.json();
      const p = [];
      plansJson.forEach((plan) => {
        const a = plan.athletes.find((ath) => ath.id === foundAthlete.id);
        if (a.is_liked) {
          p.push(plan);
        }
      });

      setData({
        ...userJson.message,
        followers: followersJson.message.length,
        followed: state.followedUsers.length,
        plans: p
      });
      setLoading(false);
    }
    fetchData();
  }, []);

  const handleAddStat = () => navigation.navigate(texts.PersonalGoalsStack.name);
  const handleEditProfile = () => navigation.navigate(texts.EditUserProfile.name);
  const handlePlanPress = (plan) => {
    if (plan.blocked === 'true') {
      Alert.alert(texts.BlockedPlan.alert);
    } else {
      navigation.navigate(texts.SearchedTrainingPlan.name, { plan });
    }
  };

  const handleTrainerHome = () => {
    dispatch({
      type: 'changeCurrentStack',
      athleteScreen: false
    });
  };

  const handleSignOutPress = async () => {
    setLoading(true);
    try {
      // Si la sesion actual es de un usuario federado hay que salir de su cuenta de google

      if (auth.currentUser.providerData[0].providerId === 'google.com') {
        await GoogleSignin.revokeAccess();
      }
      const stopLocation = () => {
        TaskManager.isTaskRegisteredAsync(LOCATION_TRACKING).then((tracking) => {
          if (tracking) {
            Location.stopLocationUpdatesAsync(LOCATION_TRACKING);
          }
        });
      };
      stopLocation();
      await signOut(auth);
    } catch (error) {
      setLoading(false);
      return;
    }
    setLoading(false);
  };

  return (
    <UserProfile
      data={data}
      handleEditProfile={handleEditProfile}
      profPicUrl={profPicUrl}
      loading={loading || profPicLoading}
      handleAddStat={handleAddStat}
      handlePlanPress={handlePlanPress}
      handleTrainerHome={handleTrainerHome}
      handleSignOutPress={handleSignOutPress}
    />
  );
}

UserProfileContainer.propTypes = {
  navigation: shape({
    navigate: func.isRequired
  }).isRequired
};
