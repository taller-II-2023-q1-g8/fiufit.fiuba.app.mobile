import React from 'react';
import { bool, number, object } from 'prop-types';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import { View } from 'react-native';

function ProgressStepsForm({ currentStep, stepsData, stepError, stepsFields }) {
  return (
    <ProgressSteps
      activeLabelColor="#039174"
      activeStepIconBorderColor="#<039174>"
      borderStyle="outset"
      borderWidth={3}
      completedProgressBarColor="#039174"
      completedStepIconColor="#039174"
      currentStep={currentStep}
      labelColor="black"
      progressBarColor="#686868"
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
  );
}

ProgressStepsForm.propTypes = {
  currentStep: number,
  stepsData: object,
  stepError: bool,
  stepsFields: object
};

export default ProgressStepsForm;
