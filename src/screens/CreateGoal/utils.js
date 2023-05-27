import React from 'react';

import TextField from '../../components/Fields/TextField';
import texts from '../../texts';
import DateField from '../../components/Fields/DateField';
import GenericSelectField from '../../components/Fields/GenericSelectField';

const typeOptions = [
  { label: 'Máximo Peso Levantado', value: 'max_weight_lifted_in_exercise' },
  { label: 'Cantidad de Planes Completados', value: 'training_plan_completion' }
];

export const getFields = (data, handleOnChangeText) => [
  <GenericSelectField
    items={typeOptions}
    name="type"
    onChangeText={handleOnChangeText}
    title="Tipo de Meta"
  />,
  ...(data.type === 'max_weight_lifted_in_exercise'
    ? [
        <TextField
          name="exercise_title"
          onChangeText={handleOnChangeText}
          placeholder={texts.Fields.goalExerciseTitlePlaceholder}
          title={texts.Fields.goalExerciseTitle}
        />,
        <TextField
          name="goal_weight_in_kg"
          onChangeText={handleOnChangeText}
          placeholder={texts.Fields.goalCompletionWeightPlaceholder}
          title={texts.Fields.completionWeightTitle}
        />
      ]
    : [
        <TextField
          name="goal_num_of_completions"
          onChangeText={handleOnChangeText}
          placeholder={texts.Fields.goalCompletionPlansPlaceholder}
          title={texts.Fields.completionPlansTitle}
        />
      ]),
  <DateField
    name="deadline"
    onChangeText={handleOnChangeText}
    placeholder={texts.Fields.deadlinePlaceholder}
    title={texts.Fields.deadlineTitle}
  />
];
