import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity, FlatList, ImageBackground } from 'react-native';
import { array, bool, func, object } from 'prop-types';
import Ionicons from 'react-native-vector-icons/Ionicons';

import manPic from '../../assets/man.jpeg';
import { colors } from '../../colors';
import Loader from '../../components/Loader';
import BackgroundImage from '../../assets/Background.jpg';
import TrainerIcon from '../../assets/personal-trainer.png';

import { styles } from './styles';

function ItemAthlete({ handleItemPress, athlete }) {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={() => handleItemPress(athlete)}>
      <View style={styles.item}>
        <Image style={styles.profilePic} source={manPic} />
        <View style={{ display: 'flex' }}>
          <Text style={styles.username}>Atleta: {athlete.username}</Text>
          <Text style={styles.quantity_cal}>Nota: {athlete.calification_score}</Text>
          <Text style={styles.quality_cal}>Calificacion: {athlete.calification}</Text>
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

export default function TrainerPlanView({
  plan,
  loading,
  handleShowStatsPress,
  handleShowExercisesPress,
  handleEditPress,
  handleDeletePress,
  handleAthletePress
}) {
  console.log(plan);
  return (
    <ImageBackground source={BackgroundImage}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image style={styles.profilePicture} source={manPic} />
          <View>
            <Text style={styles.username}>{plan.title}</Text>
            <View style={{ display: 'flex', flexDirection: 'row', marginVertical: 10 }}>
              <View style={{ marginRight: 30, display: 'flex', flexDirection: 'row' }}>
                <Text style={{ color: colors.white }}>Dificultad</Text>
                <Text style={{ marginLeft: 20, fontWeight: 'bold', color: colors.white }}>
                  {plan.difficulty}
                </Text>
              </View>
            </View>
            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ width: '80%', color: colors.white }}>{plan.description}</Text>
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
          <Text style={styles.title}>Estadisticas</Text>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity activeOpacity={0.5} onPress={handleDeletePress} style={{ marginRight: 10 }}>
              <Ionicons
                name="trash"
                style={{ width: 30, height: 30, tintColor: colors.white }}
                size={25}
                color={colors.white}
              />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={handleShowExercisesPress}
              style={{ marginRight: 10 }}
            >
              <Ionicons
                name="barbell"
                style={{ width: 30, height: 30, tintColor: colors.white }}
                size={25}
                color={colors.white}
              />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.5} onPress={handleEditPress}>
              <Ionicons
                name="brush"
                style={{ width: 30, height: 30, tintColor: colors.white }}
                size={25}
                color={colors.white}
              />
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.estadisticas}> Likes: {plan.likes}</Text>
        <Text style={styles.estadisticas}> Nota promedio: {plan.average_calification}</Text>
        <View style={{ flex: 1 }}>
          <FlatList
            data={plan.athletes_that_favorited}
            renderItem={({ item }) => <ItemAthlete handleItemPress={handleAthletePress} athlete={item} />}
            ItemSeparatorComponent={ItemSeparatorView}
          />
        </View>
      </View>
    </ImageBackground>
  );
}

TrainerPlanView.propTypes = {
  plan: object,
  loading: bool,
  handleShowStatsPress: func,
  handleShowExercisesPress: func,
  handleEditPress: func,
  handleDeletePress: func,
  handleAthletePress: func
};
ItemAthlete.propTypes = {
  handleItemPress: func,
  athlete: object
};
