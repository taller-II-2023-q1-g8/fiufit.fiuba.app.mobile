import { Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { array, bool } from 'prop-types';

import manPic from '../../assets/man.jpeg';
import { colors } from '../../colors';
import TrainerIcon from '../../assets/personal-trainer.png';
import Loader from '../../components/Loader';

import { styles } from './styles';

function Exercises({ exercises }) {
  console.log(exercises);
  return (
    <View>
      {exercises.map(({ muscle, title }) => (
        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ fontWeight: 'bold' }}>{muscle.toUpperCase()} | </Text>
          <Text style={{ width: '80%' }}>{title}</Text>
        </View>
      ))}
    </View>
  );
}

function foo() {
  console.log('a');
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
Exercises.propTypes = {
  exercises: array
};
SearchedTrainingPlan.propTypes = {
  data: bool
};
