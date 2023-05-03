import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import PropTypes from 'prop-types';
import { signInWithEmailAndPassword } from 'firebase/auth';

import { emailFieldType, passwordFieldType, phoneFieldType } from '../../components/Fields/constants';
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

export default function RegisterContainer() {
  const [birthdate, setBirthdate] = useState('');
  const [birthdateError, setBirthdateError] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
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

  const resetErrors = () => {
    setBirthdateError('');
    setMailError('');
    setNameError('');
    setPasswordError('');
    setUsernameError('');
    setGenderError('');
    setPhoneError('');
  };

  const resetFieldValues = () => {
    setBirthdate('');
    setEmail('');
    setName('');
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

  const handleSubmitPress = async () => {
    resetErrors();
    if (!name) {
      setNameError('Nombre obligatorio');
      return;
    }
    if (!email) {
      setMailError('Email obligatorio');
      return;
    }
    if (!password) {
      setPasswordError('Contraseña obligatoria');
      return;
    }
    // if (!birthdate) {
    //   setBirthdateError('Fecha de nacimiento obligatoria');
    //   return;
    // }
    if (!username) {
      setUsernameError('Nombre de usuario obligatorio');
      return;
    }
    if (!phone) {
      setPhoneError('Número de teléfono obligatorio');
      return;
    }
    setLoading(true);

    const values = {
      username,
      firstname: name,
      gender,
      email,
      phone_number: phone,
      lastname: 'biachi',
      birth_date: '1995-10-20',
      password,
      weight_in_kg: 8,
      height_in_cm: 5,
      is_federated: false
    };
    try {
      /* const hash = bcrypt.hashSync(password, salt); */
      const response = await registerRequest(values);
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

  const fields = [
    <TextField
      error={nameError}
      onChangeText={handleOnNameChange}
      placeholder={fieldTexts.namePlaceholder}
      title={fieldTexts.nameTitle}
    />,
    <TextField
      error={usernameError}
      onChangeText={handleOnUsernameChange}
      placeholder={fieldTexts.usernamePlaceholder}
      title={fieldTexts.usernameTitle}
    />,
    <TextField
      error={mailError}
      keyboardType={emailFieldType}
      onChangeText={handleOnEmailChange}
      placeholder={fieldTexts.emailPlaceholder}
      title={fieldTexts.emailTitle}
    />,
    <TextField
      error={passwordError}
      keyboardType={passwordFieldType}
      onChangeText={handleOnPasswordChange}
      placeholder={fieldTexts.passwordPlaceholder}
      title={fieldTexts.passwordTitle}
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

  return <Register fields={fields} handleSubmitPress={handleSubmitPress} loading={loading} />;
}

RegisterContainer.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  }).isRequired
};
