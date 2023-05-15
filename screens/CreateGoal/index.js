import { func, shape } from 'prop-types';
import React, { useEffect, useState } from 'react';

import TextField from '../../components/Fields/TextField';
import texts from '../../texts';
import DateField from '../../components/Fields/DateField';
import { useStateValue } from '../../utils/state/state';
import GenericSelectField from '../../components/Fields/GenericSelectField';
import { createGoalRequest } from '../../requests';

import CreateGoal from './layout';

export default function CreateGoalContainer({ navigation }) {
  const [state] = useStateValue();
  const [type, setType] = useState('max_weight_lifted_in_exercise');
  const [typeError, setTypeError] = useState('');
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState('');
  const [completionWeight, setCompletionWeight] = useState(0);
  const [completionPlans, setCompletionPlans] = useState(0);
  const [submitError, setSubmitError] = useState(false);

  const [deadline, setDeadline] = useState('');
  const [deadlineError, setDeadlineError] = useState('');

  const resetErrors = () => {
    setTypeError('');
    setTitleError('');
    setDeadlineError('');
  };

  const resetFieldValues = () => {
    setType('');
    setTitle('');
    setDeadline('');
  };

  useEffect(
    () => () => {
      resetFieldValues();
      resetErrors();
    },
    []
  );

  const handleSubmitPress = async () => {
    resetErrors();
    const values = {};
    const currentDate = new Date();
    const currentDatetimeISO = currentDate.toISOString();
    switch (type) {
      case 'max_weight_lifted_in_exercise':
        if (!completionWeight || !deadline || !title) {
          return setSubmitError(true);
        }
        values.type = type;
        values.starting_date = currentDatetimeISO;
        values.deadline = deadline;
        values.exercise_title = title;
        values.goal_weight_in_kg = completionWeight;
        values.username = state.user.username;

        break;
      case 'training_plan_completion':
        if (!completionPlans || !deadline) {
          return setSubmitError(true);
        }
        values.type = type;
        values.starting_date = currentDatetimeISO;
        values.deadline = deadline;
        values.goal_num_of_completions = completionPlans;
        values.username = state.user.username;
        break;
      default:
        return setSubmitError(true);
    }

    console.log('valores: ', values);
    await createGoalRequest(values)
      .then(() => {
        console.log('GOD');
      })
      .catch((error) => {
        console.log('Error:', error);
      });

    navigation.navigate(texts.PersonalGoals.name);
  };

  const handleOnTypeChange = (eType) => setType(eType);
  const handleOnTitleChange = (eTitle) => setTitle(eTitle);
  const handleOnDeadlineChange = (eDeadline) => setDeadline(eDeadline);
  const handleOnCompletionWeightChange = (weight) => setCompletionWeight(weight);
  const handleOnCompletionPlansChange = (plans) => setCompletionPlans(plans);

  const typeOptions = [
    { label: 'Máximo Peso Levantado', value: 'max_weight_lifted_in_exercise' },
    { label: 'Cantidad de Planes Completados', value: 'training_plan_completion' }
  ];
  const typeField = (
    <GenericSelectField title="Tipo de Meta" items={typeOptions} onChangeText={handleOnTypeChange} />
  );

  const exerciseTitleField = (
    <TextField
      defaultValue={title}
      error={titleError}
      onChangeText={handleOnTitleChange}
      placeholder={texts.Fields.goalExerciseTitlePlaceholder}
      title={texts.Fields.goalExerciseTitle}
    />
  );

  const completionWeightField = (
    <TextField
      defaultValue={completionWeight}
      onChangeText={handleOnCompletionWeightChange}
      placeholder={texts.Fields.goalCompletionWeightPlaceholder}
      title={texts.Fields.completionWeightTitle}
    />
  );

  const completionPlansField = (
    <TextField
      defaultValue={completionPlans}
      onChangeText={handleOnCompletionPlansChange}
      placeholder={texts.Fields.goalCompletionPlansPlaceholder}
      title={texts.Fields.completionPlansTitle}
    />
  );

  const deadlineField = (
    <DateField
      title={texts.Fields.deadlineTitle}
      placeholder={texts.Fields.deadlinePlaceholder}
      error={deadlineError}
      onChangeText={handleOnDeadlineChange}
    />
  );

  return (
    <CreateGoal
      type={type}
      typeField={typeField}
      exerciseTitleField={exerciseTitleField}
      completionWeightField={completionWeightField}
      completionPlansField={completionPlansField}
      deadlineField={deadlineField}
      handleOnTypeChange={handleOnTypeChange}
      handleOnTitleChange={handleOnTitleChange}
      handleOnDeadlineChange={handleOnDeadlineChange}
      handleSubmitPress={handleSubmitPress}
    />
  );
}

CreateGoalContainer.propTypes = {
  navigation: shape({
    navigate: func.isRequired
  }).isRequired
};
