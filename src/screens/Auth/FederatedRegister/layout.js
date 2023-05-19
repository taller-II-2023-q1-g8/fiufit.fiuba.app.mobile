import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, KeyboardAvoidingView, ScrollView } from 'react-native';
import { array, bool, number } from 'prop-types';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';

import Loader from '../../../components/Loader';
import texts from '../../../texts';

import { scrollviewStyle, styles } from './styles';

const federatedRegisterTexts = texts.FederatedRegister;

export default function FederatedRegister({ currentStep, loading, stepError, stepsData, stepsFields }) {
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
            currentStep={currentStep}
            activeLabelColor="#039174"
            activeStepIconBorderColor="#039174"
          >
            {stepsData.map((stepData, index) => (
              <ProgressStep errors={stepError} {...stepData}>
                <View>
                  {stepsFields[index].map((field) => (
                    <View>{field}</View>
                  ))}
                </View>
              </ProgressStep>
            ))}
          </ProgressSteps>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
}

FederatedRegister.propTypes = {
  currentStep: number.isRequired,
  loading: bool.isRequired,
  stepError: bool.isRequired,
  stepsData: array,
  stepsFields: array.isRequired
};
