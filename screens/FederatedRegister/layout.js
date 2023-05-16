import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, KeyboardAvoidingView, ScrollView } from 'react-native';
import PropTypes, { bool, func, number } from 'prop-types';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';

import Loader from '../../components/Loader';
import texts from '../../texts';

import { scrollviewStyle, styles } from './styles';

const federatedRegisterTexts = texts.FederatedRegister;

export default function FederatedRegister({
  step1,
  step2,
  submitError,
  step1Error,
  handleNextPress,
  handlePreviousPress,
  currentStep,
  handleSubmitPress,
  loading
}) {
  return (
    <View style={styles.container}>
      <StatusBar />
      <Loader loading={loading} />
      <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={scrollviewStyle}>
        <KeyboardAvoidingView style={styles.formContainer} enabled>
          <Text style={styles.title}>{federatedRegisterTexts.federatedRegisterTitle}</Text>
          <ProgressSteps
            borderStyle="outset"
            borderWidth={3}
            progressBarColor="#686868"
            completedProgressBarColor="#039174"
            completedStepIconColor="#039174"
            labelColor="black"
            activeLabelColor="#039174"
            activeStepIconBorderColor="#039174"
          >
            <ProgressStep
              nextBtnText="Siguiente"
              onNext={handleNextPress}
              label={federatedRegisterTexts.step1Title}
              errors={step1Error}
            >
              <View>{currentStep === 0 ? step1.map((field) => <View>{field}</View>) : null}</View>
            </ProgressStep>
            <ProgressStep
              previousBtnText="Anterior"
              onPrevious={handlePreviousPress}
              label={federatedRegisterTexts.step2Title}
              onSubmit={handleSubmitPress}
              errors={submitError}
            >
              <View>{currentStep === 1 ? step2.map((field) => <View>{field}</View>) : null}</View>
            </ProgressStep>
          </ProgressSteps>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
}

FederatedRegister.propTypes = {
  step1: PropTypes.array.isRequired,
  step2: PropTypes.array.isRequired,
  step1Error: bool.isRequired,
  submitError: bool.isRequired,
  handleNextPress: func.isRequired,
  handlePreviousPress: func.isRequired,
  currentStep: number.isRequired,
  handleSubmitPress: func.isRequired,
  loading: bool.isRequired
};
