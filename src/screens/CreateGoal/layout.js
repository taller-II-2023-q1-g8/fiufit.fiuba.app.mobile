import { Text, View, ScrollView, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import React from 'react';
import { array, func } from 'prop-types';

import { scrollviewStyle, styles } from '../Auth/Register/styles';
import texts from '../../texts';

export default function CreateGoal({ fields, handleSubmitPress }) {
  return (
    <View style={styles.container}>
      <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={scrollviewStyle}>
        <KeyboardAvoidingView style={styles.formContainer} enabled>
          <Text style={styles.title}>{texts.CreateGoal.createGoalTitle}</Text>
          {fields.map((field) => (
            <View>{field}</View>
          ))}
          <TouchableOpacity style={styles.submitButton} activeOpacity={0.5} onPress={handleSubmitPress}>
            <Text style={styles.submitButtonText}>{texts.PersonalGoals.submitButtonText}</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
}

CreateGoal.propTypes = {
  fields: array.isRequired,
  handleSubmitPress: func.isRequired
};
