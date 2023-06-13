import React, { useEffect, useState } from 'react';
import { shape, func } from 'prop-types';

import texts from '../../texts';
import { useStateValue } from '../../state';
import AthleteTrainingPlan from './layout';
import {
  likePlan,
  removePlanToAthleteAsFavorite,
  createMetricRequest,
  calificatePlan
} from '../../requests.js';

export default function AthleteTrainingPlanScreen({ route, navigation }) {
  const { plan, athleteID } = route.params;
  const [state, dispatch] = useStateValue();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  const handlePressLike = () => {
    likePlan(plan.id, athleteID);
  };

  const handlePressCalificate = (calificationScore, calification) => {
    const values = {};
    values.calification = calification;
    values.calification_score = calificationScore;
    calificatePlan(plan.id, athleteID, values);
  };

  const handlePressRemove = () => {
    removePlanToAthleteAsFavorite(plan.id, athleteID);
    navigation.navigate(texts.UserProfile.name);
  };

  const handlePressCompleteExercise = (exercise) => {
    const date = new Date();
    const values = {};
    values.type = 'exercise_set_completed';
    values.username = state.user.username;
    values.created_at = date.toISOString();
    values.exercise_title = exercise.title;
    values.reps = exercise.reps;
    values.weight_in_kg = exercise.weight;
    createMetricRequest(values);
  };

  const handlePressCompletePlan = () => {
    const date = new Date();
    const values = {};
    values.type = 'training_plan_completed';
    values.username = state.user.username;
    values.created_at = date.toISOString();
    values.plan_title = plan.title;
    createMetricRequest(values);
    plan.exercises.forEach((exercise) => {
      handlePressCompleteExercise(exercise);
    });
  };

  const handle = (exercise) => {
    console.log(exercise);
  };

  return (
    <AthleteTrainingPlan
      plan={plan}
      loading={loading}
      handle={handle}
      handlePressLike={handlePressLike}
      handlePressCalificate={handlePressCalificate}
      handlePressRemove={handlePressRemove}
      handlePressCompletePlan={handlePressCompletePlan}
      handlePressCompleteExercise={handlePressCompleteExercise}
    />
  );
}

AthleteTrainingPlanScreen.propTypes = {
  route: shape({
    params: shape.isRequired
  }).isRequired,
  navigation: shape({
    navigate: func.isRequired
  }).isRequired
};
