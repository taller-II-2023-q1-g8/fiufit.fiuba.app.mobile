import React, { useEffect, useState } from 'react';
import { View, Text, ImageBackground, Image, TouchableOpacity } from 'react-native';
import { shape, func } from 'prop-types';

import BackgroundImage from '../../assets/Background.jpg';
import manPic from '../../assets/man.jpeg';
import { colors } from '../../colors';
import texts from '../../texts';
import { createMetricRequest } from '../../requests';
import { useStateValue } from '../../state';

import { styles } from './styles';

export default function ExerciseScreen({ navigation, route }) {
  const [index, setIndex] = useState(0);
  console.log(route.params.plan.exercises);
  const { exercises } = route.params.plan;
  const current = exercises[index];
  const [state, dispatch] = useStateValue();
  console.log(route);
  const handleCompleteExercise = (exercise) => {
    const values = {};
    values.type = 'exercise_set_completed';
    values.username = state.user.username;
    const currentDate = new Date();
    const currentDatetimeISO = currentDate.toISOString();
    values.created_at = currentDatetimeISO;
    values.exercise_title = exercise.title;
    values.reps = exercise.reps;
    values.weight_in_kg = exercise.weight;
    createMetricRequest(values);
  };
  const handleCompletePlan = () => {
    const values = {};
    values.type = 'training_plan_completed';
    values.username = state.user.username;
    const currentDate = new Date();
    const currentDatetimeISO = currentDate.toISOString();
    values.created_at = currentDatetimeISO;
    values.plan_title = route.params.plan.title;
    createMetricRequest(values);
  };
  return (
    <ImageBackground source={BackgroundImage}>
      <View style={styles.container}>
        <Image style={{ width: '100%', height: 200 }} source={manPic} />

        <Text
          style={{
            marginLeft: 'auto',
            marginRight: 'auto',
            marginTop: 30,
            fontSize: 30,
            fontWeight: 'bold',
            color: colors.white
          }}
        >
          {current.title}
        </Text>

        <Text
          style={{
            marginLeft: 'auto',
            marginRight: 'auto',
            marginTop: 30,
            fontSize: 38,
            fontWeight: 'bold',
            color: colors.white
          }}
        >
          x{current.reps}
        </Text>
        <Text
          style={{
            marginLeft: 'auto',
            marginRight: 'auto',
            marginTop: 30,
            fontSize: 14,
            fontWeight: 'bold',
            color: colors.white
          }}
        >
          weight: {current.weight} kg
        </Text>
        {index + 1 >= exercises.length ? (
          <TouchableOpacity
            onPress={() => {
              handleCompleteExercise(current);
              handleCompletePlan();
              navigation.navigate(texts.Rating.name, {
                plan: route.params.plan,
                athleteId: route.params.athleteId,
                pop: 2,
                athleteRating: route.params.athleteRating
              });
            }}
            style={{
              backgroundColor: colors.main_soft,
              marginLeft: 'auto',
              marginRight: 'auto',
              marginTop: 30,
              borderRadius: 20,
              padding: 10,
              width: 150
            }}
          >
            <Text
              style={{
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: 20,
                color: 'white'
              }}
            >
              Terminar
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(texts.Rest.name);
              handleCompleteExercise(current);
              setTimeout(() => {
                setIndex(index + 1);
              }, 500);
            }}
            style={{
              backgroundColor: colors.main_soft,
              marginLeft: 'auto',
              marginRight: 'auto',
              marginTop: 30,
              borderRadius: 20,
              padding: 10,
              width: 150
            }}
          >
            <Text
              style={{
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: 20,
                color: 'white'
              }}
            >
              Siguiente
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </ImageBackground>
  );
}

ExerciseScreen.propTypes = {
  route: shape({
    params: shape.isRequired
  }).isRequired,
  navigation: shape({
    navigate: func.isRequired
  }).isRequired
};
