import React from 'react';
import { bool, number, object } from 'prop-types';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import { View } from 'react-native';

import { colors } from '../../colors';

function ProgressStepsForm({ currentStep, stepsData, stepError, stepsFields }) {
  const buttonTextStyle = {
    color: colors.main,
    fontWeight: 'bold'
  };

  return (
    <ProgressSteps
      activeLabelColor={colors.main}
      activeStepIconBorderColor={colors.main}
      activeStepIconColor={colors.transparent}
      activeStepNumColor={colors.main}
      borderWidth={2}
      completedCheckColor={colors.white}
      completedLabelColor={colors.main_soft}
      completedProgressBarColor={colors.main_soft}
      completedStepIconColor={colors.main}
      currentStep={currentStep}
      disabledStepIconBorderColor={colors.main}
      disabledStepIconColor={colors.gray}
      disabledStepNumColor={colors.white}
      labelColor={colors.gray}
      progressBarColor={colors.gray}
    >
      {stepsData.map((stepData, index) => (
        <ProgressStep
          errors={stepError}
          finishBtnText="Register"
          nextBtnText="Next"
          nextBtnTextStyle={index <= stepsData.length - 1 ? buttonTextStyle : undefined}
          previousBtnText="Previous"
          previousBtnTextStyle={index > 0 ? buttonTextStyle : undefined}
          {...stepData}
        >
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
  stepError: bool,
  stepsData: object,
  stepsFields: object
};

export default ProgressStepsForm;
