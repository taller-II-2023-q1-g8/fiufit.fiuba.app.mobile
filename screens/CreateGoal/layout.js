import { Text, View, ScrollView, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import React from 'react';
import PropTypes, { bool, func, number, string, object } from 'prop-types';

import { scrollviewStyle, styles } from '../Register/styles';
import Loader from '../../components/Loader';
import texts from '../../texts';
import Register from '../Register/layout';
import Login from '../Login/layout';

export default function CreateGoal({
  type,
  typeField,
  exerciseTitleField,
  completionWeightField,
  completionPlansField,
  deadlineField,
  handleSubmitPress
}) {
  return (
    <View style={styles.container}>
      <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={scrollviewStyle}>
        <KeyboardAvoidingView style={styles.formContainer} enabled>
          <Text style={styles.title}>{texts.CreateGoal.createGoalTitle}</Text>
          <View>{typeField}</View>
          {type === 'max_weight_lifted_in_exercise' ? <View>{exerciseTitleField}</View> : null}
          {type === 'max_weight_lifted_in_exercise' ? (
            <View>{completionWeightField}</View>
          ) : (
            <View>{completionPlansField}</View>
          )}
          <View>{deadlineField}</View>
          <TouchableOpacity style={styles.submitButton} activeOpacity={0.5} onPress={handleSubmitPress}>
            <Text style={styles.submitButtonText}>{texts.PersonalGoals.submitButtonText}</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
}

CreateGoal.propTypes = {
  type: string.isRequired,
  typeField: object.isRequired,
  exerciseTitleField: object.isRequired,
  completionPlansField: object.isRequired,
  completionWeightField: object.isRequired,
  deadlineField: object.isRequired,
  handleSubmitPress: func.isRequired
};
