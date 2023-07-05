import React, { useEffect, useState } from 'react';
import { func, shape } from 'prop-types';
import { Alert, PermissionsAndroid, Text, View } from 'react-native';
import { Pedometer } from 'expo-sensors';
import * as Location from 'expo-location';

import { useStateValue } from '../../state';
import { createMetricRequest, fetchUserGoalsByUsername } from '../../requests';

import Walking from './layout';
import { styles } from './styles';
import { getDistanceFromLatLonInKm } from '../../utils';

export default function WalkingScreen({ navigation }) {
  const [state, dispatch] = useStateValue();
  const [activityStatus, setActivityStatus] = useState('stopped');
  const [timePassed, setTimePassed] = useState(0);
  const [pastLocation, setPastLocation] = useState(null);
  const [currLocation, setCurrLocation] = useState(null);
  const [distance, setDistance] = useState(0);
  const [isPedometerAvailable, setIsPedometerAvailable] = useState('checking');
  const [isLocationAvailable, setIsLocationAvailable] = useState('checking');
  const [isAvailable, setIsAvailable] = useState('checking');
  const [pastStepCount, setPastStepCount] = useState(0);
  const [currentStepCount, setCurrentStepCount] = useState(0);
  const [intervalRef, setIntervalRef] = useState(null);
  const [pedometerRef, setPedometerRef] = useState(null);
  const [locationRef, setLocationRef] = useState(null);
  const [loading, setLoading] = useState(false);
  const setup = async () => {
    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.BestForNavigation
    });
    setPastLocation({ latitude: location.coords.latitude, longitude: location.coords.longitude });
    console.log('Setup done');
  };
  const config = async () => {
    const resf = await Location.requestForegroundPermissionsAsync();
    if (resf.status !== 'granted') {
      console.log('Permission to access location was denied');
      setIsLocationAvailable('false');
      return false;
    }
    console.log('Permission to access location granted');
    await setup();
    setIsLocationAvailable('true');
    return true;
  };
  const subscribe = async () => {
    const isLocAvailable = await config();
    console.log(isLocAvailable);
    const isPedAvailable = await Pedometer.isAvailableAsync();
    setIsPedometerAvailable(String(isPedAvailable));
    if (isPedAvailable) {
      try {
        const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACTIVITY_RECOGNITION);
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Permissions granted');
          setIsAvailable('true');
          return;
        }
        Alert.alert('No podras contar tus pasos');
        if (isLocAvailable) {
          setIsAvailable('true');
          return;
        }
        setIsAvailable('false');
        setIsPedometerAvailable('false');
      } catch (err) {
        console.warn(err);
      }
    }
    if (isLocAvailable) {
      setIsAvailable('true');
    }
  };
  useEffect(() => {
    const subscription = subscribe();
  }, []);
  useEffect(() => {
    if (currLocation !== null) {
      const l1 = pastLocation.latitude;
      const l2 = pastLocation.longitude;
      const l3 = currLocation.latitude;
      const l4 = currLocation.longitude;
      const d = getDistanceFromLatLonInKm(l1, l2, l3, l4);
      console.log(d);
      // Como no es
      if (d * 1000 >= 1.5) {
        console.log('Distancia hasta ahora: ', distance * 1000);
        console.log('Delta d:', d * 1000);
        setDistance(distance + d);
        setPastLocation(currLocation);
      }
    }
  }, [currLocation]);
  const updater = () => {
    setTimePassed((t) => t + 1);
  };

  const handleButtonPress = async () => {
    if (activityStatus === 'stopped') {
      setActivityStatus('started');
      setIntervalRef(setInterval(updater, 1000));
      if (isPedometerAvailable) {
        setPedometerRef(
          Pedometer.watchStepCount((result) => {
            console.log(pastStepCount, result.steps);
            setCurrentStepCount(result.steps + pastStepCount);
          })
        );
      }
      await setup();
      const ref = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.BestForNavigation,
          // distanceInterval: 3,
          timeInterval: 5000
        },
        (loc) => {
          setCurrLocation({ latitude: loc.coords.latitude, longitude: loc.coords.longitude });
        }
      );
      setLocationRef(ref);
    } else {
      setActivityStatus('stopped');
      clearInterval(intervalRef);
      locationRef.remove();
      if (isPedometerAvailable) {
        setPastStepCount(currentStepCount);
        pedometerRef.remove();
        console.log(currentStepCount);
      }
    }
  };

  const handleSubmitPress = async () => {
    setLoading(true);
    if (isPedometerAvailable === 'true') {
      await createMetricRequest({
        type: 'steps_taken',
        duration_in_seconds: timePassed,
        step_count: currentStepCount,
        created_at: new Date().toISOString(),
        username: state.user.username
      });
    }
    if (isLocationAvailable === 'true') {
      await createMetricRequest({
        type: 'distance_travelled',
        duration_in_seconds: timePassed,
        distance_in_meters: distance * 1000,
        created_at: new Date().toISOString(),
        username: state.user.username
      });
    }
    setTimePassed(0);
    setActivityStatus('stopped');
    setDistance(0);
    clearInterval(intervalRef);
    locationRef.remove();
    if (isPedometerAvailable) {
      setPastStepCount(0);
      setCurrentStepCount(0);
      pedometerRef.remove();
    }
    const goalsResponse = await fetchUserGoalsByUsername(state.user.username);
    const goalsJson = await goalsResponse.json();
    dispatch({
      type: 'updateGoals',
      newUserGoals: goalsJson.message
    });
    setLoading(false);
  };

  return (
    <Walking
      status={activityStatus}
      timePassed={timePassed}
      steps={currentStepCount}
      handleButtonPress={handleButtonPress}
      handleSubmitPress={handleSubmitPress}
      isPedometerAvailable={isPedometerAvailable}
      isLocationAvailable={isLocationAvailable}
      isAvailable={isAvailable}
      distance={distance}
      loading={loading}
    />
  );
}

WalkingScreen.propTypes = {
  navigation: shape({
    navigate: func.isRequired
  }).isRequired
};
