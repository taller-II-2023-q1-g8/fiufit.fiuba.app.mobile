import { func, shape } from 'prop-types';
import React, { useEffect, useState } from 'react';

import TextField from '../../components/Fields/TextField';
import texts from '../../texts';
import { useStateValue } from '../../utils/state/state';
import GenericSelectField from '../../components/Fields/GenericSelectField';
import { createPlanRequest } from '../../requests';
import { textFieldType } from '../../components/Fields/constants';

import CreatePlan from './layout';

export default function CreatePlanContainer({ navigation }) {
  const [state, dispatch] = useStateValue();
  const [difficulty, setDifficulty] = useState('NORMAL');
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState('');
  const [description, setDescription] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [tags, setTags] = useState('');
  const [tagsError, setTagsError] = useState('');

  const resetErrors = () => {
    setTitleError('');
    setDescriptionError('');
    setTagsError('');
  };

  const resetFieldValues = () => {
    setTitle('');
    setDescription('');
    setTags('');
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
    const values = {};
    values.title = title;
    values.description = description;
    values.difficulty = difficulty;
    values.tags = tags;
    values.trainer_username = state.user.username;
    console.log(values)
    createPlanRequest(values)
      .then(async (res) => {
        const itemData = await res.json();
        state.plansData.push(itemData);
        dispatch({
          type: 'addPlansData',
          plansData: state.plansData
        });
        navigation.navigate(texts.TrainerPlanView.name, { itemData });
      })
      .catch((error) => {
        console.log('Error:', error);
      });
  };

  const handleOnDifficultyChange = (eType) => setDifficulty(eType);
  const handleOnTitleChange = (name, eTitle) => setTitle(eTitle);
  const handleOnDescriptionChange = (name, eDescription) => setDescription(eDescription);
  const handleOnTagsChange = (name, eTags) => setTags(eTags);

  const difficulties = [
    { label: 'Facil', value: 'EASY' },
    { label: 'Normal', value: 'NORMAL' },
    { label: 'Dificil', value: 'HARD' }
  ];
  const difficultiesField = (
    <GenericSelectField title="Dificultad" items={difficulties} onChangeText={handleOnDifficultyChange} />
  );

  const titleField = (
    <TextField
      error={titleError}
      keyboardType={textFieldType}
      name="title"
      onChangeText={handleOnTitleChange}
      placeholder={texts.Fields.planTitlePlaceholder}
      title={texts.Fields.planTitle}
    />
  );

  const descriptionField = (
    <TextField
      error={descriptionError}
      keyboardType={textFieldType}
      name="description"
      onChangeText={handleOnDescriptionChange}
      placeholder={texts.Fields.planDescriptionPlaceholder}
      title={texts.Fields.planDescription}
    />
  );

  const tagsField = (
    <TextField
      error={tagsError}
      keyboardType={textFieldType}
      name="tags"
      onChangeText={handleOnTagsChange}
      placeholder={texts.Fields.planTagsPlaceholder}
      title={texts.Fields.planTags}
    />
  );

  return (
    <CreatePlan
      difficultyField={difficultiesField}
      titleField={titleField}
      descriptionField={descriptionField}
      tagsField={tagsField}
      handleSubmitPress={handleSubmitPress}
    />
  );
}

CreatePlanContainer.propTypes = {
  navigation: shape({
    navigate: func.isRequired
  }).isRequired
};
