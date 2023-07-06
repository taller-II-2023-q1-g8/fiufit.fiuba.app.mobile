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
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(false);
  const initialData = {
    type: 'max_weight_lifted_in_exercise',
    exercise_title: '',
    goal_weight_in_kg: 0,
    goal_num_of_completions: 0,
    goal_distance_in_meters: 0,
    goal_num_of_steps: 0,
    deadline: ''
  };
  const [data, setData] = useState(initialData);

  const handleOnChangeText = (name, value) => setData({ ...data, [name]: value });

  const thereIsAnError = (values) => Object.keys(values).find((key) => values[key] === '');

  const handleSubmitPress = async () => {
    setLoading(true);
    const currentDate = new Date();
    const currentDatetimeISO = currentDate.toISOString();

    const values = {
      ...cloneDeep(data),
      starting_date: currentDatetimeISO,
      username: state.user.username
    };

    if (data.type === 'max_weight_lifted_in_exercise') {
      delete values.completionPlans;
      delete values.goal_num_of_steps;
      delete values.goal_distance_in_meters;
    } else if (data.type === 'training_plan_completion') {
      delete values.exercise_title;
      delete values.goal_weight_in_kg;
      delete values.goal_num_of_steps;
      delete values.goal_distance_in_meters;
    } else if (data.type === 'total_steps_taken') {
      delete values.completionPlans;
      delete values.exercise_title;
      delete values.goal_weight_in_kg;
      delete values.goal_distance_in_meters;
    } else if (data.type === 'total_distance_travelled') {
      delete values.completionPlans;
      delete values.exercise_title;
      delete values.goal_weight_in_kg;
      delete values.goal_num_of_steps;
    }

    console.log(data);
    // Falta implementar errores
    if (thereIsAnError(values)) {
      setLoading(false);
      return;
    }

    try {
      const createGoalResponse = await createGoalRequest(values);
      const createGoalJson = await createGoalResponse.json();
      const getGoalResponse = await fetchGoalByID(createGoalJson.message);
      const getGoalJson = await getGoalResponse.json();

      dispatch({
        type: 'addNewGoal',
        newGoal: getGoalJson.message
      });

      navigation.navigate(texts.PersonalGoals.name);
    } catch (error) {
      alert('No se pudo crear la meta');
    }
    setLoading(false);
    navigation.navigate(texts.PersonalGoals.name);
  };

  const fields = getFields(data, handleOnChangeText);

  return <CreateGoal loading={loading} fields={fields} handleSubmitPress={handleSubmitPress} />;
}

CreateGoalContainer.propTypes = {
  navigation: shape({
    navigate: func.isRequired
  }).isRequired
};
