import React from 'react';
import { View, KeyboardAvoidingView, ScrollView, ImageBackground } from 'react-native';
import { array, bool, number } from 'prop-types';

import BackgroundImage from '../../../assets/Background.jpg';
import Loader from '../../../components/Loader';
import ProgressStepsForm from '../../../components/ProgressSteps';

import { scrollviewStyle, styles } from './styles';

export default function Register({ currentStep, loading, stepError, stepsData, stepsFields }) {
  return (
    <ImageBackground source={BackgroundImage} resizeMode="cover">
      <View style={styles.container}>
        <Loader loading={loading} />
        <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={scrollviewStyle}>
          <KeyboardAvoidingView style={styles.formContainer} enabled>
            <ProgressStepsForm
              currentStep={currentStep}
              stepError={stepError}
              stepsData={stepsData}
              stepsFields={stepsFields}
            />
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    </ImageBackground>
  );
}

Register.propTypes = {
  currentStep: number.isRequired,
  loading: bool.isRequired,
  stepError: bool.isRequired,
  stepsData: array,
  stepsFields: array.isRequired
};
