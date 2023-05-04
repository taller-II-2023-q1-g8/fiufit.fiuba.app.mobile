import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, KeyboardAvoidingView, ScrollView, TouchableOpacity } from 'react-native';
import PropTypes, { bool, func } from 'prop-types';

import Loader from '../../components/Loader';
import texts from '../../texts';

import { scrollviewStyle, styles } from './styles';

const registerTexts = texts.Register;

const STEPS = 3;

const nextStep = (currentStep) => (currentStep >= STEPS - 2 ? STEPS - 1 : currentStep + 1);
const prevStep = (currentStep) => (currentStep <= 1 ? 0 : currentStep - 1);

export default function Register({ fields, handleSubmitPress, loading }) {
  const [currentStep, setCurrentStep] = useState(0);

  const prevButton = () => {
    const enabled = currentStep > 0;
    const style = enabled ? styles.scrollButton : styles.scrollButtonDisabled;
    return (
      <TouchableOpacity
        style={style}
        activeOpacity={0.5}
        onPress={() => {
          setCurrentStep(prevStep(currentStep));
        }}
      >
        <Text style={styles.submitButtonText}>Anterior</Text>
      </TouchableOpacity>
    );
  };

  const nextButton = () => {
    const enabled = currentStep < STEPS - 1;
    const style = enabled ? styles.scrollButton : styles.scrollButtonDisabled;
    return (
      <TouchableOpacity
        style={style}
        activeOpacity={0.5}
        onPress={() => {
          setCurrentStep(nextStep(currentStep));
        }}
        disabled={!enabled}
      >
        <Text style={styles.submitButtonText}>Siguiente</Text>
      </TouchableOpacity>
    );
  };

  const registerButton = () => {
    if (currentStep === STEPS - 1) {
      return (
        <TouchableOpacity style={styles.submitButton} activeOpacity={0.5} onPress={handleSubmitPress}>
          <Text style={styles.submitButtonText}>{registerTexts.submitButtonText}</Text>
        </TouchableOpacity>
      );
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar />
      <Loader loading={loading} />
      <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={scrollviewStyle}>
        <KeyboardAvoidingView style={styles.formContainer} enabled>
          <Text style={styles.title}>{registerTexts.registerTitle}</Text>
          <View>
            {fields[currentStep].map((field) => (
              <View>{field}</View>
            ))}
          </View>
          <View flexDirection="row" alignItems="center" justifyContent="center">
            {prevButton()}
            {nextButton()}
          </View>
          {registerButton()}
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
}

Register.propTypes = {
  fields: PropTypes.array.isRequired,
  handleSubmitPress: func.isRequired,
  loading: bool.isRequired
};
