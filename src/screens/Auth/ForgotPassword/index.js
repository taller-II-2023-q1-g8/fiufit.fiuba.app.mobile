import { Alert } from 'react-native';
import { func, shape } from 'prop-types';
import { sendPasswordResetEmail } from 'firebase/auth';
import React, { useState } from 'react';

import texts from '../../../texts';
import { auth } from '../../../../firebaseConfig';

import ForgotPassword from './layout';
import { getField } from './utils';
import { fetchUserByEmail, incrementPasswordChange } from '../../../requests';

export default function ForgotPasswordContainer({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [mailError, setMailError] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmitPress = async () => {
    setMailError('');
    if (!email) {
      setMailError('Email obligatorio');
      return;
    }
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      setMailError('El email no tiene asociada una cuenta');
      setLoading(false);
      return;
    }
    const ur = await fetchUserByEmail(email);
    const urJ = await ur.json();
    console.log(urJ);
    await incrementPasswordChange(urJ.message.username);
    Alert.alert(
      'Recupero de contraseña',
      'Se te envio un mail con instruccione para recuperar la contraseña'
    );
    navigation.navigate(texts.Login.name);
    setLoading(false);
  };

  const handleOnEmailChange = (_, value) => setEmail(value);

  const field = getField(handleOnEmailChange, mailError);

  return <ForgotPassword emailField={field} handleSubmitPress={handleSubmitPress} loading={loading} />;
}

ForgotPasswordContainer.propTypes = {
  navigation: shape({
    navigate: func.isRequired
  }).isRequired
};
