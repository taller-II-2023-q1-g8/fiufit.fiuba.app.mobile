import React, { useEffect, useState } from 'react';
import { Text, View, ScrollView, KeyboardAvoidingView, TouchableOpacity, Alert } from 'react-native';

import { fetchUserProfileByUsername, updateUserInformationRequest } from '../../requests';
import { useStateValue } from '../../utils/state/state';
import TextField from '../../components/Fields/TextField';
import texts from '../../texts';
import { emailFieldType, passwordFieldType, phoneFieldType } from '../../components/Fields/constants';
import SelectField from '../../components/Fields/SelectField';
import { scrollviewStyle, styles } from '../Register/styles';
import Loader from '../../components/Loader';

export default function EditUserProfile() {
  const [data, setData] = useState([]);
  const [state, dispatch] = useStateValue();

  useEffect(() => {
    async function fetchData() {
      const response = await fetchUserProfileByUsername(state.user.username);
      const json = await response.json();
      setData(json.message);
    }
    fetchData();
  }, []);

  const [email, setEmail] = useState(data.email || '');
  const [gender, setGender] = useState(data.gender || '');
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState(data.firstname || '');
  const [phone, setPhone] = useState(data.phone || '');
  const [username, setUsername] = useState(data.username || '');

  useEffect(() => {
    if (Object.keys(data).length > 0) {
      setEmail(data.email || '');
      setGender(data.gender || '');
      setName(data.firstname || '');
      setPhone(data.phone || '');
      setUsername(data.username || '');
    }
  }, [data]);

  const handleSubmitPress = async () => {
    setLoading(true);

    console.log({ data });
    const values = {
      username: username || '',
      firstname: name || '',
      gender: gender || '',
      email: email || '',
      phone_number: phone || '',
      lastname: data.lastname || '',
      birth_date: data.birth_date || '',
      password: data.password || '',
      is_federated: data.is_federated || false,
      weight_in_kg: data.weight_in_kg || 0,
      height_in_cm: data.height_in_cm || 0
    };
    try {
      /* const hash = bcrypt.hashSync(password, salt); */
      const response = await updateUserInformationRequest(values);
      if (response.ok) {
        Alert.alert('Actualizado correctamente!', '');
      } else Alert.alert('Error', 'Intente nuevamente');
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const formatDate = (date) => `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

  const handleOnEmailChange = (userMail) => setEmail(userMail);
  const handleOnGenderChange = (userGender) => setGender(userGender);
  const handleOnNameChange = (userName) => setName(userName);
  const handleOnPhoneChange = (userPhone) => setPhone(userPhone);
  const handleOnUsernameChange = (userUsername) => setUsername(userUsername);

  const fieldTexts = texts.Fields;

  console.log({ data, name, username });
  const fields = [
    <TextField
      initialValue={name}
      onChangeText={handleOnNameChange}
      placeholder={fieldTexts.namePlaceholder}
      title={fieldTexts.nameTitle}
    />,
    <TextField
      initialValue={username}
      onChangeText={handleOnUsernameChange}
      placeholder={fieldTexts.usernamePlaceholder}
      title={fieldTexts.usernameTitle}
    />,
    <TextField
      initialValue={email}
      keyboardType={emailFieldType}
      onChangeText={handleOnEmailChange}
      placeholder={fieldTexts.emailPlaceholder}
      title={fieldTexts.emailTitle}
    />,
    <SelectField initialValue={gender} onChangeText={handleOnGenderChange} title={fieldTexts.genderTitle} />,
    <TextField
      initialValue={phone}
      keyboardType={phoneFieldType}
      onChangeText={handleOnPhoneChange}
      placeholder={fieldTexts.phonePlaceholder}
      title={fieldTexts.phoneTitle}
    />
  ];

  return (
    <View style={styles.container}>
      <Loader loading={loading} />
      <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={scrollviewStyle}>
        <KeyboardAvoidingView style={styles.formContainer} enabled>
          {fields.map((field) => (
            <View>{field}</View>
          ))}
          <TouchableOpacity style={styles.submitButton} activeOpacity={0.5} onPress={handleSubmitPress}>
            <Text style={styles.submitButtonText}>Actualizar!</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
}

// UserProfileContainer.propTypes = {
//   route: shape({
//     params: shape.isRequired
//   }).isRequired
// };
