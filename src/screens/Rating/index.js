import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ImageBackground,
  TouchableWithoutFeedback,
  Animated,
  TouchableOpacity,
  TextInput
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { func, shape } from 'prop-types';

import BackgroundImage from '../../assets/Background.jpg';
import texts from '../../texts';
import { colors } from '../../colors';
import { calificatePlan, fetchAthletesID, fetchTrainingPlanByID } from '../../requests';
import ExerciseScreen from '../Exercise';

import { styles } from './styles';

export default function RatingScreen({ navigation, route }) {
  const starRatingOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  console.log(route.params.athleteRating);
  const [starRating, setStarRating] = useState(null);
  const [inputText, setInputText] = useState('');
  const animatedButtonScale = new Animated.Value(1);
  console.log(route.params.athleteId);
  useEffect(() => {
    if (route.params.athleteRating !== undefined) {
      if (route.params.athleteRating.calification_score >= 0) {
        setStarRating(route.params.athleteRating.calification_score);
      }
      if (route.params.athleteRating.calification.length > 0) {
        setInputText(route.params.athleteRating.calification);
      }
    }
  }, []);
  const handlePressIn = () => {
    Animated.spring(animatedButtonScale, {
      toValue: 1.5,
      useNativeDriver: true,
      speed: 50,
      bounciness: 4
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(animatedButtonScale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 50,
      bounciness: 4
    }).start();
  };
  const animatedScaleStyle = {
    transform: [{ scale: animatedButtonScale }]
  };
  const handlePressCalificate = (calificationScore, calification) => {
    const values = {};
    values.calification = calification;
    values.calification_score = calificationScore;
    calificatePlan(route.params.plan.id, route.params.athleteId, values);
  };
  return (
    <ImageBackground source={BackgroundImage}>
      <View style={styles.container}>
        <Text style={styles.heading}>{starRating ? `${starRating}*` : 'Tap to rate'}</Text>
        <View style={styles.stars}>
          {starRatingOptions.map((option) => (
            <TouchableWithoutFeedback
              onPressIn={() => handlePressIn(option)}
              onPressOut={() => handlePressOut(option)}
              onPress={() => setStarRating(option)}
              key={option}
            >
              <Animated.View style={animatedScaleStyle}>
                <Ionicons
                  name={starRating >= option ? 'star' : 'star-outline'}
                  size={32}
                  style={starRating >= option ? styles.starSelected : styles.starUnselected}
                />
              </Animated.View>
            </TouchableWithoutFeedback>
          ))}
        </View>
        <TextInput
          style={styles.input}
          placeholder="Escribi que te parecio..."
          placeholderTextColor={colors.white}
          value={inputText}
          onChangeText={setInputText}
        />
        <TouchableOpacity
          onPress={() => {
            handlePressCalificate(starRating, inputText);
            // Vuelve al ejercicio
            navigation.pop(route.params.pop);
          }}
          style={{
            backgroundColor: colors.main_soft,
            marginLeft: 'auto',
            marginRight: 'auto',
            marginTop: 30,
            borderRadius: 20,
            padding: 10,
            width: 150
          }}
        >
          <Text
            style={{
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: 20,
              color: 'white'
            }}
          >
            Calificar
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            // Vuelve al ejercicio
            navigation.pop(route.params.pop);
          }}
          style={{
            marginLeft: 'auto',
            marginRight: 'auto',
            marginTop: 30,
            borderRadius: 20,
            padding: 10,
            width: 150
          }}
        >
          <Text
            style={{
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: 18,
              color: 'white'
            }}
          >
            Omitir
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

RatingScreen.propTypes = {
  route: shape({
    params: shape.isRequired
  }).isRequired,
  navigation: shape({
    navigate: func.isRequired
  }).isRequired
};
