import { Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { bool } from 'prop-types';

import manPic from '../../assets/man.jpeg';
import { colors } from '../../colors';
import TrainerIcon from '../../assets/personal-trainer.png';
import Loader from '../../components/Loader';

import { styles } from './styles';

function Exercises({ exercises }) {
  exercises_to_show = [];
  for (const exercise of exercises) {
    exercises_to_show.push(
      <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <Text style={{ fontWeight: 'bold' }}>{exercise.muscle.toUpperCase()} | </Text>
        <Text style={{ width: '80%' }}>{exercise.title}</Text>
      </View>
    );
  }
  return exercises_to_show;
}

function foo() {
  a = 2;
}

export default function SearchedTrainingPlan({ data }) {
  return Object.keys(data).length !== 0 ? (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image style={styles.profilePicture} source={manPic} />
        <View>
          <Text style={styles.username}>{data.title}</Text>
          <View style={{ display: 'flex', flexDirection: 'row', marginVertical: 10 }}>
            <View style={{ marginRight: 30 }}>
              <Text style={{ color: colors.gray }}>Dificultad</Text>
              <Text style={{ fontWeight: 'bold' }}>{data.difficulty}</Text>
            </View>
          </View>
          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            {/* <Image style={{ width: 20, height: 20 }} source={TrainerIcon} /> */}
            <Text style={{ width: '80%' }}>{data.description}</Text>
          </View>
          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', paddingVertical: 10 }}>
            <Image style={{ width: 20, height: 20 }} source={TrainerIcon} />
            <Text style={{ paddingHorizontal: 5 }}>{data.trainer}</Text>
          </View>
        </View>
      </View>
      <Text style={styles.title}>Ejercicios</Text>
      <Exercises exercises={data.exercises} />
      <View style={{ paddingVertical: 10 }}>
        <TouchableOpacity style={styles.startButton} activeOpacity={0.5} onPress={foo}>
          <Text style={styles.startButtonText}>Empezar!</Text>
        </TouchableOpacity>
      </View>
    </View>
  ) : (
    <Loader loading={data.length === 0} />
  );
}

SearchedTrainingPlan.propTypes = {
  data: bool
};
