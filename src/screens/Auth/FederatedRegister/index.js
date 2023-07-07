import React, { useState } from 'react';
import { Alert } from 'react-native';
import PropTypes from 'prop-types';
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { cloneDeep } from 'lodash';

import {
  fetchUserByUsername,
  fetchUserProfileByUsername,
  registerAthlete,
  registerRequest,
  serviceState
} from '../../../requests';
import { auth } from '../../../../firebaseConfig';
import { useStateValue } from '../../../state';

import FederatedRegister from './layout';
import { STEP_KEYS } from './constants';
import { fillErrors, formatDate, getFields, getStepsData, nextStep, prevStep, thereIsAnError } from './utils';

/*
var bcrypt = require("bcryptjs");
var salt = bcrypt.genSaltSync(10); */

export default function FederatedRegisterContainer() {
  const [currentStep, changeCurrentStep] = useState(0);
  const [stepError, setStepError] = useState(false);
  const [loading, setLoading] = useState(false);
  const initialData = {
    birth_date: '',
    gender: '',
    height_in_cm: '',
    phone_number: '',
    username: '',
    weight_in_kg: ''
  };
  const [data, setData] = useState({ ...initialData, gender: 'female' });
  const [errors, setErrors] = useState(initialData);
  const [currentTag, setCurrentTag] = useState('ABS');
  const [tags, setTags] = useState([]);
  const [, dispatch] = useStateValue();
  const handleOnChangeText = (name, value) => setData({ ...data, [name]: value });

  const handleOnChangeTags = (name, value) => {
    console.log(value);
    setCurrentTag(value);
  };
  const handleOnAddTag = () => {
    if (tags.includes(currentTag)) {
      console.log('Error, tag ya usado');
    } else {
      setTags((oldTags) => [...oldTags, currentTag]);
      console.log(tags);
    }
  };
  const handleOnDeleteTag = (tagToDelete) => {
    setTags(tags.filter((tag) => tag !== tagToDelete));
    console.log(tags);
  };

  const setStepErrors = () => {
    const updatedErrors = cloneDeep(initialData);
    fillErrors(updatedErrors, STEP_KEYS[currentStep], data);
    setErrors(updatedErrors);
    setStepError(true);
  };

  const handleNextStepPress = async () => {
    setStepError(false);

    if (thereIsAnError(STEP_KEYS[currentStep], data)) {
      setStepErrors();
      return;
    }

    const response = await fetchUserProfileByUsername(data.username);
    const rJ = await response.json();
    if (rJ.message !== null) {
      setErrors({ ...initialData, username: 'Nombre de usuario en uso' });
      setStepError(true);
      return;
    }

    setErrors(initialData);

    changeCurrentStep(nextStep(currentStep));
  };

  const handlePreviousStepPress = () => {
    changeCurrentStep(prevStep(currentStep));
    setData(initialData);
    setErrors(initialData);
  };

  const registerUser = async () => {
    setLoading(true);
    const user = await GoogleSignin.getCurrentUser();
    const values = {
      ...data,
      birth_date: formatDate(data.birth_date),
      firstname: user.user.givenName,
      email: user.user.email,
      lastname: user.user.familyName,
      is_federated: true,
      interests: tags,
      is_admin: false,
      password: 'noimporta'
    };

    try {
      /* const hash = bcrypt.hashSync(password, salt); */
      const a = await serviceState('Users');
      const ajs = await a.json();
      const b = await serviceState('Plans');
      const bjs = await b.json();
      setLoading(false);
      if (a.status !== 200 || b.status !== 200) {
        Alert.alert('Error', 'Servicios bloqueados intente nuevamente mas tarde');
        setLoading(false);
        return;
      }
      const response = await registerRequest(values);
      if (response.ok) {
        const r = await registerAthlete(data.username);
        const googleCredential = GoogleAuthProvider.credential(user.idToken);
        // Sign-in the user with the credential
        dispatch({ type: 'logIn', automaticallyLogged: 'false' });
        await signInWithCredential(auth, googleCredential);
      } else Alert.alert('Error', 'Intente nuevamente');
    } catch (error) {
      // console.log(error);
    }
    setLoading(false);
  };

  const handleSubmitPress = async () => {
    setStepError(false);
    if (thereIsAnError(STEP_KEYS[currentStep], data)) {
      setStepErrors();
      return;
    }
    setErrors(initialData);

    registerUser();
  };

  const fields = getFields(
    data,
    errors,
    handleOnChangeText,
    tags,
    handleOnChangeTags,
    handleOnAddTag,
    handleOnDeleteTag
  );

  const stepData = getStepsData(handleNextStepPress, handlePreviousStepPress, handleSubmitPress);

  return (
    <FederatedRegister
      currentStep={currentStep}
      loading={loading}
      stepError={stepError}
      stepsData={stepData}
      stepsFields={fields}
    />
  );
}

FederatedRegisterContainer.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  }).isRequired
};
