import { StyleSheet, Text, View, SafeAreaView, Image, ImageBackground } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { func, shape } from 'prop-types';

import BackgroundImage from '../../assets/Background.jpg';
import { colors } from '../../colors';
import ExerciseScreen from '../Exercise';

import { styles } from './styles';

export default function RestScreen({ navigation }) {
  const timer = 0;
  const [timeLeft, setTimeLeft] = useState(3);

  const startTime = () => {
    setTimeout(() => {
      if (timeLeft <= 0) {
        navigation.goBack();
        clearTimeout(timer);
      }
      setTimeLeft(timeLeft - 1);
    }, 1000);
  };
  useEffect(() => {
    startTime();
    // clean up
    return () => clearTimeout(timer);
  });
  return (
    <ImageBackground source={BackgroundImage}>
      <View style={styles.container}>
        <Image
          // resizeMode="contain"
          source={{
            uri: 'https://cdn-images.cure.fit/www-curefit-com/image/upload/fl_progressive,f_auto,q_auto:eco,w_500,ar_500:300,c_fit/dpr_2/image/carefit/bundle/CF01032_magazine_2.png'
          }}
          style={{ width: '100%', height: 200 }}
        />

        <Text
          style={{
            fontSize: 30,
            fontWeight: '900',
            marginTop: 50,
            textAlign: 'center',
            color: colors.white
          }}
        >
          TAKE A BREAK!
        </Text>

        <Text
          style={{
            fontSize: 40,
            fontWeight: '800',
            marginTop: 50,
            textAlign: 'center',
            color: colors.white
          }}
        >
          {timeLeft}
        </Text>
      </View>
    </ImageBackground>
  );
}

RestScreen.propTypes = {
  navigation: shape({
    navigate: func.isRequired
  }).isRequired
};
