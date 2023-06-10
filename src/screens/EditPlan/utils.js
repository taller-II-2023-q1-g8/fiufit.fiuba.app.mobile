import React from 'react';

import TextField from '../../components/Fields/TextField';
import texts from '../../texts';
import GenericSelectField from '../../components/Fields/GenericSelectField';

const difficulties = [
  { label: 'Facil', value: 'EASY' },
  { label: 'Normal', value: 'NORMAL' },
  { label: 'Dificil', value: 'HARD' }
];

export const getFields = (errors, values, handleOnChangeText) => [
  <TextField
    error={errors.title}
    name="title"
    onChangeText={handleOnChangeText}
    placeholder={values.title}
    title={texts.Fields.planTitle}
  />,
  <TextField
    error={errors.description}
    name="description"
    onChangeText={handleOnChangeText}
    placeholder={values.description}
    title={texts.Fields.planDescription}
  />,
  <TextField
    error={errors.tags}
    name="tags"
    onChangeText={handleOnChangeText}
    placeholder={values.tags}
    title={texts.Fields.planTags}
  />,
  <GenericSelectField
    items={difficulties}
    name="difficulty"
    onChangeText={handleOnChangeText}
    title="Dificultad"
  />
];
