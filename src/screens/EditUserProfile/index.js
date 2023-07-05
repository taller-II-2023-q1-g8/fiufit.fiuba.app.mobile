import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { ref, uploadBytes } from 'firebase/storage';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { signOut } from 'firebase/auth';

import { fetchUserProfileByUsername, updateUserInformationRequest } from '../../requests';
import { useStateValue } from '../../state';
import { auth, storage } from '../../../firebaseConfig';
import { getProfilePicURL } from '../../utils';

import EditUserProfile from './layout';
import { getFields } from './utils';

export default function EditUserProfileContainer() {
  const [data, setData] = useState({});
  const [state, dispatch] = useStateValue();
  const [profPicUrl, setProfPicUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentTag, setCurrentTag] = useState('ABS');
  const [tags, setTags] = useState([]);

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
      if (json.message.interests === null) {
        json.message.interests = [];
      } else {
        setTags((oldTags) => [...json.message.interests]);
      }
      json.message.weight_in_kg = json.message.weight_in_kg.toString();
      json.message.height_in_cm = json.message.height_in_cm.toString();
      setData(json.message);
    }
    fetchData();
  }, []);

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
    values.interests = tags;
    try {
      /* const hash = bcrypt.hashSync(password, salt); */
      const response = await updateUserInformationRequest(values);
      if (response.ok) {
        dispatch({
          type: 'updateUser',
          user: values
        });
      } else Alert.alert('Error', 'Intente nuevamente');
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
      handleOnChangeTags={handleOnChangeTags}
      handleOnAddTag={handleOnAddTag}
      tags={tags}
      handleOnDeleteTag={handleOnDeleteTag}
    />
  );
}
