import React from 'react';

import TextField from '../../components/Fields/TextField';
import texts from '../../texts';
import { emailFieldType, phoneFieldType } from '../../components/Fields/constants';
import SelectField from '../../components/Fields/SelectField';

const fieldTexts = texts.Fields;

export const getFields = (data, handleOnChangeText) => [
  <TextField
    key="nameField"
    name="firstname"
    defaultValue={data.firstname}
    onChangeText={handleOnChangeText}
    placeholder={fieldTexts.namePlaceholder}
    title={fieldTexts.nameTitle}
  />,
  <TextField
    key="lastnameField"
    name="lastname"
    defaultValue={data.lastname}
    onChangeText={handleOnChangeText}
    placeholder={fieldTexts.lastnamePlaceholder}
    title={fieldTexts.lastnameTitle}
  />,
  <SelectField
    key="genderField"
    name="gender"
    defaultValue={data.gender}
    onChangeText={handleOnChangeText}
    title={fieldTexts.genderTitle}
  />,
  <TextField
    key="phoneField"
    name="phone_number"
    defaultValue={data.phone_number}
    keyboardType={phoneFieldType}
    onChangeText={handleOnChangeText}
    placeholder={fieldTexts.phonePlaceholder}
    title={fieldTexts.phoneTitle}
  />,
  <TextField
    key="weigthField"
    name="weight_in_kg"
    defaultValue={data.weight_in_kg}
    keyboardType={phoneFieldType}
    onChangeText={handleOnChangeText}
    placeholder={fieldTexts.weightPlaceholder}
    title={fieldTexts.weightTitle}
  />,
  <TextField
    key="heightField"
    name="height_in_cm"
    defaultValue={data.height_in_cm}
    keyboardType={phoneFieldType}
    onChangeText={handleOnChangeText}
    placeholder={fieldTexts.heightPlaceholder}
    title={fieldTexts.heightTitle}
  />
];
