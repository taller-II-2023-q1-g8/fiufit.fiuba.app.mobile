import React from 'react';
import { Text, View } from 'react-native';
import { array, object } from 'prop-types';

function MaxWeightLiftedInExercise({ goal }) {
  // const completionPercentage = goal.completion_percentage;
  const completionPercentage = 50;
  return (
    <View style={{ borderWidth: 1, borderColor: '#C1C7D0', backgroundColor: 'white' }}>
      <Text style={{ fontWeight: 'bold', padding: 5 }}>Máximo Peso Levantado en {goal.exercise_title}</Text>
      <Text style={{ paddingBottom: 5, paddingLeft: 5 }}>Objetivo: {goal.goal_weight_in_kg}KG</Text>
      <View style={{ backgroundColor: 'green', width: `${completionPercentage}%`, height: 10 }} />
    </View>
  );
}

function TrainingPlanCompletion({ goal }) {
  return (
    <View>
      <Text>{goal.type}</Text>
    </View>
  );
}

function Goal({ goal }) {
  switch (goal.type) {
    case 'max_weight_lifted_in_exercise':
      return MaxWeightLiftedInExercise({ goal });
    case 'training_plan_completion':
      return TrainingPlanCompletion({ goal });
    default:
      return null;
  }
}

export default function PersonalGoals({ goals }) {
  return (
    <View>
      <Text style={{ fontSize: 20 }}>Personal Goals</Text>
      {goals.map((goal) => Goal({ goal }))}
    </View>
  );
}

PersonalGoals.propTypes = {
  goals: array.isRequired
};

TrainingPlanCompletion.propTypes = {
  goal: object.isRequired
};

MaxWeightLiftedInExercise.propTypes = {
  goal: object.isRequired
};
