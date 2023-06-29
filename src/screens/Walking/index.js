import React, { useEffect, useState } from 'react';
import { func, shape } from 'prop-types';
import { Text, View } from 'react-native';
import { Pedometer } from 'expo-sensors';

import Walking from './layout';
import { styles } from './styles';

export default function WalkingScreen({ navigation }) {
  const [isPedometerAvailable, setIsPedometerAvailable] = useState('checking');
  const [pastStepCount, setPastStepCount] = useState(0);
  const [currentStepCount, setCurrentStepCount] = useState(0);

  const subscribe = async () => {
    const isAvailable = await Pedometer.isAvailableAsync();
    setIsPedometerAvailable(String(isAvailable));

    if (isAvailable) {
      return Pedometer.watchStepCount((result) => {
        setCurrentStepCount(result.steps);
      });
    }
  };

  useEffect(() => {
    const subscription = subscribe();
    return () => subscription && subscription.remove();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Pedometer.isAvailableAsync(): {isPedometerAvailable}</Text>
      <Text>Walk! And watch this go up: {currentStepCount}</Text>
    </View>
  );
}

WalkingScreen.propTypes = {
  navigation: shape({
    navigate: func.isRequired
  }).isRequired
};
