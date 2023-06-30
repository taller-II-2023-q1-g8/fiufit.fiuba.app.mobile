import React, { useEffect, useState } from 'react';
import { func, shape } from 'prop-types';
import { Alert, PermissionsAndroid, Text, View } from 'react-native';
import { Pedometer } from 'expo-sensors';

import { useStateValue } from '../../state';
import { createMetricRequest } from '../../requests';

import Walking from './layout';
import { styles } from './styles';

export default function WalkingScreen({ navigation }) {
  const [state, dispatch] = useStateValue();
  const [activityStatus, setActivityStatus] = useState('stopped');
  const [timePassed, setTimePassed] = useState(0);

  const [isPedometerAvailable, setIsPedometerAvailable] = useState('checking');
  const [pastStepCount, setPastStepCount] = useState(0);
  const [currentStepCount, setCurrentStepCount] = useState(0);
  const [intervalRef, setIntervalRef] = useState(null);

  const subscribe = async () => {
    const isAvailable = await Pedometer.isSupported();
    setIsPedometerAvailable(String(isAvailable));
    console.log(isAvailable);
    if (isAvailable) {
      try {
        const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACTIVITY_RECOGNITION);
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('acasdf');
          return Pedometer.watchStepCount((result) => {
            console.log('Abcabc');
            setCurrentStepCount(result.steps);
          });
        }
        Alert.alert('permission denied');
        setIsPedometerAvailable('false');
      } catch (err) {
        console.warn(err);
      }
    }
  };
  useEffect(() => {
    const subscription = subscribe();
    return () => subscription && subscription.remove();
  }, []);

  const updater = () => {
    setTimePassed((t) => t + 1);
  };

  const handleButtonPress = () => {
    if (activityStatus === 'stopped') {
      setActivityStatus('started');
      setIntervalRef(setInterval(updater, 1000));
    } else {
      setActivityStatus('stopped');
      clearInterval(intervalRef);
    }
  };

  const handleSubmitPress = () => {
    createMetricRequest({
      type: 'steps_taken',
      duration_in_seconds: timePassed,
      step_count: currentStepCount,
      created_at: new Date().toISOString(),
      username: state.user.username
    });
    setTimePassed(0);
    setActivityStatus('stopped');
    clearInterval(intervalRef);
  };

  return (
    <Walking
      status={activityStatus}
      timePassed={timePassed}
      steps={currentStepCount}
      handleButtonPress={handleButtonPress}
      handleSubmitPress={handleSubmitPress}
      isPedometerAvailable={isPedometerAvailable}
    />
  );
}

WalkingScreen.propTypes = {
  navigation: shape({
    navigate: func.isRequired
  }).isRequired
};
