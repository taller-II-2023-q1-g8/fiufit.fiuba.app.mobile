import React, { useEffect, useState } from 'react';
import { func, shape } from 'prop-types';

import texts from '../../texts';

import { deletePlan } from '../../requests';

import TrainerPlanView from './layout';

export default function TrainerPlanViewContainer({ route, navigation }) {
  const [plan, setData] = useState(route.params.itemData);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);

  const handleShowStatsPress = () => {
    navigation.navigate(texts.PlanStats.name, { plan });
  };

  const handleShowExercisesPress = () => {
    navigation.navigate(texts.PlanExercises.name, { plan });
  };

  const handleEditPress = () => {
    navigation.navigate(texts.EditPlan.name, { plan });
  };

  const handleDeletePress = () => {
    deletePlan(plan.id);
    navigation.navigate(texts.deletePlan.name);
  };

  return (
    <TrainerPlanView
      plan={plan}
      loading={loading}
      handleShowStatsPress={handleShowStatsPress}
      handleShowExercisesPress={handleShowExercisesPress}
      handleEditPress={handleEditPress}
      handleDeletePress={handleDeletePress}
    />
  );
}

TrainerPlanViewContainer.propTypes = {
  route: shape({
    params: shape.isRequired
  }).isRequired,
  navigation: shape({
    navigate: func.isRequired
  }).isRequired
};
