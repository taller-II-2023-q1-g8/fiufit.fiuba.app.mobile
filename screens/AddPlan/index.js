import { func, shape } from 'prop-types';
import React, { useEffect, useState } from 'react';

import TextField from '../../components/Fields/TextField';
import texts from '../../texts';
import { useStateValue } from '../../utils/state/state';
import GenericSelectField from '../../components/Fields/GenericSelectField';
import { createPlanRequest } from '../../requests';

import CreatePlan from './layout';

export default function CreatePlanContainer({ navigation }) {
  const [state, dispatch] = useStateValue();
  const [difficulty, setDifficulty] = useState('NORMAL');
  // const [difficultyError, setDifficultyError] = useState('');
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState('');
  const [description, setDescription] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [tags, setTags] = useState('');
  const [tagsError, setTagsError] = useState('');
  // const [externalIDError, setExternalIDError] = useState('');
  const externalID = state.user.username;

  const resetErrors = () => {
    setTitleError('');
    setDescriptionError('');
    setTagsError('');
    // setExternalIDError('');
  };

  const resetFieldValues = () => {
    setTitle('');
    setDescription('');
    setTags('');
    // setExternalID('');
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
    values.trainer_id = externalID;
    console.log('valores: ', values);
    const response = await createPlanRequest(values)
      .then((r) => {
        console.log('PLAN CREATED');
        console.log(r);
        console.log(values);
        const newState = state.plansData;
        newState.push(values);
        console.log(newState);
        dispatch({
          type: 'addPlansData',
          plansData: newState
        });
      })
      .catch((error) => {
        console.log('Error:', error);
      });
    navigation.navigate(texts.TrainerHome.iconTitle);
  };

  const handleOnDifficultyChange = (eType) => setDifficulty(eType);
  const handleOnTitleChange = (eTitle) => setTitle(eTitle);
  const handleOnDescriptionChange = (eDescription) => setDescription(eDescription);
  const handleOnTagsChange = (eTags) => setTags(eTags);

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
      defaultValue={title}
      error={titleError}
      onChangeText={handleOnTitleChange}
      placeholder={texts.Fields.planTitlePlaceholder}
      title={texts.Fields.planTitle}
    />
  );

  const descriptionField = (
    <TextField
      defaultValue={description}
      error={descriptionError}
      onChangeText={handleOnDescriptionChange}
      placeholder={texts.Fields.planDescriptionPlaceholder}
      title={texts.Fields.planDescription}
    />
  );

  const tagsField = (
    <TextField
      defaultValue={tags}
      error={tagsError}
      onChangeText={handleOnTagsChange}
      placeholder={texts.Fields.planTagsPlaceholder}
      title={texts.Fields.planTags}
    />
  );

  // const externalIDField = (
  //   <TextField
  //     defaultValue={externalID}
  //     error={externalIDError}
  //     onChangeText={handleOnExternalIDChange}
  //     placeholder={texts.Fields.planExternalIDPlaceholder}
  //     title={texts.Fields.planExternalID}
  //   />
  // );

  return (
    <CreatePlan
      difficultyField={difficultiesField}
      titleField={titleField}
      descriptionField={descriptionField}
      tagsField={tagsField}
      // externalIDField={externalIDField}
      handleSubmitPress={handleSubmitPress}
    />
  );
}

CreatePlanContainer.propTypes = {
  navigation: shape({
    navigate: func.isRequired
  }).isRequired
};
