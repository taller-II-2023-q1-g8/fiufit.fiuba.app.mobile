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
  const [athleteID, setAthleteID] = useState(null);

  const fetchProfPicUrl = async () => {
    const url = await getProfilePicURL(state.user.username);
    setProfPicUrl(url);
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
      console.log('JUANPEPE ', data.plans);
      setLoading(false);
    }
    fetchData();
  }, []);

  const handleAddStat = () => navigation.navigate(texts.PersonalGoalsStack.name);
  const handleEditProfile = () => navigation.navigate(texts.EditUserProfile.name);
  const handlePlanPress = (plan) => navigation.navigate(texts.SearchedTrainingPlan.name, { plan });

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
