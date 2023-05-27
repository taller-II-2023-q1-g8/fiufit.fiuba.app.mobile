import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { ref, uploadBytes } from 'firebase/storage';

import { fetchUserProfileByUsername, updateUserInformationRequest } from '../../requests';
import { useStateValue } from '../../state';
import { storage } from '../../../firebaseConfig';
import { getProfilePicURL } from '../../utils';

import EditUserProfile from './layout';
import { getFields } from './utils';

export default function EditUserProfileContainer() {
  const [data, setData] = useState({});
  const [state] = useStateValue();
  const [profPicUrl, setProfPicUrl] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleOnChangeText = (name, value) => setData({ ...data, [name]: value });

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

  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      allowsEditing: true
    });

    const cloudProfPicPath = 'profile-pics'.concat('/', data.username, '.jpg');
    const cloudProfilePicRef = ref(storage, cloudProfPicPath);
    if (!result.cancelled) {
      try {
        const response = await fetch(result.uri);
        const blob = await response.blob();
        await uploadBytes(cloudProfilePicRef, blob);

        setProfPicUrl(result.uri);
      } catch (error) {
        Alert.alert("Couldn't upload image!");
      }
    }
  };

  const handleSubmitPress = async () => {
    setLoading(true);

    const values = { ...data };

    try {
      /* const hash = bcrypt.hashSync(password, salt); */
      const response = await updateUserInformationRequest(values);
      if (response.ok) Alert.alert('Actualizado correctamente!', '');
      else Alert.alert('Error', 'Intente nuevamente');
    } catch (error) {
      // console.log(error);
    }
    setLoading(false);
  };

  const fields = getFields(data, handleOnChangeText);

  return (
    <EditUserProfile
      fields={fields}
      handlePickImage={handlePickImage}
      handleSubmitPress={handleSubmitPress}
      image={profPicUrl}
      loading={loading}
    />
  );
}
