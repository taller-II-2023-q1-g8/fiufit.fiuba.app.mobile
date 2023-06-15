import React, { useEffect, useState } from 'react';
import { shape, func } from 'prop-types';

import {
  fetchFollowedUsersByUsername,
  fetchFollowerUsersByUsername,
  fetchUserProfileByUsername,
  fetchAthletePlansByID,
  fetchAthletesID,
  fetchCompletedPlanMetricsByUsername
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
      const completedPlansResponse = await fetchCompletedPlanMetricsByUsername(state.user.username);
      const completedPlans = await completedPlansResponse.json();
      console.log(completedPlans);
      const now = new Date();
      const oneWeekInMs = 7 * 24 * 60 * 60 * 1000;
      const labelAux = [0, 1, 2, 3, 4, 5, 6];
      const label = [];
      labelAux.forEach((l) => {
        const b = new Date(Date.now() - 24 * 60 * 60 * 1000 * l);
        label.push(b.toISOString().split('T')[0]);
      });
      label.reverse();
      const trainingCount = [0, 0, 0, 0, 0, 0, 0];
      completedPlans.message.forEach((completedPlan) => {
        if (now - new Date(completedPlan.created_at) < oneWeekInMs) {
          const b = new Date(completedPlan.created_at).toISOString().split('T')[0];
          const dia = label.findIndex((l) => l === b);
          trainingCount[dia] += 1;
        }
      });

      const dataChart = {
        labels: label.map((l) => l.slice(6)),
        datasets: [
          {
            data: trainingCount,
            color: (opacity = 1) => `rgba(255, 175, 26, ${opacity})`, // optional
            strokeWidth: 2 // optional
          }
        ],
        legend: ['Cantidad de entrenamientos'] // optional
      };
      console.log(dataChart);
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
        plans: p,
        dataChart
      });
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
