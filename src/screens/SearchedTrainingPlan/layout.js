import { Text, View, Image, TouchableOpacity, ImageBackground, FlatList } from 'react-native';
import React from 'react';
import { func, number, object, string, bool } from 'prop-types';
import Ionicons from 'react-native-vector-icons/Ionicons';

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

function Item({ exercise }) {
  exercise = exercise.item;
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={() => {}}>
      <View style={styles.item}>
        <Image style={styles.profilePic} source={manPic} />
        <View style={{ display: 'flex' }}>
          <Text style={styles.profileName}>{exercise.title}</Text>
          <Text style={styles.profileType}>{`${exercise.muscles}`}</Text>
          <Text style={styles.profileType}>{`reps: ${exercise.reps}`}</Text>
          <Text style={styles.profileType}>{`weight: ${exercise.weight}`}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

function ItemSeparatorView() {
  return (
    <View
      style={{
        height: 0.5,
        width: '100%',
        opacity: 0.2,
        backgroundColor: colors.gray
      }}
    />
  );
}

export default function SearchedTrainingPlan({
  title,
  description,
  difficulty,
  trainer,
  exercises,
  handleStartTraining,
  favorite,
  handleFavorite,
  handleRemoveFavorite
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
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingVertical: 10
          }}
        >
          <Text style={styles.title}>Ejercicios</Text>
          {favorite ? (
            <TouchableOpacity activeOpacity={0.5} onPress={handleRemoveFavorite}>
              <Ionicons
                name="star"
                style={{ width: 30, height: 30, tintColor: colors.white }}
                size={25}
                color={colors.main}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity activeOpacity={0.5} onPress={handleFavorite}>
              <Ionicons
                name="star-outline"
                style={{ width: 30, height: 30, tintColor: colors.white }}
                size={25}
                color={colors.white}
              />
            </TouchableOpacity>
          )}
        </View>

        <FlatList
          style={{ flex: 0.5 }}
          data={exercises}
          renderItem={(exercise) => <Item exercise={exercise} />}
          ItemSeparatorComponent={ItemSeparatorView}
        />
        <View style={{ paddingVertical: 10 }}>
          <TouchableOpacity style={styles.startButton} activeOpacity={0.5} onPress={handleStartTraining}>
            <Text style={styles.startButtonText}>Empezar!</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

Item.propTypes = {
  exercise: object.isRequired
};

SearchedTrainingPlan.propTypes = {
  handleStartTraining: func.isRequired,
  title: string.isRequired,
  description: string.isRequired,
  difficulty: string.isRequired,
  trainer: number.isRequired,
  exercises: object.isRequired,
  favorite: bool,
  handleFavorite: func,
  handleRemoveFavorite: func
};
