import React from 'react';
import { Text, View } from 'react-native';

import { useStateValue } from '../../utils/state/state';

import TrainerHome from './layout';

export default function TrainerHomeScreen() {
  const [state, dispatch] = useStateValue();
  const handleTrainerHome = () => {
    dispatch({
      type: 'changeCurrentStack',
      newScreen: true
    });
  };
  return <TrainerHome username={state.user.username} handleTrainerHome={handleTrainerHome} />;
}
