import { func, shape } from 'prop-types';
import React, { useState } from 'react';
import { cloneDeep } from 'lodash';

import texts from '../../texts';
import { useStateValue } from '../../state';
import { editPlanRequest } from '../../requests';

import CreatePlan from './layout';
import { getFields } from './utils';

export default function EditPlanScreen({ route, navigation }) {
  const { plan } = route.params;
  const [state, dispatch] = useStateValue();
  const initialData = {
    title: plan.title,
    description: plan.description,
    tags: plan.tags,
    difficulty: plan.difficulty
  };
  const [data, setData] = useState(initialData);
  const [errors, setErrors] = useState({ title: '', description: '', tags: '', difficulty: '' });
  const [loading, setLoading] = useState(false);

  const handleOnChangeText = (name, value) => setData({ ...data, [name]: value });

  const thereIsAnError = () => Object.keys(errors).find((key) => data[key] === '');

  const fillErrors = (updatedErrors) =>
    Object.keys(errors).forEach((key) => {
      if (data[key] === '') updatedErrors[key] = 'Campo obligatorio';
    });

  const handleSubmitPress = async () => {
    const updatedErrors = cloneDeep(initialData);

    if (thereIsAnError()) {
      fillErrors(updatedErrors);
      setErrors(updatedErrors);
      return;
    }

    setLoading(true);

    const values = { ...data, trainer_username: state.user.username };
    await editPlanRequest(values, plan.id)
      .then(async (result) => {
        if (!result.ok) return;
        const itemData = await result.json();
        dispatch({ type: 'addPlansData', newPlanData: itemData });
        navigation.navigate(texts.TrainerPlanView.name, { itemData });
      })
      .catch((error) => {
        console.log('Error:', error);
      });
    setLoading(false);
  };

  const fields = getFields(errors, initialData, handleOnChangeText);

  return <CreatePlan fields={fields} handleSubmitPress={handleSubmitPress} loading={loading} />;
}

EditPlanScreen.propTypes = {
  route: shape({
    params: shape.isRequired
  }).isRequired,
  navigation: shape({
    navigate: func.isRequired
  }).isRequired
};
