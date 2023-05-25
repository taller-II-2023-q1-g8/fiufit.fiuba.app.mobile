import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, KeyboardAvoidingView, ScrollView } from 'react-native';
import { array, bool, number } from 'prop-types';

import Loader from '../../../components/Loader';
import ProgressStepsForm from '../../../components/ProgressSteps';
import texts from '../../../texts';

import { scrollviewStyle, styles } from './styles';

const registerTexts = texts.Register;

export default function Register({ currentStep, loading, stepError, stepsData, stepsFields }) {
  return (
    <View style={styles.container}>
      <StatusBar />
      <Loader loading={loading} />
      <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={scrollviewStyle}>
        <KeyboardAvoidingView style={styles.formContainer} enabled>
          <Text style={styles.title}>{registerTexts.registerTitle}</Text>
          <ProgressStepsForm
            currentStep={currentStep}
            stepError={stepError}
            stepsData={stepsData}
            stepsFields={stepsFields}
          />
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
}

Register.propTypes = {
  currentStep: number.isRequired,
  loading: bool.isRequired,
  stepError: bool.isRequired,
  stepsData: array,
  stepsFields: array.isRequired
};
