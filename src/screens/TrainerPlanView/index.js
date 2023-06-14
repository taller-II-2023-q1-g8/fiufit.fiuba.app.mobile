import React, { useEffect, useState } from 'react';
import { func, shape } from 'prop-types';

import texts from '../../texts';
import { deletePlan } from '../../requests';

import TrainerPlanView from './layout';
import { useStateValue } from '../../state';

export default function TrainerPlanViewContainer({ route, navigation }) {
  const [plan, setData] = useState(route.params.itemData);
  const [state, dispatch] = useStateValue();
  console.log(plan);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);

  const handleShowStatsPress = () => {
    navigation.navigate(texts.PlanStats.name, { plan });
  };

  const handleShowExercisesPress = () => {
    console.log(plan);
    navigation.navigate(texts.PlanExercises.name, { plan });
  };

  const handleEditPress = () => {
    navigation.navigate(texts.EditPlan.name, { plan });
  };

  const handleDeletePress = () => {
    const newPlanData = [...state.plansData];
    const prevIndex = state.plansData.findIndex((pl) => pl.id === plan.id);
    newPlanData.splice(prevIndex, 1);
    console.log(newPlanData);
    dispatch({
      type: 'updatePlansData',
      plansData: newPlanData
    });
    navigation.navigate(texts.TrainerHome.name);
    deletePlan(plan.id);
  };
  const handleAthletePress = (athlete) => {
    const { username } = athlete;
    navigation.navigate(texts.SearchedProfile.name, { username });
  };

  return (
    <TrainerPlanView
      plan={plan}
      loading={loading}
      handleShowStatsPress={handleShowStatsPress}
      handleShowExercisesPress={handleShowExercisesPress}
      handleEditPress={handleEditPress}
      handleDeletePress={handleDeletePress}
      handleAthletePress={handleAthletePress}
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
