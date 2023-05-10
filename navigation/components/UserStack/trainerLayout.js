import { bool, object, func } from 'prop-types';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';

import { colors } from '../../../colors';
import { StateProvider, useStateValue } from '../../../utils/state/state';
import TrainerHomeScreen from '../../../screens/TrainerHome';
import texts from '../../../texts';

export default function TrainerStack({ tabBarIcons }) {
  const [state, dispatch] = useStateValue();
  return state.athleteScreen ? null : <TrainerHomeScreen />;
}

TrainerStack.propTypes = {
  tabBarIcons: func.isRequired
};
