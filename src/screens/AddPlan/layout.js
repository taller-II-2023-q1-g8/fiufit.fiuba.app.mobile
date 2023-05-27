import { Text, View, ScrollView, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import React from 'react';
import { array, bool, func } from 'prop-types';

import { scrollviewStyle, styles } from '../Auth/Register/styles';
import texts from '../../texts';
import Loader from '../../components/Loader';

export default function CreatePlan({ fields, handleSubmitPress, loading }) {
  return (
    <>
      <Loader loading={loading} />
      {!loading && (
        <View style={styles.container}>
          <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={scrollviewStyle}>
            <KeyboardAvoidingView style={styles.formContainer} enabled>
              <Text style={styles.title}>{texts.CreatePlan.createPlanTitle}</Text>
              {fields.map((field) => (
                <View>{field}</View>
              ))}
              <TouchableOpacity style={styles.submitButton} activeOpacity={0.5} onPress={handleSubmitPress}>
                <Text style={styles.submitButtonText}>{texts.PersonalPlans.submitButtonText}</Text>
              </TouchableOpacity>
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      )}
    </>
  );
}

CreatePlan.propTypes = {
  fields: array,
  handleSubmitPress: func,
  loading: bool
};
