import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import PropTypes from 'prop-types';
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

import { emailFieldType, passwordFieldType, phoneFieldType } from '../../components/Fields/constants';
import { registerRequest } from '../../requests';
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
  const handleNextPress = () => {
    changeCurrentStep(currentStep + 1);
  };
  const handlePreviousPress = () => {
    changeCurrentStep(currentStep - 1);
  };
  const handleSubmitPress = async () => {
    resetErrors();
    if (!birthdate) {
      setBirthdateError('Fecha de nacimiento obligatoria');
      return;
    }
    if (!username) {
      setUsernameError('Nombre de usuario obligatorio');
      return;
    }
    if (!phone) {
      setPhoneError('Número de teléfono obligatorio');
      return;
    }
    if (!height) {
      setHeightError('Es obligatorio ingresar altura');
      return;
    }
    if (!weight) {
      setWeightError('Es obligatorio ingresar peso');
      return;
    }
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
  const handleOnHeightChange = (userHeight) => setHeight(userHeight);
  const handleOnWeightChange = (userWeight) => setWeight(userWeight);
  const step1 = [
    <TextField
      error={usernameError}
      onChangeText={handleOnUsernameChange}
      placeholder={fieldTexts.usernamePlaceholder}
      title={fieldTexts.usernameTitle}
    />,
    <DateField error={birthdateError} onChangeText={handleOnBirthdateChange} />,
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
