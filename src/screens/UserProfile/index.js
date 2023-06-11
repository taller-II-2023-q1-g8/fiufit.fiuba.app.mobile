import React, { useEffect, useState } from 'react';
import { shape, func } from 'prop-types';

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

import UserProfile from './layout';

export default function UserProfileContainer({ navigation }) {
  const [data, setData] = useState({});
  const [state] = useStateValue();
  const [profPicUrl, setProfPicUrl] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProfPicUrl = async () => {
    const url = await getProfilePicURL(state.user.username);
    setProfPicUrl(url);
    setLoading(false);
  };

  useEffect(() => {
    fetchProfPicUrl();
  }, []);

  useEffect(() => {
    async function fetchData() {
      const userResponse = await fetchUserProfileByUsername(state.user.username);
      const userJson = await userResponse.json();
      const followersResponse = await fetchFollowerUsersByUsername(state.user.username);
      const followersJson = await followersResponse.json();
      const followedResponse = await fetchFollowedUsersByUsername(state.user.username);
      const followedJson = await followedResponse.json();

      const AthletesResponse = await fetchAthletesID();
      const athletesJson = await AthletesResponse.json();
      const athleteID = (await athletesJson.find((athlete) => athlete.external_id === state.user.username))
        .id;
      const plansResponse = await fetchAthletePlansByID(athleteID);
      const plansJson = await plansResponse.json();

      setData({
        ...userJson.message,
        followers: followersJson.message.length,
        followed: followedJson.message.length,
        plans: plansJson
      });
    }
    fetchData();
  }, []);

  const handleAddStat = () => navigation.navigate(texts.PersonalGoalsStack.name);
  const handleEditProfile = () => navigation.navigate(texts.EditUserProfile.name);
  const handlePlanPress = (plan) => navigation.navigate(texts.AthleteTrainingPlan.name, { plan });

  return (
    <UserProfile
      data={data}
      handleEditProfile={handleEditProfile}
      profPicUrl={profPicUrl}
      loading={loading}
      handleAddStat={handleAddStat}
      handlePlanPress={handlePlanPress}
    />
  );
}

UserProfileContainer.propTypes = {
  navigation: shape({
    navigate: func.isRequired
  }).isRequired
};
