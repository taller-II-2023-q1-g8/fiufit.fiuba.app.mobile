import React, { useEffect, useState } from 'react';
import { Text, View, ScrollView, KeyboardAvoidingView, TouchableOpacity, Alert, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import { fetchUserProfileByUsername, updateUserInformationRequest } from '../../requests';
import { useStateValue } from '../../utils/state/state';
import TextField from '../../components/Fields/TextField';
import texts from '../../texts';
import { emailFieldType, passwordFieldType, phoneFieldType } from '../../components/Fields/constants';
import SelectField from '../../components/Fields/SelectField';
import Loader from '../../components/Loader';
import defaultProfPic from '../../assets/profile-pic-def.png';

import { scrollviewStyle, styles } from './styles';

export default function EditUserProfile() {
  const [data, setData] = useState([]);
  const [state, dispatch] = useStateValue();
  const [image, setImage] = useState(null);
  // console.log(defaultProfPic);

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

  const handlePickImage = async () => {
    // No permissions request is necessary for launching the image library
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      allowsEditing: true
    });
    console.log(result.uri);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

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
  // console.log(image);
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

  // <Image style={styles.profilePicture} source={image} />
  return (
    <View style={styles.container}>
      <Loader loading={loading} />

      <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={scrollviewStyle}>
        <KeyboardAvoidingView style={styles.formContainer} enabled>
          {image !== null ? (
            <Image source={{ uri: image }} style={styles.profilePicture} />
          ) : (
            <Image source={defaultProfPic} style={styles.profilePicture} />
          )}

          <TouchableOpacity style={styles.submitButton} activeOpacity={0.5} onPress={handlePickImage}>
            <Text style={styles.submitButtonText}>Cambiar Foto</Text>
          </TouchableOpacity>
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
