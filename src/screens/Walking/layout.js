import { ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { func, number, shape, string } from 'prop-types';

import BackgroundImage from '../../assets/Background.jpg';

import { styles } from './styles';
import Loader from '../../components/Loader';

export default function Walking({
  timePassed,
  status,
  steps,
  handleButtonPress,
  handleSubmitPress,
  isPedometerAvailable,
  distance,
  isAvailable,
  isLocationAvailable,
  loading
}) {
  let minutes = Math.floor(timePassed / 60);
  let seconds = timePassed % 60;
  if (minutes < 10) minutes = `0${minutes}`;
  if (seconds < 10) seconds = `0${seconds}`;
  const unidad = '(Kms)';
  const distanceToDisplay = distance.toFixed(2);
  /*
  if (distance * 1000 <= 100) {
    distanceToDisplay = Math.round(distance * 1000);
    unidad = '(Mts)';
  }
  */
  const timeToDisplay = `${minutes}:${seconds}`;
  return (
    <ImageBackground source={BackgroundImage} resizeMode="cover">
      <View style={styles.container}>
        <Loader loading={loading} />
        {isAvailable === 'true' && (
          <>
            <View style={styles.infoContainer}>
              <View style={styles.stepsContainer}>
                {isLocationAvailable === 'true' ? (
                  <Text style={styles.steps}>{distanceToDisplay} </Text>
                ) : (
                  <Text style={styles.steps}>-</Text>
                )}
                <Text style={styles.mts}>{unidad}</Text>
              </View>
              <View style={styles.stepsContainer}>
                {isPedometerAvailable === 'true' ? (
                  <Text style={styles.steps}>{steps}</Text>
                ) : (
                  <Text style={styles.steps}>-</Text>
                )}
                <MaterialCommunityIcons style={styles.stepsImg} name="shoe-print" size={50} color="white" />
              </View>
              <View style={styles.timeContainer}>
                <Text style={styles.time}>{timeToDisplay}</Text>
                <MaterialCommunityIcons style={styles.timeImg} name="timer-outline" size={50} color="white" />
              </View>
            </View>
            <View style={styles.buttonContainer}>
              {status === 'stopped' && (
                <TouchableOpacity
                  onPress={handleButtonPress}
                  style={[styles.actionButton, styles.startButton]}
                >
                  <Text style={styles.actionButtonText}>Empezar</Text>
                </TouchableOpacity>
              )}
              {status === 'started' && (
                <TouchableOpacity
                  onPress={handleButtonPress}
                  style={[styles.actionButton, styles.pauseButton]}
                >
                  <Ionicons name="pause" size={50} color="white" />
                </TouchableOpacity>
              )}
              {status === 'started' && (
                <TouchableOpacity
                  onPress={handleSubmitPress}
                  style={[styles.actionButton, styles.stopButton]}
                >
                  <Text style={styles.actionButtonText}>Terminar</Text>
                </TouchableOpacity>
              )}
            </View>
          </>
        )}
        {isAvailable === 'false' && (
          <View>
            <Text style={styles.errorText}>No se puede acceder al podómetro ni a la ubicación</Text>
          </View>
        )}
      </View>
    </ImageBackground>
  );
}

// timePassed,
// status,
// steps,
// handleButtonPress,
// handleSubmitPress,
// isPedometerAvailable

Walking.propTypes = {
  status: string.isRequired,
  steps: number.isRequired,
  timePassed: number.isRequired,
  handleButtonPress: func.isRequired,
  handleSubmitPress: func.isRequired,
  isPedometerAvailable: string.isRequired,
  distance: number.isRequired,
  isAvailable: string.isRequired,
  isLocationAvailable: string.isRequired,
  loading: true
};
