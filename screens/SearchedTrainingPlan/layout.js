import { Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { func, number, object, string } from 'prop-types';

import manPic from '../../assets/man.jpeg';
import { colors } from '../../colors';
import TrainerIcon from '../../assets/personal-trainer.png';

import { styles } from './styles';

function Exercises({ exercises }) {
  return exercises.map((exercise, index) => (
    <View key={exercise.title} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
      {/* <Text style={{ fontWeight: 'bold' }}>{exercise.muscles.toUpperCase()} | </Text> */}
      <Text style={{ width: '80%' }}>
        {index + 1} | {exercise.title.toUpperCase()}
      </Text>
    </View>
  ));
}

export default function SearchedTrainingPlan({
  title,
  description,
  difficulty,
  trainer,
  exercises,
  handleStartTraining
}) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image style={styles.profilePicture} source={manPic} />
        <View>
          <Text style={styles.username}>{title}</Text>
          <View style={{ display: 'flex', flexDirection: 'row', marginVertical: 10 }}>
            <View style={{ marginRight: 30 }}>
              <Text style={{ color: colors.gray }}>Dificultad</Text>
              <Text style={{ fontWeight: 'bold' }}>{difficulty}</Text>
            </View>
          </View>
          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            {/* <Image style={{ width: 20, height: 20 }} source={TrainerIcon} /> */}
            <Text style={{ width: '80%' }}>{description}</Text>
          </View>
          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', paddingVertical: 10 }}>
            <Image style={{ width: 20, height: 20 }} source={TrainerIcon} />
            <Text style={{ paddingHorizontal: 5 }}>Trainer ID: {trainer}</Text>
          </View>
        </View>
      </View>
      <Text style={styles.title}>Ejercicios</Text>
      <Exercises exercises={exercises} />
      <View style={{ paddingVertical: 10 }}>
        <TouchableOpacity style={styles.startButton} activeOpacity={0.5} onPress={handleStartTraining}>
          <Text style={styles.startButtonText}>Empezar!</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

SearchedTrainingPlan.propTypes = {
  handleStartTraining: func.isRequired,
  title: string.isRequired,
  description: string.isRequired,
  difficulty: string.isRequired,
  trainer: number.isRequired,
  exercises: object.isRequired
};
