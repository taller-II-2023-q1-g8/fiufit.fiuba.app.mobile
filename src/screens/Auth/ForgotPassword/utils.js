import React from 'react';

import { EMAIL_KEY, emailFieldType } from '../../../components/Fields/constants';
import TextField from '../../../components/Fields/TextField';
import texts from '../../../texts';

const fieldTexts = texts.Fields;

export const getField = (handleOnEmailChange, mailError) => ({
  key: EMAIL_KEY,
  field: (
    <TextField
      error={mailError}
      name="email"
      keyboardType={emailFieldType}
      onChangeText={handleOnEmailChange}
      placeholder={fieldTexts.emailPlaceholder}
      title={fieldTexts.emailTitle}
    />
  )
});
