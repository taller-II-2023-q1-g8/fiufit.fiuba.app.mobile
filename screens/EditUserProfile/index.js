import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { ref, uploadBytes } from 'firebase/storage';

import { storage } from '../../firebaseConfig';
import { fetchUserProfileByUsername, updateUserInformationRequest } from '../../requests';
import { useStateValue } from '../../utils/state/state';
import TextField from '../../components/Fields/TextField';
import texts from '../../texts';
import { emailFieldType, phoneFieldType } from '../../components/Fields/constants';
import SelectField from '../../components/Fields/SelectField';
import getProfilePicURL from '../../utils/profilePicURL';

import EditUserProfile from './layout';

export default function EditUserProfileContainer() {
  const [data, setData] = useState([]);
  const [state] = useStateValue();
  const [profPicUrl, setProfPicUrl] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProfPicUrl = async () => {
    const url = await getProfilePicURL(state.user.username);
    setProfPicUrl(url);
    setLoading(false);
  };

  useEffect(() => {
    fetchProfPicUrl();
  }, []);

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
  const [name, setName] = useState(data.firstname || '');
  const [phone, setPhone] = useState(data.phone || '');
  const [username, setUsername] = useState(data.username || '');

  const handlePickImage = async () => {
    // No permissions request is necessary for launching the image library
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      allowsEditing: true
    });
    console.log(result.uri);

    const cloudProfPicPath = 'profile-pics'.concat('/', username, '.jpg');
    const cloudProfilePicRef = ref(storage, cloudProfPicPath);
    if (!result.cancelled) {
      try {
        const response = await fetch(result.uri);
        const blob = await response.blob();
        await uploadBytes(cloudProfilePicRef, blob);

        setProfPicUrl(result.uri);
      } catch (error) {
        alert("Couldn't upload image!");
        console.log('Error uploading image:', error);
      }
    }
  };

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

    console.log('a', { data });
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

  const handleOnEmailChange = (userMail) => setEmail(userMail);
  const handleOnGenderChange = (userGender) => setGender(userGender);
  const handleOnNameChange = (userName) => setName(userName);
  const handleOnPhoneChange = (userPhone) => setPhone(userPhone);
  const handleOnUsernameChange = (userUsername) => setUsername(userUsername);
  const fieldTexts = texts.Fields;

  console.log({ data, name, username });
  const fields = [
    <TextField
      defaultValue={name}
      onChangeText={handleOnNameChange}
      placeholder={fieldTexts.namePlaceholder}
      title={fieldTexts.nameTitle}
    />,
    <TextField
      defaultValue={username}
      onChangeText={handleOnUsernameChange}
      placeholder={fieldTexts.usernamePlaceholder}
      title={fieldTexts.usernameTitle}
    />,
    <TextField
      defaultValue={email}
      keyboardType={emailFieldType}
      onChangeText={handleOnEmailChange}
      placeholder={fieldTexts.emailPlaceholder}
      title={fieldTexts.emailTitle}
    />,
    <SelectField defaultValue={gender} onChangeText={handleOnGenderChange} title={fieldTexts.genderTitle} />,
    <TextField
      defaultValue={phone}
      keyboardType={phoneFieldType}
      onChangeText={handleOnPhoneChange}
      placeholder={fieldTexts.phonePlaceholder}
      title={fieldTexts.phoneTitle}
    />
  ];

  /* return (
      <EditUserProfile
          handlePickImage={handlePickImage}
          image={image}
          handleSubmitPress={handleSubmitPress}
          fields={fields}
          loading={loading}
      />
  ); */

  return (
    <EditUserProfile
      handlePickImage={handlePickImage}
      image={profPicUrl}
      handleSubmitPress={handleSubmitPress}
      fields={fields}
      loading={loading}
      test={profPicUrl}
    />
  );
}
