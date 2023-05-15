import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import PropTypes from 'prop-types';
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

import {
  emailFieldType,
  passwordFieldType,
  phoneFieldType,
  textFieldType
} from '../../components/Fields/constants';
import { fetchUserByEmail, fetchUsersByUsername, registerRequest } from '../../requests';
import DateField from '../../components/Fields/DateField';
import SelectField from '../../components/Fields/SelectField';
import TextField from '../../components/Fields/TextField';
import texts from '../../texts';
import { auth } from '../../firebaseConfig';

import FederatedRegister from './layout';
/*
var bcrypt = require("bcryptjs");
var salt = bcrypt.genSaltSync(10); */

const fieldTexts = texts.Fields;

export default function FederatedRegisterContainer() {
  const [currentStep, changeCurrentStep] = useState(0);
  const [birthdate, setBirthdate] = useState('');
  const [birthdateError, setBirthdateError] = useState('');
  const [gender, setGender] = useState('');
  const [genderError, setGenderError] = useState('');
  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [username, setUsername] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [height, setHeight] = useState(0);
  const [weight, setWeight] = useState(0);
  const [heightError, setHeightError] = useState('');
  const [weightError, setWeightError] = useState('');
  const [step1Error, setStep1Error] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const resetErrors = () => {
    setBirthdateError('');
    setUsernameError('');
    setGenderError('');
    setPhoneError('');
  };

  const resetFieldValues = () => {
    setBirthdate('');
    setGender('');
    setUsername('');
    setPhone('');
  };

  useEffect(
    () => () => {
      resetFieldValues();
      resetErrors();
    },
    []
  );
  const handleNextPress = async () => {
    resetErrors();
    setStep1Error(false);
    let mayAdvance = true;
    if (!username) {
      setUsernameError('Nombre de usuario obligatorio');
      mayAdvance = false;
    }
    const response = await fetchUsersByUsername(username);
    const json = await response.json();
    if (json.message != null) {
      setUsernameError('Nombre de usuario en uso');
      mayAdvance = false;
    }

    if (!phone) {
      setPhoneError('Número de teléfono obligatorio');
      mayAdvance = false;
    }
    if (!birthdate) {
      setBirthdateError('Fecha de nacimiento obligatoria');
      mayAdvance = false;
    }
    if (mayAdvance) {
      changeCurrentStep(currentStep + 1);
    } else {
      setStep1Error(true);
    }
  };
  const handlePreviousPress = () => {
    changeCurrentStep(currentStep - 1);
  };
  const handleSubmitPress = async () => {
    resetErrors();
    setSubmitError(false);
    let maySubmit = true;
    if (!height) {
      setHeightError('Es obligatorio ingresar altura');
      maySubmit = false;
    }
    if (!weight) {
      setWeightError('Es obligatorio ingresar peso');
      maySubmit = false;
    }
    if (!maySubmit) return setSubmitError(true);
    setLoading(true);
    const user = await GoogleSignin.getCurrentUser();
    const values = {
      username,
      firstname: user.user.givenName,
      gender,
      email: user.user.email,
      phone_number: phone,
      lastname: user.user.familyName,
      birth_date: birthdate,
      password: '',
      weight_in_kg: weight,
      height_in_cm: height,
      is_federated: true
    };
    // Ver como necesita el back weight y height
    console.log(values);
    try {
      /* const hash = bcrypt.hashSync(password, salt); */
      const response = await registerRequest(values);
      console.log(response);
      if (response.ok) {
        Alert.alert('Bienvenido', 'Registro exitoso');
        const googleCredential = GoogleAuthProvider.credential(user.idToken);
        // Sign-in the user with the credential
        await signInWithCredential(auth, googleCredential);
      } else Alert.alert('Error', 'Intente nuevamente');
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const formatDate = (date) => `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

  const handleOnBirthdateChange = (userBirthdate) => setBirthdate(formatDate(userBirthdate));
  const handleOnGenderChange = (userGender) => setGender(userGender);
  const handleOnPhoneChange = (userPhone) => setPhone(userPhone);
  const handleOnUsernameChange = (userUsername) => setUsername(userUsername);
  const handleOnHeightChange = (userHeight) => setHeight(parseInt(userHeight, 10));
  const handleOnWeightChange = (userWeight) => setWeight(parseInt(userWeight, 10));
  const step1 = [
    <TextField
      error={usernameError}
      keyboardType={textFieldType}
      onChangeText={handleOnUsernameChange}
      placeholder={fieldTexts.usernamePlaceholder}
      title={fieldTexts.usernameTitle}
    />,
    <DateField
      title={texts.Fields.birthdateTitle}
      placeholder={texts.Fields.birthdatePlaceholder}
      error={birthdateError}
      onChangeText={handleOnBirthdateChange}
    />,
    <SelectField error={genderError} onChangeText={handleOnGenderChange} title={fieldTexts.genderTitle} />,
    <TextField
      error={phoneError}
      keyboardType={phoneFieldType}
      onChangeText={handleOnPhoneChange}
      placeholder={fieldTexts.phonePlaceholder}
      title={fieldTexts.phoneTitle}
    />
  ];
  const step2 = [
    <TextField
      defaultValue={height}
      error={heightError}
      keyboardType={phoneFieldType}
      onChangeText={handleOnHeightChange}
      placeholder={fieldTexts.heightPlaceholder}
      title={fieldTexts.heightTitle}
    />,
    <TextField
      defaultValue={weight}
      error={weightError}
      keyboardType={phoneFieldType}
      onChangeText={handleOnWeightChange}
      placeholder={fieldTexts.weightPlaceholder}
      title={fieldTexts.weightTitle}
    />
  ];

  return (
    <FederatedRegister
      step1={step1}
      step2={step2}
      step1Error={step1Error}
      submitError={submitError}
      handleNextPress={handleNextPress}
      handlePreviousPress={handlePreviousPress}
      currentStep={currentStep}
      handleSubmitPress={handleSubmitPress}
      loading={loading}
    />
  );
}

FederatedRegisterContainer.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  }).isRequired
};
