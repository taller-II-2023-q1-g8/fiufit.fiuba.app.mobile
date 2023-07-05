import { func, shape } from 'prop-types';
import React, { useState, useEffect } from 'react';
import { cloneDeep } from 'lodash';
import * as ImagePicker from 'expo-image-picker';
import { ref, uploadBytes } from 'firebase/storage';
import { Alert } from 'react-native';

import texts from '../../texts';
import { useStateValue } from '../../state';
import { editPlanRequest } from '../../requests';
import { getPlanPicURL } from '../../utils';
import { storage } from '../../../firebaseConfig';

import CreatePlan from './layout';
import { getFields } from './utils';

export default function EditPlanScreen({ route, navigation }) {
  const { plan } = route.params;
  const [state, dispatch] = useStateValue();
  const initialData = {
    title: plan.title,
    description: plan.description,
    difficulty: plan.difficulty
  };
  const [data, setData] = useState(initialData);
  const [errors, setErrors] = useState({ title: '', description: '', difficulty: '' });
  const [planPicUrl, setPlanPicUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageLoading, setImageLoading] = useState(true);
  const [currentTag, setCurrentTag] = useState('ABS');
  const [tags, setTags] = useState([]);

  useEffect(() => {
    let aux = plan.tags.split(',');
    aux = aux.map((tag) => tag.trim());
    console.log('abc', aux);
    setTags((oldTags) => [...aux]);
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
  const handleOnChangeText = (name, value) => setData({ ...data, [name]: value });

  const thereIsAnError = () => Object.keys(errors).find((key) => data[key] === '');

  const fillErrors = (updatedErrors) =>
    Object.keys(errors).forEach((key) => {
      if (data[key] === '') updatedErrors[key] = 'Campo obligatorio';
    });

  const handleSubmitPress = async () => {
    const updatedErrors = cloneDeep(initialData);

    if (thereIsAnError()) {
      fillErrors(updatedErrors);
      setErrors(updatedErrors);
      return;
    }
    if (tags.length === 0) {
      Alert.alert('Debe elegir al menos un tag');
      return;
    }

    setLoading(true);
    let tagsAux = '';
    tags.forEach((tag) => {
      tagsAux = `${tagsAux + tag}, `;
    });
    tagsAux = tagsAux.substring(0, tagsAux.length - 2);
    const values = { ...data, trainer_username: state.user.username, tags: tagsAux };
    await editPlanRequest(values, plan.id)
      .then(async (result) => {
        if (!result.ok) return;
        const itemData = await result.json();
        navigation.navigate(texts.TrainerPlanView.name, { itemData });
      })
      .catch((error) => {
        console.log('Error:', error);
      });
    setLoading(false);
  };

  const fetchPlanPicUrl = async () => {
    const url = await getPlanPicURL(plan.id);
    setPlanPicUrl(url);
    setImageLoading(false);
  };

  useEffect(() => {
    fetchPlanPicUrl();
  }, []);

  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      allowsEditing: true
    });

    const cloudPlanPicPath = 'plan-pics'.concat('/', plan.id, '.jpg');
    const cloudPlanPicRef = ref(storage, cloudPlanPicPath);
    if (!result.cancelled) {
      try {
        const response = await fetch(result.uri);
        const blob = await response.blob();
        await uploadBytes(cloudPlanPicRef, blob);

        setPlanPicUrl(result.uri);
      } catch (error) {
        Alert.alert("Couldn't upload plan image!");
      }
    }
  };

  const fields = getFields(errors, initialData, handleOnChangeText);

  return (
    <CreatePlan
      fields={fields}
      handleSubmitPress={handleSubmitPress}
      loading={loading && imageLoading}
      planPicUrl={planPicUrl}
      handlePickImage={handlePickImage}
      handleOnChangeTags={handleOnChangeTags}
      handleOnAddTag={handleOnAddTag}
      tags={tags}
      handleOnDeleteTag={handleOnDeleteTag}
    />
  );
}

EditPlanScreen.propTypes = {
  route: shape({
    params: shape.isRequired
  }).isRequired,
  navigation: shape({
    navigate: func.isRequired
  }).isRequired
};
