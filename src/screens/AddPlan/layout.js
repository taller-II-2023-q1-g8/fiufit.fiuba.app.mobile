import { Text, View, ScrollView, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import React from 'react';
import { func, object } from 'prop-types';

import { scrollviewStyle, styles } from '../Auth/Register/styles';
import texts from '../../texts';

export default function CreatePlan({
  difficultyField,
  titleField,
  descriptionField,
  tagsField,
  externalIDField,
  handleSubmitPress
}) {
  return (
    <View style={styles.container}>
      <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={scrollviewStyle}>
        <KeyboardAvoidingView style={styles.formContainer} enabled>
          <Text style={styles.title}>{texts.CreatePlan.createPlanTitle}</Text>
          <View>{titleField}</View>
          <View>{descriptionField}</View>
          <View>{tagsField}</View>
          <View>{difficultyField}</View>
          <View>{externalIDField}</View>
          <TouchableOpacity style={styles.submitButton} activeOpacity={0.5} onPress={handleSubmitPress}>
            <Text style={styles.submitButtonText}>{texts.PersonalPlans.submitButtonText}</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
}

CreatePlan.propTypes = {
  difficultyField: object.isRequired,
  titleField: object.isRequired,
  descriptionField: object.isRequired,
  tagsField: object.isRequired,
  externalIDField: object.isRequired,
  handleSubmitPress: func.isRequired
};
