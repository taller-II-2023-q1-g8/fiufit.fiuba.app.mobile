import React, { useEffect, useState } from 'react';
import { shape, func } from 'prop-types';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { signOut } from 'firebase/auth';

import {
  fetchFollowedUsersByUsername,
  fetchFollowerUsersByUsername,
  fetchUserProfileByUsername,
  fetchAthletePlansByID,
  fetchAthletesID
} from '../../requests';
import { useStateValue } from '../../state';
import texts from '../../texts';
import { getProfilePicURL } from '../../utils';
import { auth } from '../../../firebaseConfig';

import TrainerProfile from './layout';

export default function TrainerProfileContainer({ navigation }) {
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
      const plansResponse = await fetchAthletePlansByID(athleteID);
      const plansJson = await plansResponse.json();

      setData({
        ...userJson.message,
        followers: followersJson.message.length,
        followed: state.followedUsers.length,
        plans: plansJson
      });
      setLoading(false);
    }
    fetchData();
  }, []);

  const handleAddStat = () => navigation.navigate(texts.PersonalGoalsStack.name);
  const handleEditProfile = () => navigation.navigate(texts.EditTrainerProfile.name);
  const handlePlanPress = (plan) => navigation.navigate(texts.SearchedTrainingPlan.name, { plan });

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

  const handleTrainerHome = () => {
    dispatch({
      type: 'changeCurrentStack',
      athleteScreen: true
    });
  };

  return (
    <TrainerProfile
      data={data}
      handleEditProfile={handleEditProfile}
      profPicUrl={profPicUrl}
      loading={loading || profPicLoading}
      handleAddStat={handleAddStat}
      handlePlanPress={handlePlanPress}
      handleSignOutPress={handleSignOutPress}
      handleTrainerHome={handleTrainerHome}
    />
  );
}

TrainerProfileContainer.propTypes = {
  navigation: shape({
    navigate: func.isRequired
  }).isRequired
};
