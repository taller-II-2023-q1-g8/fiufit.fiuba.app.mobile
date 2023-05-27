import { func, shape } from 'prop-types';
import React, { useState } from 'react';
import { cloneDeep } from 'lodash';

import texts from '../../texts';
import { useStateValue } from '../../state';
import { createPlanRequest } from '../../requests';

import CreatePlan from './layout';
import { getFields } from './utils';

export default function CreatePlanContainer({ navigation }) {
  const [state, dispatch] = useStateValue();
  const initialData = { title: '', description: '', tags: '', difficulty: '' };
  const [data, setData] = useState({ ...initialData, difficulty: 'EASY' });
  const [errors, setErrors] = useState(initialData);
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

    const values = { ...data, trainer_id: state.user.username };
    await createPlanRequest(values)
      .then((result) => {
        if (!result.ok) return;
        dispatch({ type: 'addPlansData', newPlanData: values });
      })
      .catch((error) => {
        console.log('Error:', error);
      });
    setLoading(false);
    navigation.navigate(texts.TrainerHome.iconTitle);
  };

  const fields = getFields(errors, handleOnChangeText);

  return <CreatePlan fields={fields} handleSubmitPress={handleSubmitPress} loading={loading} />;
}

CreatePlanContainer.propTypes = {
  navigation: shape({
    navigate: func.isRequired
  }).isRequired
};
