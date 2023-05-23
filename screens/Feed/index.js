import React, { useState, useEffect } from 'react';
import { func, shape } from 'prop-types';

import { useStateValue } from '../../utils/state/state';
import texts from '../../texts';
import { fetchCompletedPlanMetricsByUsername } from '../../requests';

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

export default function FeedScreen({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [state, dispatch] = useStateValue();
  const [following, setFollowing] = useState(state.following);
  const [feed, setFeed] = useState([]);

  useEffect(() => {
    setLoading(true);
    async function fetchData() {
      // Get de los planes para cada usuario que seguís para mostrar información relevante en el feed.
      const { followedUsers } = state;

      console.log('followedUsers', JSON.stringify(followedUsers, null, 2));

      try {
        const completedPlansForEachFollower = await getCompletedPlansForEachFollower(followedUsers);
        console.log(
          'planes completados por user seguido: ',
          JSON.stringify(completedPlansForEachFollower, null, 2)
        );

        const now = new Date();
        const oneWeekInMs = 7 * 24 * 60 * 60 * 1000;
        const completedPlansFeedItems = [];
        completedPlansForEachFollower.forEach((u) => {
          u.completedPlanMetrics.message.forEach((completedPlan) => {
            if (now - new Date(completedPlan.created_at) < oneWeekInMs) {
              completedPlansFeedItems.push({
                type: 'training_plan_completed',
                username: u.username,
                title: completedPlan.plan_title,
                completionDate: completedPlan.created_at
              });
            }
          });
        });

        console.log('guuuu', JSON.stringify(completedPlansFeedItems, null, 2));
        setFeed(completedPlansFeedItems);
      } catch (error) {
        console.log('Error consiguiendo los planes completados para cada usuario seguido:', error);
      }

      setLoading(false);
    }
    fetchData();
  }, []);
  const [refreshingUsers, setRefreshingUsers] = useState(false);
  const onRefreshUsers = React.useCallback(async () => {
    setRefreshingUsers(true);
    // Fetch data
    console.log('abc');
    setRefreshingUsers(false);
  }, []);

  return <Feed loading={loading} feed={feed} refreshing={refreshingUsers} onRefresh={onRefreshUsers} />;
}

FeedScreen.propTypes = {
  navigation: shape({
    navigate: func.isRequired
  }).isRequired
};
