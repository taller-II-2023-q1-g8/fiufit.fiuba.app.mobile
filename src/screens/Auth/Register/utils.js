import React from 'react';

import { emailFieldType, passwordFieldType, phoneFieldType } from '../../../components/Fields/constants';
import DateField from '../../../components/Fields/DateField';
import SelectField from '../../../components/Fields/SelectField';
import TextField from '../../../components/Fields/TextField';
import texts from '../../../texts';
import { Text, TouchableOpacity, View } from 'react-native';
import GenericSelectField from '../../../components/Fields/GenericSelectField';
import { styles } from '../../EditUserProfile/styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from '../../../colors';
import { array, bool, func, string } from 'prop-types';
import EditUserProfile from '../../EditUserProfile/layout';

const fieldTexts = texts.Fields;

export const nextStep = (currentStep) => currentStep + 1;
export const prevStep = (currentStep) => (currentStep > 0 ? currentStep - 1 : 0);

export const formatDate = (date) => `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

export const thereIsAnError = (keysToFilter, data) => keysToFilter.find((key) => data[key] === '');

export const fillErrors = (updatedErrors, keysToFilter, data) =>
  keysToFilter.forEach((key) => {
    if (data[key] === '') updatedErrors[key] = 'Campo obligatorio';
  });

const defaultTags = [
  { label: 'Abdominales', value: 'ABS' },
  { label: 'Espalda', value: 'BACK' },
  { label: 'Pecho', value: 'CHEST' },
  { label: 'Cardio', value: 'CARDIO' },
  { label: 'Piernas', value: 'LEGS' }
];

function InterestPicker({ tags, handleOnChangeTags, handleOnAddTag, handleOnDeleteTag }) {
  return (
    <View>
      <View style={{ flexDirection: 'row' }}>
        <GenericSelectField
          items={defaultTags}
          name="tags"
          onChangeText={handleOnChangeTags}
          title="Intereses"
          containerStyle={styles.fieldContainer}
        />
        <TouchableOpacity onPress={handleOnAddTag}>
          <Ionicons name="add" size={35} color={colors.white} style={{ paddingTop: 40, paddingLeft: 20 }} />
        </TouchableOpacity>
      </View>
      {tags.map((tag) => (
        <View style={styles.item}>
          <Text style={{ color: colors.white, fontSize: 15, paddingTop: 5 }}>{tag}</Text>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => handleOnDeleteTag(tag)}
            style={{ marginRight: 10, marginBotton: 10 }}
          >
            <Ionicons
              name="trash"
              style={{ width: 30, height: 30, tintColor: colors.white }}
              size={25}
              color={colors.white}
            />
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
}

export const getFields = (
  data,
  errors,
  handleOnChangeText,
  tags,
  handleOnChangeTags,
  handleOnAddTag,
  handleOnDeleteTag
) => [
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
      defaultValue={data.firstname}
      error={errors.firstname}
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
      name="gender"
      defaultValue={data.gender}
      error={errors.gender}
      onChangeText={handleOnChangeText}
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
      name="birth_date"
      error={errors.birth_date}
      onChangeText={handleOnChangeText}
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
    />,
    <InterestPicker
      handleOnChangeTags={handleOnChangeTags}
      handleOnAddTag={handleOnAddTag}
      tags={tags}
      handleOnDeleteTag={handleOnDeleteTag}
    />
  ]
];

export const getStepsData = (handleNextStepPress, handlePrevPress, handleSubmitPress) => [
  {
    label: 'Tu cuenta ',
    onNext: handleNextStepPress
  },
  {
    label: 'Sobre vos ',
    onNext: handleNextStepPress,
    onPrevious: handlePrevPress
  },
  {
    label: 'Ejercicio ',
    onPrevious: handlePrevPress,
    onSubmit: handleSubmitPress
  }
];

InterestPicker.propTypes = {
  handleOnChangeTags: func,
  handleOnAddTag: func,
  tags: array,
  handleOnDeleteTag: func
};
