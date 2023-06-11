import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity, FlatList, ImageBackground } from 'react-native';

import { array, bool, func, object } from 'prop-types';

import manPic from '../../assets/man.jpeg';
import { colors } from '../../colors';
import Loader from '../../components/Loader';

import BackgroundImage from '../../assets/Background.jpg';

import { styles } from './styles';

function AddedItem({ handlePress, exercise }) {
  exercise = exercise.item;
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={() => handlePress(exercise)}>
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

export default function AthleteTrainingPlan({ plan, loading, handle }) {
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
            <View style={{ flex: 1 }}>
              <TouchableOpacity
                style={{
                  flex: 1,
                  borderColor: 'black',
                  borderWidth: 1,
                  justifyContent: 'center',
                  backgroundColor: colors.soft_red
                }}
                activeOpacity={0.5}
                onPress={handle}
              >
                <Text style={{ textAlign: 'center' }}>Like</Text>
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
                onPress={handle}
              >
                <Text style={{ textAlign: 'center' }}>Calificar</Text>
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
                onPress={handle}
              >
                <Text style={{ textAlign: 'center' }}>Quitar de favoritos</Text>
              </TouchableOpacity>
            </View>
            <View style={{ flex: 1 }}>
              <TouchableOpacity
                style={{
                  flex: 0.2,
                  borderColor: 'black',
                  borderWidth: 1,
                  justifyContent: 'center',
                  backgroundColor: colors.soft_red
                }}
                activeOpacity={0.5}
                onPress={handle}
              >
                <Text style={{ textAlign: 'center' }}>Completar</Text>
              </TouchableOpacity>
              <FlatList
                style={{ flex: 1 }}
                data={plan.exercises}
                renderItem={(exercise) => <AddedItem handlePress={handle} exercise={exercise} />}
                ItemSeparatorComponent={ItemSeparatorView}
              />
            </View>
          </View>
        </View>
      )}
    </>
  );
}

AddedItem.propTypes = {
  handlePress: func,
  exercise: object.isRequired
};

AthleteTrainingPlan.propTypes = {
  plan: object,
  loading: bool,
  handle: func
};
