import React from 'react';

import DateField from '../../../components/Fields/DateField';
import SelectField from '../../../components/Fields/SelectField';
import TextField from '../../../components/Fields/TextField';
import texts from '../../../texts';
import { phoneFieldType, textFieldType } from '../../../components/Fields/constants';

const fieldTexts = texts.Fields;
const federatedRegisterTexts = texts.FederatedRegister;

export const nextStep = (currentStep) => currentStep + 1;
export const prevStep = (currentStep) => (currentStep > 0 ? currentStep - 1 : 0);

export const formatDate = (date) => `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

export const thereIsAnError = (keysToFilter, data) => keysToFilter.find((key) => data[key] === '');

export const fillErrors = (updatedErrors, keysToFilter, data) =>
  keysToFilter.forEach((key) => {
    if (data[key] === '') updatedErrors[key] = 'Campo obligatorio';
  });

export const getFields = (data, errors, handleOnChangeText) => [
  [
    <TextField
      error={errors.username}
      key="usernameField"
      keyboardType={textFieldType}
      name="username"
      onChangeText={handleOnChangeText}
      placeholder={fieldTexts.usernamePlaceholder}
      title={fieldTexts.usernameTitle}
    />,
    <DateField
      error={errors.birth_date}
      key="birthdateField"
      name="birth_date"
      onChangeText={handleOnChangeText}
      placeholder={fieldTexts.birthdatePlaceholder}
      title={fieldTexts.birthdateTitle}
    />,
    <SelectField
      error={errors.gender}
      key="genderField"
      name="gender"
      onChangeText={handleOnChangeText}
      title={fieldTexts.genderTitle}
    />,
    <TextField
      name="phone_number"
      key="phoneField"
      error={errors.phone_number}
      keyboardType={phoneFieldType}
      onChangeText={handleOnChangeText}
      placeholder={fieldTexts.phonePlaceholder}
      title={fieldTexts.phoneTitle}
    />
  ],
  [
    <TextField
      key="heightField"
      name="height_in_cm"
      defaultValue={data.height_in_cm}
      error={errors.height_in_cm}
      keyboardType={phoneFieldType}
      onChangeText={handleOnChangeText}
      placeholder={fieldTexts.heightPlaceholder}
      title={fieldTexts.heightTitle}
    />,
    <TextField
      key="weightField"
      name="weight_in_kg"
      defaultValue={data.weight_in_kg}
      error={errors.weight_in_kg}
      keyboardType={phoneFieldType}
      onChangeText={handleOnChangeText}
      placeholder={fieldTexts.weightPlaceholder}
      title={fieldTexts.weightTitle}
    />
  ]
];

export const getStepsData = (handleNextStepPress, handlePreviousPress, handleSubmitPress) => [
  {
    label: federatedRegisterTexts.step1Title,
    nextBtnText: 'Siguiente',
    onNext: handleNextStepPress
  },
  {
    label: federatedRegisterTexts.step2Title,
    onPrevious: handlePreviousPress,
    onSubmit: handleSubmitPress,
    previousBtnText: 'Anterior'
  }
];
