import React, { useState, useEffect } from 'react';
import { func, shape } from 'prop-types';

import { useStateValue } from '../../utils/state/state';
import texts from '../../texts';
import { fetchPlansByTrainerID, fetchTrainersID } from '../../requests';

import Feed from './layout';

function getPlansForEachFollower(followedUsers, trainersJson) {
  return Promise.all(
    followedUsers.map(async (followedUser) => {
      try {
        const id = trainersJson.find((trainer) => trainer.external_id === followedUser);
        if (id === undefined) return { username: followedUser, trainer_id: null, plans: null };
        const idMessage = {
          trainer_id: id.id
        };
        const plansResponse = await fetchPlansByTrainerID(idMessage);
        const plans = await plansResponse.json();
        return { username: followedUser, trainer_id: idMessage.trainer_id, plans };
      } catch (error) {
        console.log(`Error fetching plans for ${followedUser}:`, error);
        return { username: followedUser, trainer_id: null, plans: null };
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
      // Get de training plan completed de la gente que seguis.

      const { followedUsers } = state;
      const trainers = await fetchTrainersID();
      const trainersJson = await trainers.json();

      console.log('sapa', followedUsers);
      console.log('pasa', trainersJson);

      try {
        const plansForEachFollower = await getPlansForEachFollower(followedUsers, trainersJson);
        console.log('planes por user seguido: ', JSON.stringify(plansForEachFollower, null, 2));
      } catch (error) {
        console.log('Error consiguiendo los planes para cada usuario seguido:', error);
      }

      // Si dio algun rating muy bueno a algun plan
      /* followedUsers.forEach((user) => {
        const fourOrBetterRatedPlansLastWeek =
      }) */

      setFeed([
        { type: 'training_finished', username: 'pepe', title: 'Plan de la Fiuba', difficulty: 'EASY' },
        { type: 'training_finished', username: 'pepe', title: 'Road To Ingeniero', difficulty: 'MEDIUM' },
        { type: 'training_finished', username: 'pepe', title: 'Duro como final de AM3', difficulty: 'HARD' },
        {
          type: 'training_finished',
          username: 'pepe',
          title: 'Fuerte como el café del comedor',
          difficulty: 'MEDIUM'
        }
      ]);

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
