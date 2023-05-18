import React, { useState } from 'react';
import { Alert } from 'react-native';
import PropTypes from 'prop-types';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { cloneDeep } from 'lodash';

import { registerRequest } from '../../requests';
import { auth } from '../../firebaseConfig';

import Register from './layout';
import { getFields, getStepsData } from './utils';
import { STEP_KEYS } from './constants';
/*
var bcrypt = require("bcryptjs");
var salt = bcrypt.genSaltSync(10); */

const nextStep = (currentStep) => currentStep + 1;
const prevStep = (currentStep) => (currentStep > 0 ? currentStep - 1 : 0);

export default function RegisterContainer() {
  const [currentStep, changeCurrentStep] = useState(0);
  const [stepError, setStepError] = useState(false);
  const [loading, setLoading] = useState(false);
  const initialData = {
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
  const [data, setData] = useState(initialData);
  const [errors, setErrors] = useState(initialData);

  const handleOnChangeText = (name, value) => setData({ ...data, [name]: value });

  const thereIsAnError = (keysToFilter) => keysToFilter.find((key) => data[key] === '');

  const fillErrors = (updatedErrors, keysToFilter) =>
    keysToFilter.forEach((key) => {
      if (data[key] === '') updatedErrors[key] = 'Campo obligatorio';
    });

  const handlePrevPress = async () => {
    changeCurrentStep(prevStep(currentStep));
  };

  const handleNextStepPress = () => {
    setStepError(false);
    const updatedErrors = cloneDeep(initialData);
    if (thereIsAnError(STEP_KEYS[currentStep])) {
      fillErrors(updatedErrors, STEP_KEYS[currentStep]);
      setErrors(updatedErrors);
      setStepError(true);
      return;
    }
    setErrors(initialData);
    changeCurrentStep(nextStep(currentStep));
  };

  const handleSubmitPress = async () => {
    setStepError(false);

    const updatedErrors = cloneDeep(initialData);

    if (thereIsAnError(STEP_KEYS[currentStep])) {
      fillErrors(updatedErrors, STEP_KEYS[currentStep]);
      setErrors(updatedErrors);
      setStepError(true);
      return;
    }
    setErrors(initialData);

    setLoading(true);

    const values = {
      ...data,
      birth_date: '1995-10-20',
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

  // const formatDate = (date) => `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

  // const handleOnBirthdateChange = (userBirthdate) => setBirthdate(formatDate(userBirthdate));

  const handleOnGenderChange = (userGender) => setData({ ...data, gender: userGender });

  const fields = getFields(data, errors, handleOnChangeText, handleOnGenderChange);

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
