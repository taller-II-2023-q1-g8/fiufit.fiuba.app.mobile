import { func, shape } from 'prop-types';
import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';

import { useStateValue } from '../../state';
import texts from '../../texts';
import {
  fetchCompletedPlanMetricsByUsername,
  fetchPlans,
  fetchPlansByTrainerID,
  fetchTrainersID
} from '../../requests';

import Feed from './layout';

function getCompletedPlansForEachFollower(followedUsers) {
  return Promise.all(
    followedUsers.map(async (followedUser) => {
      try {
        const completedPlansResponse = await fetchCompletedPlanMetricsByUsername(followedUser);
        const completedPlans = await completedPlansResponse.json();
        return { username: followedUser, completedPlanMetrics: completedPlans };
      } catch (error) {
        console.log(`Error fetching plans for ${followedUser}:`, error);
        return { username: followedUser, completedPlanMetrics: null };
      }
    })
  ).then((results) => results.filter((result) => result !== null));
}
function getCreatedPlansForEachFollower(followedUsers, trainersList) {
  return Promise.all(
    followedUsers.map(async (followedUser) => {
      const id = trainersList.find((trainer) => trainer.external_id === followedUser);
      if (id !== undefined) {
        try {
          const idMessage = {
            trainer_id: id.id
          };
          const createdPlansResponse = await fetchPlansByTrainerID(idMessage);
          const createdPlans = await createdPlansResponse.json();
          return { username: followedUser, createdPlans };
        } catch (error) {
          console.log(`Error fetching plans for ${followedUser}:`, error);
          return { username: followedUser, createdPlans: null };
        }
      }
    })
  ).then((results) => results.filter((result) => result !== null));
}
export default function FeedScreen({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [state] = useStateValue();
  const [feed, setFeed] = useState([]);
  const [refreshingUsers, setRefreshingUsers] = useState(false);
  const fetchData = async () => {
    // Get de los planes para cada usuario que seguís para mostrar información relevante en el feed.
    const { followedUsers } = state;
    // Get de los trainers para ver que followers son trainers a su vez
    setLoading(true);
    const trainersResponse = await fetchTrainersID();
    const trainersJson = await trainersResponse.json();
    const plansResponse = await fetchPlans();
    const plansJson = await plansResponse.json();
    try {
      const completedPlansForEachFollower = await getCompletedPlansForEachFollower(followedUsers);
      /*
      console.log(
        'planes completados por user seguido: ',
        JSON.stringify(completedPlansForEachFollower, null, 2)
      );
      */
      const createdPlansForEachFollower = await getCreatedPlansForEachFollower(followedUsers, trainersJson);
      console.log('planes creados por user seguido: ', JSON.stringify(createdPlansForEachFollower, null, 2));

      const now = new Date();
      const oneWeekInMs = 7 * 24 * 60 * 60 * 1000;
      const feedItems = [];
      completedPlansForEachFollower.forEach((u) => {
        u.completedPlanMetrics.message.forEach((completedPlan) => {
          if (now - new Date(completedPlan.created_at) < oneWeekInMs) {
            const a = plansJson.find((plan) => plan.title === completedPlan.plan_title);
            if (a !== undefined) {
              feedItems.push({
                type: 'training_plan_completed',
                username: u.username,
                title: completedPlan.plan_title,
                plan: a,
                difficulty: a.difficulty,
                tags: a.tags,
                id: a.id,
                date: new Date(completedPlan.created_at)
              });
            }
          }
        });
      });
      createdPlansForEachFollower.forEach((u) => {
        if (u !== undefined) {
          console.log(u);
          u.createdPlans.forEach((createdPlan) => {
            if (now - new Date(createdPlan.created_at) < oneWeekInMs) {
              console.log(createdPlan);
              feedItems.push({
                type: 'created_plan',
                username: u.username,
                title: createdPlan.title,
                difficulty: createdPlan.difficulty,
                plan: createdPlan,
                tags: createdPlan.tags,
                id: createdPlan.id,
                date: new Date(createdPlan.created_at)
              });
            }
          });
        }
      });
      setFeed(feedItems);
      setLoading(false);
    } catch (error) {
      console.log('Error consiguiendo los planes completados para cada usuario seguido:', error);

      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchData();
    setLoading(false);
  }, []);
  const onRefreshUsers = React.useCallback(async () => {
    setRefreshingUsers(true);
    setRefreshingUsers(false);
    fetchData();
  }, [state]);
  const handleUserProfilePress = (username) => {
    navigation.navigate(texts.SearchedProfile.name, { username });
  };
  const handlePlanPress = (plan) => {
    if (plan.blocked === 'true') {
      Alert.alert(texts.BlockedPlan.alert);
    } else {
      navigation.navigate(texts.SearchedTrainingPlan.name, { plan });
    }
  };

  feed.sort((a, b) => b.date - a.date);
  return (
    <Feed
      loading={loading}
      feed={feed}
      refreshing={refreshingUsers}
      onRefresh={onRefreshUsers}
      handleUserProfilePress={handleUserProfilePress}
      handlePlanPress={handlePlanPress}
    />
  );
}

FeedScreen.propTypes = {
  navigation: shape({
    navigate: func.isRequired
  }).isRequired
};
