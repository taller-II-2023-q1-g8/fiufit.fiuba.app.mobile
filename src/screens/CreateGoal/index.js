import { func, shape } from 'prop-types';
import React, { useState } from 'react';
import { cloneDeep } from 'lodash';

import texts from '../../texts';
import { useStateValue } from '../../state';
import { createGoalRequest, fetchGoalByID } from '../../requests';

import CreateGoal from './layout';
import { getFields } from './utils';

export default function CreateGoalContainer({ navigation }) {
  const [state, dispatch] = useStateValue();
  const initialData = {
    type: 'max_weight_lifted_in_exercise',
    exercise_title: '',
    goal_weight_in_kg: 0,
    goal_num_of_completions: 0,
    deadline: ''
  };
  const [data, setData] = useState(initialData);

  const handleOnChangeText = (name, value) => setData({ ...data, [name]: value });

  const thereIsAnError = (values) => Object.keys(values).find((key) => values[key] === '');

  const handleSubmitPress = async () => {
    const currentDate = new Date();
    const currentDatetimeISO = currentDate.toISOString();

    const values = {
      ...cloneDeep(data),
      starting_date: currentDatetimeISO,
      username: state.user.username
    };

    if (data.type === 'max_weight_lifted_in_exercise') {
      delete values.completionPlans;
    } else {
      delete values.exercise_title;
      delete values.goal_weight_in_kg;
    }

    // Falta implementar errores
    if (thereIsAnError(values)) return;

    const createGoalResponse = await createGoalRequest(values);
    if (!createGoalResponse.ok) return;
    const createGoalJson = await createGoalResponse.json();
    const getGoalResponse = await fetchGoalByID(createGoalJson.message);
    if (!getGoalResponse.ok) return;
    const getGoalJson = await getGoalResponse.json();

    const newState = state.userGoals;
    newState.push(getGoalJson.message);
    dispatch({
      type: 'addNewGoal',
      userGoals: newState
    });

    navigation.navigate(texts.PersonalGoals.name);
  };

  const fields = getFields(data, handleOnChangeText);

  return <CreateGoal fields={fields} handleSubmitPress={handleSubmitPress} />;
}

CreateGoalContainer.propTypes = {
  navigation: shape({
    navigate: func.isRequired
  }).isRequired
};
