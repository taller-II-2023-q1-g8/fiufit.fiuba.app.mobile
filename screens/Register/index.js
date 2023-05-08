import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import PropTypes from 'prop-types';
import { signInWithEmailAndPassword } from 'firebase/auth';

import {
  emailFieldType,
  numericFieldType,
  passwordFieldType,
  phoneFieldType
} from '../../components/Fields/constants';
import { registerRequest } from '../../requests';
import DateField from '../../components/Fields/DateField';
import SelectField from '../../components/Fields/SelectField';
import TextField from '../../components/Fields/TextField';
import texts from '../../texts';
import { auth } from '../../firebaseConfig';

import Register from './layout';
/*
var bcrypt = require("bcryptjs");
var salt = bcrypt.genSaltSync(10); */

const fieldTexts = texts.Fields;

const STEPS = 3;
const nextStep = (currentStep) => (currentStep >= STEPS - 2 ? STEPS - 1 : currentStep + 1);
const prevStep = (currentStep) => (currentStep <= 1 ? 0 : currentStep - 1);

export default function RegisterContainer() {
  const [currentStep, changeCurrentStep] = useState(0);
  const [step0Error, setStep0Error] = useState(false);
  const [step1Error, setStep1Error] = useState(false);

  const [birthdate, setBirthdate] = useState('');
  const [birthdateError, setBirthdateError] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [genderError, setGenderError] = useState('');
  const [loading, setLoading] = useState(false);
  const [mailError, setMailError] = useState('');
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [username, setUsername] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [lastname, setLastname] = useState('');
  const [lastnameError, setLastnameError] = useState('');
  const [heightError, setHeightError] = useState('');
  const [weightError, setWeightError] = useState('');

  const [submitError, setSubmitError] = useState(false);

  const resetErrors = () => {
    setBirthdateError('');
    setMailError('');
    setNameError('');
    setLastnameError('');
    setPasswordError('');
    setUsernameError('');
    setGenderError('');
    setPhoneError('');
  };

  const resetFieldValues = () => {
    setBirthdate('');
    setEmail('');
    setName('');
    setLastname('');
    setPassword('');
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

  const handleNextPressStep0 = async () => {
    resetErrors();
    setStep0Error(false);
    let mayAdvance = true;
    if (!username) {
      setUsernameError('Nombre de usuario obligatorio');
      mayAdvance = false;
    }
    if (!email) {
      setMailError('Email obligatorio');
      mayAdvance = false;
    }
    if (!password) {
      setPasswordError('Contraseña obligatoria');
      mayAdvance = false;
    }
    if (mayAdvance) {
      changeCurrentStep(nextStep(currentStep));
    } else {
      setStep0Error(true);
    }
  };

  const handleNextPressStep1 = async () => {
    resetErrors();
    setStep1Error(false);
    let mayAdvance = true;
    if (!name) {
      setNameError('Nombre obligatorio');
      mayAdvance = false;
    }
    if (!lastname) {
      setLastnameError('Es obligatorio ingresar apellido');
      mayAdvance = false;
    }
    if (!phone) {
      setPhoneError('Número de teléfono obligatorio');
      mayAdvance = false;
    }
    if (mayAdvance) {
      changeCurrentStep(nextStep(currentStep));
    } else {
      setStep1Error(true);
    }
  };

  const handlePrevPress = async () => {
    changeCurrentStep(prevStep(currentStep));
  };

  const handleSubmitPress = async () => {
    resetErrors();
    setSubmitError(false);
    let maySubmit = true;

    // if (!birthdate) {
    //  setBirthdateError('Fecha de nacimiento obligatoria');
    //  maySubmit = false;
    // }
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

    const values = {
      username,
      firstname: name,
      gender,
      email,
      phone_number: phone,
      lastname,
      birth_date: '1995-10-20',
      password,
      weight_in_kg: weight,
      height_in_cm: height,
      is_federated: false
    };
    try {
      /* const hash = bcrypt.hashSync(password, salt); */
      const response = await registerRequest(values);
      console.log(response);
      if (response.ok) {
        Alert.alert('Bienvenido', 'Registro exitoso');
        await signInWithEmailAndPassword(auth, email, password);
      } else Alert.alert('Error', 'Intente nuevamente');
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const formatDate = (date) => `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

  const handleOnBirthdateChange = (userBirthdate) => setBirthdate(formatDate(userBirthdate));
  const handleOnEmailChange = (userMail) => setEmail(userMail);
  const handleOnGenderChange = (userGender) => setGender(userGender);
  const handleOnNameChange = (userName) => setName(userName);
  const handleOnPasswordChange = (userPassword) => setPassword(userPassword);
  const handleOnPhoneChange = (userPhone) => setPhone(userPhone);
  const handleOnUsernameChange = (userUsername) => setUsername(userUsername);
  const handleOnLastNameChange = (lastName) => setLastname(lastName);
  const handleOnHeightChange = (userHeight) => setHeight(userHeight);
  const handleOnWeightChange = (userWeight) => setWeight(userWeight);

  const fields1 = [
    <TextField
      defaultValue={email}
      error={mailError}
      keyboardType={emailFieldType}
      onChangeText={handleOnEmailChange}
      placeholder={fieldTexts.emailPlaceholder}
      title={fieldTexts.emailTitle}
    />,
    <TextField
      defaultValue={username}
      error={usernameError}
      onChangeText={handleOnUsernameChange}
      placeholder={fieldTexts.usernamePlaceholder}
      title={fieldTexts.usernameTitle}
    />,
    <TextField
      defaultValue={password}
      error={passwordError}
      keyboardType={passwordFieldType}
      onChangeText={handleOnPasswordChange}
      placeholder={fieldTexts.passwordPlaceholder}
      title={fieldTexts.passwordTitle}
    />
  ];

  const fields2 = [
    <TextField
      defaultValue={name}
      error={nameError}
      onChangeText={handleOnNameChange}
      placeholder={fieldTexts.namePlaceholder}
      title={fieldTexts.nameTitle}
    />,
    <TextField
      defaultValue={lastname}
      error={lastnameError}
      onChangeText={handleOnLastNameChange}
      placeholder={fieldTexts.lastnamePlaceholder}
      title={fieldTexts.lastnameTitle}
    />,
    <SelectField
      defaultValue={gender}
      error={genderError}
      onChangeText={handleOnGenderChange}
      title={fieldTexts.genderTitle}
    />,
    <TextField
      defaultValue={phone}
      error={phoneError}
      keyboardType={phoneFieldType}
      onChangeText={handleOnPhoneChange}
      placeholder={fieldTexts.phonePlaceholder}
      title={fieldTexts.phoneTitle}
    />
  ];
  const fields3 = [
    <DateField error={birthdateError} onChangeText={handleOnBirthdateChange} />,
    <TextField
      defaultValue={height}
      error={heightError}
      onChangeText={handleOnHeightChange}
      placeholder={fieldTexts.heightPlaceholder}
      title={fieldTexts.heightTitle}
    />,
    <TextField
      defaultValue={weight}
      error={weightError}
      onChangeText={handleOnWeightChange}
      placeholder={fieldTexts.weightPlaceholder}
      title={fieldTexts.weightTitle}
    />
  ];

  return (
    <Register
      fields={[fields1, fields2, fields3]}
      handleSubmitPress={handleSubmitPress}
      submitError={submitError}
      secureTextEntry={false}
      loading={loading}
      currentStep={currentStep}
      handleNextPressStep0={handleNextPressStep0}
      handleNextPressStep1={handleNextPressStep1}
      step0Error={step0Error}
      step1Error={step1Error}
      handlePrevPress={handlePrevPress}
    />
  );
}

RegisterContainer.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  }).isRequired
};
