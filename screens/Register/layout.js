import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, KeyboardAvoidingView, ScrollView } from 'react-native';
import PropTypes, { bool, func, number } from 'prop-types';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';

import Loader from '../../components/Loader';
import texts from '../../texts';

import { scrollviewStyle, styles } from './styles';

const registerTexts = texts.Register;

export default function Register({
  fields,
  handleSubmitPress,
  submitError,
  currentStep,
  handleNextPressStep0,
  step0Error,
  step1Error,
  handleNextPressStep1,
  handlePrevPress,
  loading
}) {
  return (
    <View style={styles.container}>
      <StatusBar />
      <Loader loading={loading} />
      <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={scrollviewStyle}>
        <KeyboardAvoidingView style={styles.formContainer} enabled>
          <Text style={styles.title}>{registerTexts.registerTitle}</Text>
          <ProgressSteps
            borderStyle="outset"
            borderWidth={3}
            progressBarColor="#686868"
            completedProgressBarColor="#039174"
            completedStepIconColor="#039174"
            labelColor="black"
            currentStep={currentStep}
            activeLabelColor="#039174"
            activeStepIconBorderColor="#039174"
          >
            <ProgressStep
              nextBtnText="Siguiente"
              onNext={handleNextPressStep0}
              label="Tu cuenta "
              errors={step0Error}
            >
              <View>{currentStep === 0 ? fields[0].map((field) => <View>{field}</View>) : null}</View>
            </ProgressStep>
            <ProgressStep
              nextBtnText="Siguiente"
              previousBtnText="Anterior"
              onNext={handleNextPressStep1}
              onPrevious={handlePrevPress}
              label="Sobre vos "
              errors={step1Error}
            >
              <View>{currentStep === 1 ? fields[1].map((field) => <View>{field}</View>) : null}</View>
            </ProgressStep>
            <ProgressStep
              previousBtnText="Anterior"
              onPrevious={handlePrevPress}
              onSubmit={handleSubmitPress}
              label="Ejercicio "
              errors={submitError}
            >
              <View>{currentStep === 2 ? fields[2].map((field) => <View>{field}</View>) : null}</View>
            </ProgressStep>
          </ProgressSteps>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
}

Register.propTypes = {
  fields: PropTypes.array.isRequired,
  handleSubmitPress: func.isRequired,
  submitError: bool.isRequired,
  currentStep: number.isRequired,
  handleNextPressStep0: func.isRequired,
  handleNextPressStep1: func.isRequired,
  step0Error: bool.isRequired,
  step1Error: bool.isRequired,
  handlePrevPress: func.isRequired,
  loading: bool.isRequired
};
