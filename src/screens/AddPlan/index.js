import { func, shape } from 'prop-types';
import React, { useState } from 'react';
import { cloneDeep } from 'lodash';
import * as ImagePicker from 'expo-image-picker';
import { ref, uploadBytes } from 'firebase/storage';
import { Alert } from 'react-native';

import texts from '../../texts';
import { useStateValue } from '../../state';
import { createPlanRequest, fetchTrainingPlanByID } from '../../requests';
import { processFetchedPlans } from '../../utils';
import { storage } from '../../../firebaseConfig';

import CreatePlan from './layout';
import { getFields } from './utils';

export default function CreatePlanContainer({ navigation }) {
  const [state, dispatch] = useStateValue();
  const initialData = { title: '', description: '', difficulty: '' };
  const [data, setData] = useState({ ...initialData, difficulty: 'EASY' });
  const [errors, setErrors] = useState(initialData);
  const [currentTag, setCurrentTag] = useState('ABS');
  const [tags, setTags] = useState([]);
  const [planPicUrl, setPlanPicUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleOnChangeText = (name, value) => setData({ ...data, [name]: value });
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
    await createPlanRequest(values)
      .then(async (result) => {
        if (!result.ok) return;
        const itemData = await result.json();
        const { trainer, ...newItemData } = itemData;

        if (planPicUrl !== null) {
          const cloudPlanPicPath = 'plan-pics'.concat('/', itemData.id, '.jpg');
          const cloudPlanPicRef = ref(storage, cloudPlanPicPath);
          const response = await fetch(planPicUrl);
          const blob = await response.blob();
          await uploadBytes(cloudPlanPicRef, blob);
        }

        newItemData.athletes = [];
        newItemData.exercises = [];
        const aux = [newItemData];
        await processFetchedPlans(aux);
        const i = aux[0];
        console.log('III', i);
        navigation.navigate(texts.TrainerPlanView.name, { itemData: i });
        dispatch({ type: 'addPlansData', newPlansData: aux[0] });
      })
      .catch((error) => {
        console.log('Error:', error);
      });
    setLoading(false);
    navigation.navigate(texts.TrainerHome.iconTitle);
  };

  const fields = getFields(errors, handleOnChangeText);

  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      allowsEditing: true
    });
    setPlanPicUrl(result.uri);
  };

  return (
    <CreatePlan
      fields={fields}
      handleSubmitPress={handleSubmitPress}
      loading={loading}
      planPicUrl={planPicUrl}
      handlePickImage={handlePickImage}
      handleOnChangeTags={handleOnChangeTags}
      handleOnAddTag={handleOnAddTag}
      tags={tags}
      handleOnDeleteTag={handleOnDeleteTag}
    />
  );
}

CreatePlanContainer.propTypes = {
  navigation: shape({
    navigate: func.isRequired
  }).isRequired
};
