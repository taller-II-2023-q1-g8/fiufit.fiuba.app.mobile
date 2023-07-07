import { func, shape } from 'prop-types';
import React, { useEffect, useState } from 'react';

import { fetchAllUsers, fetchFollowerUsersByUsername, fetchPlans, fetchTrainersID } from '../../requests';
import { useStateValue } from '../../state';
import texts from '../../texts';

import FollowInfo from './layout';
import { useFocusEffect } from '@react-navigation/native';
import { processFetchedPlans } from '../../utils';
import ErrorView from '../ErrorScreen';

export default function FollowersScreen({ navigation }) {
  const [state] = useStateValue();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'Tus seguidos' },
    { key: 'second', title: 'Tus seguidores' }
  ]);
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(false);
  // Focus effect?
  useFocusEffect(
    React.useCallback(() => {
      async function fetchData() {
        // setLoading(true);
        try {
          setErr(false);
          console.log('fetching');
          const followersResponse = await fetchFollowerUsersByUsername(state.user.username);
          const followersJson = await followersResponse.json();
          const trainersResponse = await fetchTrainersID();
          const trainersJson = await trainersResponse.json();
          // Get de usuarios no traiga admins
          const followers = followersJson.message
            .filter((username) => username !== state.user.username)
            .map((username) => ({
              username,
              role: trainersJson.find((trainer) => trainer.external_id === username) ? 'Trainer' : 'Athlete'
            }));
          const followed = state.followedUsers
            .filter((username) => username !== state.user.username)
            .map((username) => ({
              username,
              role: trainersJson.find((trainer) => trainer.external_id === username) ? 'Trainer' : 'Athlete'
            }));
          setData({
            followers,
            followed
          });

          setLoading(false);
        } catch (error) {
          console.log(error);
          setErr(true);
        }
      }
      fetchData();
      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, [])
  );
  const nothing = (username) => {
    navigation.navigate(texts.SearchedProfile.name, { username });
  };

  return (
    <>
      <ErrorView err={err} />
      {!err && (
        <FollowInfo
          loading={loading}
          index={index}
          routes={routes}
          setIndex={setIndex}
          data={data}
          handleItemPress={nothing}
        />
      )}
    </>
  );
}

FollowersScreen.propTypes = {
  navigation: shape({
    navigate: func.isRequired
  }).isRequired
};
