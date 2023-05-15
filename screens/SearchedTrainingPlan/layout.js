import { Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { func, object, string } from 'prop-types';

import manPic from '../../assets/man.jpeg';
import { colors } from '../../colors';
import TrainerIcon from '../../assets/personal-trainer.png';

import { styles } from './styles';

function Exercises({ exercises }) {
  return exercises.map((exercise) => (
    <View key={exercise.title} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
      <Text style={{ fontWeight: 'bold' }}>{exercise.muscle.toUpperCase()} | </Text>
      <Text style={{ width: '80%' }}>{exercise.title}</Text>
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
  trainer: string.isRequired,
  exercises: object.isRequired
};
