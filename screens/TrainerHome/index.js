import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';

import { useStateValue } from '../../utils/state/state';
import { fetchUsersByUsername } from '../../requests';

import TrainerHome from './layout';

export default function TrainerHomeScreen() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [state, dispatch] = useStateValue();
  useEffect(() => {
    async function fetchData() {
      // Deberiamos hacer un fetch de los training plans del trainer.
      setData([
        { title: 'Plan de la Fiuba', difficulty: 'EASY' },
        { title: 'Road To Ingeniero', difficulty: 'MEDIUM' },
        { title: 'Duro como final de AM3', difficulty: 'HARD' },
        { title: 'Fuerte como el café del comedor', difficulty: 'MEDIUM' }
      ]);
      setLoading(false);
    }
    fetchData();
  }, []);
  const handleItemPress = (planTitle) => {
    console.log(planTitle);
  };
  const handleTrainerHome = () => {
    dispatch({
      type: 'changeCurrentStack',
      newScreen: true
    });
  };
  return (
    <TrainerHome
      username={state.user.username}
      handleTrainerHome={handleTrainerHome}
      data={data}
      handleItemPress={handleItemPress}
      loading={loading}
    />
  );
}
