import React from 'react';
import { Text, View, ScrollView, TouchableOpacity, ImageBackground } from 'react-native';
import { array, object, func } from 'prop-types';

import { colors } from '../../colors';
import BackgroundImage from '../../assets/Background.jpg';
import { styles } from '../Home/styles';

function MaxWeightLiftedInExercise({ goal }) {
  const completionPercentage = goal.completion_percentage;
  let barColor;
  let goalStatus;

  switch (goal.status) {
    case 'in_progress':
      goalStatus = 'En Progreso';
      barColor = 'orange';
      break;
    case 'completed':
      goalStatus = 'Completada';
      barColor = 'green';
      break;
    default:
      goalStatus = 'Fallida';
      barColor = 'red';
      break;
  }

  const deadline = new Date(goal.deadline);
  const deadlineStr = deadline.toLocaleDateString('es-ES', deadline);

  return (
    <View
      style={{
        borderWidth: 1,
        borderColor: colors.soft_red,
        backgroundColor: colors.feed_items,
        padding: 10,
        borderRadius: 20,
        marginBottom: 10
      }}
    >
      <Text style={{ fontWeight: 'bold', padding: 5, paddingTop: 0, color: colors.gray }}>
        Máximo Peso Levantado en {goal.exercise_title}
      </Text>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={{ paddingBottom: 5, paddingLeft: 5, color: colors.white }}>
          Objetivo: {goal.goal_weight_in_kg}KG
        </Text>
        <Text style={{ paddingBottom: 5, paddingRight: 5, color: colors.gray }}>Vencimiento</Text>
      </View>
      <View style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ paddingBottom: 5, paddingLeft: 5, color: colors.white }}>{goalStatus}</Text>
          <Text style={{ paddingBottom: 5, paddingRight: 5, color: colors.white }}>{deadlineStr}</Text>
        </View>
        <View style={{ backgroundColor: '#e8e8e8', width: '100%', height: 10, borderRadius: 4 }}>
          <View
            style={{
              backgroundColor: barColor,
              width: `${completionPercentage}%`,
              height: 10,
              borderRadius: 4
            }}
          />
        </View>
      </View>
    </View>
  );
}

function TrainingPlanCompletion({ goal }) {
  const completionPercentage = goal.completion_percentage;
  let barColor;
  let goalStatus;

  switch (goal.status) {
    case 'in_progress':
      goalStatus = 'En Progreso';
      barColor = 'orange';
      break;
    case 'completed':
      goalStatus = 'Completada';
      barColor = 'green';
      break;
    default:
      goalStatus = 'Fallida';
      barColor = 'red';
      break;
  }

  return (
    <View
      style={{
        borderWidth: 1,
        borderColor: colors.soft_red,
        backgroundColor: colors.feed_items,
        padding: 10,
        borderRadius: 20,
        marginBottom: 10
      }}
    >
      <Text style={{ fontWeight: 'bold', padding: 5, paddingTop: 0, color: colors.gray }}>
        Planes de Entrenamiento Completados
      </Text>
      <Text style={{ paddingBottom: 5, paddingLeft: 5, color: colors.white }}>
        Objetivo: {goal.goal_num_of_completions}
      </Text>
      <View style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
        <Text style={{ paddingBottom: 5, paddingLeft: 5, color: colors.white }}>{goalStatus}</Text>
        <View style={{ backgroundColor: '#e8e8e8', width: '100%', height: 10, borderRadius: 4 }}>
          <View
            style={{
              backgroundColor: barColor,
              width: `${completionPercentage}%`,
              height: 10,
              borderRadius: 4
            }}
          />
        </View>
      </View>
    </View>
  );
}

export function Goal({ goal }) {
  switch (goal.type) {
    case 'max_weight_lifted_in_exercise':
      return MaxWeightLiftedInExercise({ goal });
    case 'training_plan_completion':
      return TrainingPlanCompletion({ goal });
    default:
      return null;
  }
}

export function PersonalGoals({ goals, handleAddGoal }) {
  return (
    <ImageBackground source={BackgroundImage} resizeMode="cover">
      <View style={styles.container}>
        <ScrollView>
          <View style={{ padding: 10, alignItems: 'center', flexDirection: 'row', paddingBottom: 20 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 20, paddingHorizontal: 10, color: colors.white }}>
              Tus Metas
            </Text>
            <TouchableOpacity
              style={{
                fontWeight: 'bold',
                fontSize: 20,
                paddingHorizontal: 10,
                backgroundColor: colors.main,
                borderRadius: 10
              }}
              onPress={handleAddGoal}
            >
              <Text style={{ color: colors.white, padding: 3 }}>Agregar</Text>
            </TouchableOpacity>
          </View>
          {goals.length === 0 ? null : goals.map((goal) => Goal({ goal }))}
        </ScrollView>
      </View>
    </ImageBackground>
  );
}

PersonalGoals.propTypes = {
  goals: array.isRequired,
  handleAddGoal: func.isRequired
};

TrainingPlanCompletion.propTypes = {
  goal: object.isRequired
};

MaxWeightLiftedInExercise.propTypes = {
  goal: object.isRequired
};
