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
    key="usernameField"
    name="username"
    defaultValue={data.username}
    onChangeText={handleOnChangeText}
    placeholder={fieldTexts.usernamePlaceholder}
    title={fieldTexts.usernameTitle}
  />,
  <TextField
    key="emailField"
    name="email"
    defaultValue={data.email}
    keyboardType={emailFieldType}
    onChangeText={handleOnChangeText}
    placeholder={fieldTexts.emailPlaceholder}
    title={fieldTexts.emailTitle}
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
  />
];
