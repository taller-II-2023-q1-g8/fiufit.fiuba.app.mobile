import React from 'react';
import { Text, View, ScrollView, TouchableOpacity, ImageBackground } from 'react-native';
import { array, object, func } from 'prop-types';

import { colors } from '../../colors';
import BackgroundImage from '../../assets/Background.jpg';
import { styles } from '../Home/styles';
import Ionicons from 'react-native-vector-icons/Ionicons';

function MaxWeightLiftedInExercise({ goal, handleDeleteGoal }) {
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
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={{ fontWeight: 'bold', padding: 5, paddingTop: 0, color: colors.gray }}>
          Máximo Peso Levantado en {goal.exercise_title}
        </Text>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => handleDeleteGoal(goal._id)}
          style={{ marginRight: 25 }}
        >
          <Ionicons
            name="trash"
            style={{ width: 30, height: 30, tintColor: colors.white }}
            size={25}
            color={colors.white}
          />
        </TouchableOpacity>
      </View>
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

function TotalStepsTaken({ goal, handleDeleteGoal }) {
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
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={{ fontWeight: 'bold', padding: 5, paddingTop: 0, color: colors.gray }}>
          Total de Pasos Dados
        </Text>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => handleDeleteGoal(goal._id)}
          style={{ marginRight: 25 }}
        >
          <Ionicons
            name="trash"
            style={{ width: 30, height: 30, tintColor: colors.white }}
            size={25}
            color={colors.white}
          />
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={{ paddingBottom: 5, paddingLeft: 5, color: colors.white }}>
          Objetivo: {goal.goal_num_of_completions}
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

function TrainingPlanCompletion({ goal, handleDeleteGoal }) {
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
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={{ fontWeight: 'bold', padding: 5, paddingTop: 0, color: colors.gray }}>
          Planes de Entrenamiento Completados
        </Text>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => handleDeleteGoal(goal._id)}
          style={{ marginRight: 25 }}
        >
          <Ionicons
            name="trash"
            style={{ width: 30, height: 30, tintColor: colors.white }}
            size={25}
            color={colors.white}
          />
        </TouchableOpacity>
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={{ paddingBottom: 5, paddingLeft: 5, color: colors.white }}>
          Objetivo: {goal.goal_num_of_completions}
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

function TotalDistanceTravelled({ goal, handleDeleteGoal }) {
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
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={{ fontWeight: 'bold', padding: 5, paddingTop: 0, color: colors.gray }}>
          Distancia Recorrida
        </Text>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => handleDeleteGoal(goal._id)}
          style={{ marginRight: 25 }}
        >
          <Ionicons
            name="trash"
            style={{ width: 30, height: 30, tintColor: colors.white }}
            size={25}
            color={colors.white}
          />
        </TouchableOpacity>
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={{ paddingBottom: 5, paddingLeft: 5, color: colors.white }}>
          Objetivo: {goal.goal_num_of_completions}
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

export function Goal({ goal, handleDeleteGoal }) {
  switch (goal.type) {
    case 'max_weight_lifted_in_exercise':
      return MaxWeightLiftedInExercise({ goal, handleDeleteGoal });
    case 'training_plan_completion':
      return TrainingPlanCompletion({ goal, handleDeleteGoal });
    case 'total_steps_taken':
      return TotalStepsTaken({ goal, handleDeleteGoal });
    case 'total_distance_travelled':
      return TotalDistanceTravelled({ goal, handleDeleteGoal });
    default:
      return null;
  }
}

export function PersonalGoals({ goals, handleAddGoal, handleDeleteGoal }) {
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
          {goals.length === 0 ? null : goals.map((goal) => Goal({ goal, handleDeleteGoal }))}
        </ScrollView>
      </View>
    </ImageBackground>
  );
}

PersonalGoals.propTypes = {
  goals: array.isRequired,
  handleAddGoal: func.isRequired,
  handleDeleteGoal: func.isRequired
};

TrainingPlanCompletion.propTypes = {
  goal: object.isRequired,
  handleDeleteGoal: func.isRequired
};

MaxWeightLiftedInExercise.propTypes = {
  goal: object.isRequired,
  handleDeleteGoal: func.isRequired
};

TotalDistanceTravelled.propTypes = {
  goal: object.isRequired,
  handleDeleteGoal: func.isRequired
};

TotalStepsTaken.propTypes = {
  goal: object.isRequired,
  handleDeleteGoal: func.isRequired
};
