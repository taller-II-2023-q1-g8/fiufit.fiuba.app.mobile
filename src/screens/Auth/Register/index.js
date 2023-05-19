import React, { useState } from 'react';
import { Alert } from 'react-native';
import PropTypes from 'prop-types';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { cloneDeep } from 'lodash';

import { auth } from '../../../../firebaseConfig';
import { registerRequest } from '../../../requests';

import Register from './layout';
import { fillErrors, formatDate, getFields, getStepsData, nextStep, prevStep, thereIsAnError } from './utils';
import { STEP_KEYS } from './constants';
/*
var bcrypt = require("bcryptjs");
var salt = bcrypt.genSaltSync(10); */

export default function RegisterContainer() {
  const [currentStep, changeCurrentStep] = useState(0);
  const [stepError, setStepError] = useState(false);
  const [loading, setLoading] = useState(false);
  const initialData = {
    birth_date: '',
    email: '',
    firstname: '',
    gender: '',
    height_in_cm: '',
    lastname: '',
    password: '',
    phone_number: '',
    username: '',
    weight_in_kg: ''
  };
  const [data, setData] = useState({ ...initialData, gender: 'female' });
  const [errors, setErrors] = useState(initialData);

  const handleOnChangeText = (name, value) => setData({ ...data, [name]: value });

  const setStepErrors = () => {
    const updatedErrors = cloneDeep(initialData);
    fillErrors(updatedErrors, STEP_KEYS[currentStep], data);
    setErrors(updatedErrors);
    setStepError(true);
  };

  const handlePrevPress = async () => {
    changeCurrentStep(prevStep(currentStep));
  };

  const handleNextStepPress = () => {
    setStepError(false);
    if (thereIsAnError(STEP_KEYS[currentStep], data)) {
      setStepErrors();
      return;
    }
    setErrors(initialData);
    changeCurrentStep(nextStep(currentStep));
  };

  const handleSubmitPress = async () => {
    setStepError(false);

    if (thereIsAnError(STEP_KEYS[currentStep], data)) {
      setStepErrors();
      return;
    }
    setErrors(initialData);

    setLoading(true);

    const values = {
      ...data,
      birth_date: formatDate(data.birth_date),
      is_federated: false
    };

    try {
      /* const hash = bcrypt.hashSync(password, salt); */
      const response = await registerRequest(values);
      if (response.ok) {
        Alert.alert('Bienvenido', 'Registro exitoso');
        await signInWithEmailAndPassword(auth, data.email, data.password);
      } else Alert.alert('Error', 'Intente nuevamente');
    } catch (error) {
      // console.log(error);
    }
    setLoading(false);
  };

  const fields = getFields(data, errors, handleOnChangeText);

  const stepData = getStepsData(handleNextStepPress, handlePrevPress, handleSubmitPress);

  return (
    <Register
      currentStep={currentStep}
      loading={loading}
      stepError={stepError}
      stepsData={stepData}
      stepsFields={fields}
    />
  );
}

RegisterContainer.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  }).isRequired
};
