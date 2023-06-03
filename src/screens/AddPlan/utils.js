import React from 'react';

import TextField from '../../components/Fields/TextField';
import texts from '../../texts';
import GenericSelectField from '../../components/Fields/GenericSelectField';

const difficulties = [
  { label: 'Facil', value: 'EASY' },
  { label: 'Normal', value: 'NORMAL' },
  { label: 'Dificil', value: 'HARD' }
];

export const getFields = (errors, handleOnChangeText) => [
  <TextField
    error={errors.title}
    name="title"
    onChangeText={handleOnChangeText}
    placeholder={texts.Fields.planTitlePlaceholder}
    title={texts.Fields.planTitle}
  />,
  <TextField
    error={errors.description}
    name="description"
    onChangeText={handleOnChangeText}
    placeholder={texts.Fields.planDescriptionPlaceholder}
    title={texts.Fields.planDescription}
  />,
  <TextField
    error={errors.tags}
    name="tags"
    onChangeText={handleOnChangeText}
    placeholder={texts.Fields.planTagsPlaceholder}
    title={texts.Fields.planTags}
  />,
  <GenericSelectField
    items={difficulties}
    name="difficulty"
    onChangeText={handleOnChangeText}
    title="Dificultad"
  />
];