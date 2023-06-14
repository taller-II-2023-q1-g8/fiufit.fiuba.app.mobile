import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity, FlatList, ImageBackground } from 'react-native';
import { array, bool, func, object } from 'prop-types';

import manPic from '../../assets/man.jpeg';
import { colors } from '../../colors';
import Loader from '../../components/Loader';
import BackgroundImage from '../../assets/Background.jpg';

import { styles } from './styles';

export default function TrainerPlanView({
  plan,
  loading,
  handleShowStatsPress,
  handleShowExercisesPress,
  handleEditPress,
  handleDeletePress
}) {
  return (
    <>
      <Loader loading={loading} />
      {!loading && (
        <View style={styles.container}>
          <Image style={styles.banner} source={manPic} />
          <View style={{ borderColor: 'black', borderWidth: 1, flex: 0.15 }}>
            <Text style={{ ...styles.title, textAlign: 'center' }}>{plan.title}</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              borderColor: 'black',
              borderWidth: 1,
              flex: 0.15,
              justifyContent: 'center'
            }}
          >
            <View style={{ borderColor: 'black', borderWidth: 1, flex: 1 }}>
              <Text style={{ color: colors.gray, textAlign: 'center' }}>Tags</Text>
              <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>{plan.tags}</Text>
            </View>
            <View style={{ borderColor: 'black', borderWidth: 1, flex: 1 }}>
              <Text style={{ color: colors.gray, textAlign: 'center' }}>Dificultad</Text>
              <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>{plan.difficulty}</Text>
            </View>
          </View>
          <View style={{ borderColor: 'black', borderWidth: 1 }}>
            <Text style={{ color: colors.gray, textAlign: 'center' }}>Descripcion</Text>
            <Text style={{ textAlign: 'center' }}>{plan.description}</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              borderColor: 'black',
              borderWidth: 1,
              flex: 0.6
            }}
          >
            <TouchableOpacity
              style={{
                flex: 1,
                borderColor: 'black',
                borderWidth: 1,
                justifyContent: 'center',
                backgroundColor: colors.soft_red
              }}
              activeOpacity={0.5}
              onPress={handleShowStatsPress}
            >
              <Text style={{ textAlign: 'center' }}>Estadisticas</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flex: 1,
                borderColor: 'black',
                borderWidth: 1,
                justifyContent: 'center',
                backgroundColor: colors.soft_red
              }}
              activeOpacity={0.5}
              onPress={handleShowExercisesPress}
            >
              <Text style={{ textAlign: 'center' }}>Ejercicios</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
              borderColor: 'black',
              borderWidth: 1,
              flex: 0.1
            }}
          >
            <TouchableOpacity
              style={{
                flex: 1,
                borderColor: 'black',
                borderWidth: 1,
                justifyContent: 'center',
                backgroundColor: 'yellow'
              }}
              activeOpacity={0.5}
              onPress={handleEditPress}
            >
              <Text style={{ textAlign: 'center' }}>Editar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flex: 1,
                borderColor: 'black',
                borderWidth: 1,
                justifyContent: 'center',
                backgroundColor: 'red'
              }}
              activeOpacity={0.5}
              onPress={handleDeletePress}
            >
              <Text style={{ textAlign: 'center' }}>Eliminar</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
}

TrainerPlanView.propTypes = {
  plan: object,
  loading: bool,
  handleShowStatsPress: func,
  handleShowExercisesPress: func,
  handleEditPress: func,
  handleDeletePress: func
};
