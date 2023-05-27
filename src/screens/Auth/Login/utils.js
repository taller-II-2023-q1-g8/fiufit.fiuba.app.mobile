import React from 'react';

import TextField from '../../../components/Fields/TextField';
import {
  EMAIL_KEY,
  emailFieldType,
  PASSWORD_KEY,
  passwordFieldType
} from '../../../components/Fields/constants';
import texts from '../../../texts';

const fieldTexts = texts.Fields;

export const getFields = (handleOnChangeText, errors) => [
  {
    key: EMAIL_KEY,
    field: (
      <TextField
        error={errors.email}
        keyboardType={emailFieldType}
        name="email"
        onChangeText={handleOnChangeText}
        placeholder={fieldTexts.emailPlaceholder}
        title={fieldTexts.emailTitle}
      />
    )
  },
  {
    key: PASSWORD_KEY,
    field: (
      <TextField
        error={errors.password}
        keyboardType={passwordFieldType}
        name="password"
        onChangeText={handleOnChangeText}
        placeholder={fieldTexts.passwordPlaceholder}
        title={fieldTexts.passwordTitle}
      />
    )
  }
];
