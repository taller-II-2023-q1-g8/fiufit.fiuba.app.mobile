import React from 'react';

import { emailFieldType, passwordFieldType, phoneFieldType } from '../../components/Fields/constants';
import DateField from '../../components/Fields/DateField';
import SelectField from '../../components/Fields/SelectField';
import TextField from '../../components/Fields/TextField';
import texts from '../../texts';

const fieldTexts = texts.Fields;

export const getFields = (data, errors, handleOnChangeText, handleOnGenderChange) => [
  [
    <TextField
      key="emailField"
      name="email"
      defaultValue={data.email}
      error={errors.email}
      keyboardType={emailFieldType}
      onChangeText={handleOnChangeText}
      placeholder={fieldTexts.emailPlaceholder}
      title={fieldTexts.emailTitle}
    />,
    <TextField
      key="usernameField"
      name="username"
      defaultValue={data.username}
      error={errors.username}
      onChangeText={handleOnChangeText}
      placeholder={fieldTexts.usernamePlaceholder}
      title={fieldTexts.usernameTitle}
    />,
    <TextField
      key="passwordField"
      name="password"
      defaultValue={data.password}
      error={errors.password}
      keyboardType={passwordFieldType}
      onChangeText={handleOnChangeText}
      placeholder={fieldTexts.passwordPlaceholder}
      title={fieldTexts.passwordTitle}
    />
  ],
  [
    <TextField
      key="nameField"
      name="firstname"
      defaultValue={data.name}
      error={errors.name}
      onChangeText={handleOnChangeText}
      placeholder={fieldTexts.namePlaceholder}
      title={fieldTexts.nameTitle}
    />,
    <TextField
      key="lastnameField"
      name="lastname"
      defaultValue={data.lastname}
      error={errors.lastname}
      onChangeText={handleOnChangeText}
      placeholder={fieldTexts.lastnamePlaceholder}
      title={fieldTexts.lastnameTitle}
    />,
    <SelectField
      key="genderField"
      defaultValue={data.gender}
      error={errors.gender}
      onChangeText={handleOnGenderChange}
      title={fieldTexts.genderTitle}
    />,
    <TextField
      key="phoneField"
      name="phone_number"
      defaultValue={data.phone_number}
      error={errors.phone_number}
      keyboardType={phoneFieldType}
      onChangeText={handleOnChangeText}
      placeholder={fieldTexts.phonePlaceholder}
      title={fieldTexts.phoneTitle}
    />
  ],
  [
    <DateField
      key="birthdateField"
      title={texts.Fields.birthdateTitle}
      placeholder={texts.Fields.birthdatePlaceholder}
      // error={birthdateError}
      // onChangeText={handleOnBirthdateChange}
    />,
    <TextField
      key="heightField"
      name="height_in_cm"
      defaultValue={data.height_in_cm}
      error={errors.height_in_cm}
      onChangeText={handleOnChangeText}
      placeholder={fieldTexts.heightPlaceholder}
      title={fieldTexts.heightTitle}
    />,
    <TextField
      key="weightField"
      name="weight_in_kg"
      defaultValue={data.weight_in_kg}
      error={errors.weight_in_kg}
      onChangeText={handleOnChangeText}
      placeholder={fieldTexts.weightPlaceholder}
      title={fieldTexts.weightTitle}
    />
  ]
];

export const getStepsData = (handleNextStepPress, handlePrevPress, handleSubmitPress) => [
  {
    label: 'Tu cuenta ',
    nextBtnText: 'Siguiente',
    onNext: handleNextStepPress
  },
  {
    label: 'Sobre vos ',
    nextBtnText: 'Siguiente',
    onNext: handleNextStepPress,
    onPrevious: handlePrevPress,
    previousBtnText: 'Anterior'
  },
  {
    label: 'Ejercicio ',
    onPrevious: handlePrevPress,
    onSubmit: handleSubmitPress,
    previousBtnText: 'Anterior'
  }
];
