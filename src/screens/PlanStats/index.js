import React, { useEffect, useState } from 'react';
import { shape, func } from 'prop-types';

import texts from '../../texts';

import {
  fetchExercises,
  AddExcerciseToPlanRequest,
  fetchPlanExercises,
  removeExerciseFromPlan
} from '../../requests';

import PlanStats from './layout';

export default function PlanStatsScreen({ route, navigation }) {
  const { plan } = route.params;

  const handleAthletePress = (athlete) => {
    const { username } = athlete;
    navigation.navigate(texts.SearchedProfile.name, { username });
  };

  return <PlanStats plan={plan} handleAthletePress={handleAthletePress} />;
}

PlanStatsScreen.propTypes = {
  route: shape({
    params: shape.isRequired
  }).isRequired,
  navigation: shape({
    navigate: func.isRequired
  }).isRequired
};
