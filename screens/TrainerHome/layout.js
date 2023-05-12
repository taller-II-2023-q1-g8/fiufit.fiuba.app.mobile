import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { KeyboardAvoidingView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { string, bool, func } from 'prop-types';

import texts from '../../texts';

import { scrollviewStyle, styles } from './styles';

const trainerHomeTexts = texts.TrainerHome;

export default function TrainerHome({ username, handleTrainerHome }) {
  return (
    <View style={styles.container}>
      <StatusBar />
      <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={scrollviewStyle}>
        <KeyboardAvoidingView style={styles.formContainer} enabled>
          <Text style={styles.title}>{trainerHomeTexts.homeTitle}</Text>
          <Text>Welcome to trainer home {username}!</Text>
          <TouchableOpacity style={styles.submitButton} activeOpacity={0.5} onPress={handleTrainerHome}>
            <Text style={styles.submitButtonText}>Ir a home de atleta</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
}

TrainerHome.propTypes = {
  username: string.isRequired,
  handleTrainerHome: func.isRequired
};
