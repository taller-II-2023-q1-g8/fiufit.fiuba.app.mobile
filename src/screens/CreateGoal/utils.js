import React from 'react';

import TextField from '../../components/Fields/TextField';
import texts from '../../texts';
import DateField from '../../components/Fields/DateField';
import GenericSelectField from '../../components/Fields/GenericSelectField';

const typeOptions = [
  { label: 'Máximo Peso Levantado', value: 'max_weight_lifted_in_exercise' },
  { label: 'Cantidad de Planes Completados', value: 'training_plan_completion' },
  { label: 'Cantidad de Pasos Dados', value: 'total_steps_taken' },
  { label: 'Distancia Recorrida', value: 'total_distance_travelled' }
];

export const getFields = (data, handleOnChangeText) => {
  const specificFields = [
    <GenericSelectField
      items={typeOptions}
      name="type"
      onChangeText={handleOnChangeText}
      title="Tipo de Meta"
    />
  ];

  switch (data.type) {
    case 'max_weight_lifted_in_exercise':
      specificFields.push(
        <TextField
          name="exercise_title"
          onChangeText={handleOnChangeText}
          placeholder={texts.Fields.goalExerciseTitlePlaceholder}
          title={texts.Fields.goalExerciseTitle}
        />
      );
      specificFields.push(
        <TextField
          name="goal_weight_in_kg"
          onChangeText={handleOnChangeText}
          placeholder={texts.Fields.goalCompletionWeightPlaceholder}
          title={texts.Fields.completionWeightTitle}
        />
      );
      break;

    case 'training_plan_completion':
      specificFields.push(
        <TextField
          name="goal_num_of_completions"
          onChangeText={handleOnChangeText}
          placeholder={texts.Fields.goalCompletionPlansPlaceholder}
          title={texts.Fields.completionPlansTitle}
        />
      );
      break;

    case 'total_steps_taken':
      specificFields.push(
        <TextField
          name="goal_num_of_steps"
          onChangeText={handleOnChangeText}
          placeholder={texts.Fields.goalStepsPlaceholder}
          title={texts.Fields.completionStepsTitle}
        />
      );
      break;

    case 'total_distance_travelled':
      specificFields.push(
        <TextField
          name="goal_distance_in_meters"
          onChangeText={handleOnChangeText}
          placeholder={texts.Fields.goalDistancePlaceholder}
          title={texts.Fields.completionDistanceTitle}
        />
      );
      break;
    default:
      break;
  }
  specificFields.push(
    <DateField
      name="deadline"
      onChangeText={handleOnChangeText}
      placeholder={texts.Fields.deadlinePlaceholder}
      title={texts.Fields.deadlineTitle}
    />
  );

  return specificFields;
};
// export const getFields = (data, handleOnChangeText) => [
//   <GenericSelectField
//     items={typeOptions}
//     name="type"
//     onChangeText={handleOnChangeText}
//     title="Tipo de Meta"
//   />,
//   ... switch(data.type)
//      [
//         <TextField
//           name="exercise_title"
//           onChangeText={handleOnChangeText}
//           placeholder={texts.Fields.goalExerciseTitlePlaceholder}
//           title={texts.Fields.goalExerciseTitle}
//         />,
//         <TextField
//           name="goal_weight_in_kg"
//           onChangeText={handleOnChangeText}
//           placeholder={texts.Fields.goalCompletionWeightPlaceholder}
//           title={texts.Fields.completionWeightTitle}
//         />
//       ]
//       (data.type === 'max_weight_lifted_in_exercise') &&
//       [
//         <TextField
//           name="goal_num_of_completions"
//           onChangeText={handleOnChangeText}
//           placeholder={texts.Fields.goalCompletionPlansPlaceholder}
//           title={texts.Fields.completionPlansTitle}
//         />
//       ],
//   <DateField
//     name="deadline"
//     onChangeText={handleOnChangeText}
//     placeholder={texts.Fields.deadlinePlaceholder}
//     title={texts.Fields.deadlineTitle}
//   />
// ];
