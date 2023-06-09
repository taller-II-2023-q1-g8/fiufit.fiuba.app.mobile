import { Text, View, Image, TouchableOpacity, ImageBackground } from 'react-native';
import React from 'react';
import { func, number, object, string } from 'prop-types';

import manPic from '../../assets/man.jpeg';
import { colors } from '../../colors';
import TrainerIcon from '../../assets/personal-trainer.png';
import BackgroundImage from '../../assets/Background.jpg';

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
    <ImageBackground source={BackgroundImage}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image style={styles.profilePicture} source={manPic} />
          <View>
            <Text style={styles.username}>{title}</Text>
            <View style={{ display: 'flex', flexDirection: 'row', marginVertical: 10 }}>
              <View style={{ marginRight: 30, display: 'flex', flexDirection: 'row' }}>
                <Text style={{ color: colors.white }}>Dificultad</Text>
                <Text style={{ marginLeft: 20, fontWeight: 'bold', color: colors.white }}>{difficulty}</Text>
              </View>
            </View>
            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              {/* <Image style={{ width: 20, height: 20, tintColor: colors.white }} source={TrainerIcon} /> */}
              <Text style={{ width: '80%', color: colors.white }}>{description}</Text>
            </View>
            <View
              style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', paddingVertical: 10 }}
            >
              <Image style={{ width: 20, height: 20, tintColor: colors.white }} source={TrainerIcon} />
              <Text style={{ paddingHorizontal: 5, color: colors.white }}>Trainer: {trainer}</Text>
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
    </ImageBackground>
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
