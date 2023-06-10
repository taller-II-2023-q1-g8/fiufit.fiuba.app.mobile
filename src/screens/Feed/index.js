import { func, shape } from 'prop-types';
import React, { useState, useEffect } from 'react';

import { useStateValue } from '../../state';
import texts from '../../texts';
import { fetchCompletedPlanMetricsByUsername, fetchPlansByTrainerID, fetchTrainersID } from '../../requests';

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
          console.log(createdPlans);
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
  const [loading, setLoading] = useState(false);
  const [state] = useStateValue();
  const [feed, setFeed] = useState([]);

  useEffect(() => {
    setLoading(true);
    async function fetchData() {
      // Get de los planes para cada usuario que seguís para mostrar información relevante en el feed.
      const { followedUsers } = state;
      // Get de los trainers para ver que followers son trainers a su vez
      const trainersResponse = await fetchTrainersID();
      const trainersJson = await trainersResponse.json();
      console.log(trainersJson);
      try {
        const completedPlansForEachFollower = await getCompletedPlansForEachFollower(followedUsers);
        console.log(
          'planes completados por user seguido: ',
          JSON.stringify(completedPlansForEachFollower, null, 2)
        );
        const createdPlansForEachFollower = await getCreatedPlansForEachFollower(followedUsers, trainersJson);
        console.log(
          'planes creados por user seguido: ',
          JSON.stringify(createdPlansForEachFollower, null, 2)
        );

        const now = new Date();
        const oneWeekInMs = 7 * 24 * 60 * 60 * 1000;
        const feedItems = [];
        completedPlansForEachFollower.forEach((u) => {
          u.completedPlanMetrics.message.forEach((completedPlan) => {
            if (now - new Date(completedPlan.created_at) < oneWeekInMs) {
              feedItems.push({
                type: 'training_plan_completed',
                username: u.username,
                title: completedPlan.plan_title,
                date: new Date(completedPlan.created_at)
              });
            }
          });
        });
        /*
        createdPlansForEachFollower.forEach((u) => {
          u.createdPlans.forEach((createdPlan) => {
            if (now - new Date(createdPlan.created_at) < oneWeekInMs) {
              console.log(createdPlan);
              feedItems.push({
                type: 'createdPlan',
                username: u.username,
                title: createdPlan.title,
                date: new Date(createdPlan.created_at)
              });
            }
          });
        });
        */
        setFeed(feedItems);
      } catch (error) {
        console.log('Error consiguiendo los planes completados para cada usuario seguido:', error);
      }

      setLoading(false);
    }
    fetchData();
  }, []);

  const handleUserProfilePress = (username) => {
    navigation.navigate(texts.SearchedProfile.name, { username });
  };

  const [refreshingUsers, setRefreshingUsers] = useState(false);
  const onRefreshUsers = React.useCallback(async () => {
    setRefreshingUsers(true);
    // Fetch data
    setRefreshingUsers(false);
  }, []);

  feed.sort((a, b) => b.date - a.date);
  return (
    <Feed
      loading={loading}
      feed={feed}
      refreshing={refreshingUsers}
      onRefresh={onRefreshUsers}
      handleUserProfilePress={handleUserProfilePress}
    />
  );
}

FeedScreen.propTypes = {
  navigation: shape({
    navigate: func.isRequired
  }).isRequired
};
