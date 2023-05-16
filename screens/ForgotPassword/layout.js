import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View, KeyboardAvoidingView, ScrollView, TouchableOpacity } from 'react-native';
import { array, bool, func } from 'prop-types';

import Loader from '../../components/Loader';
import texts from '../../texts';

import { scrollviewStyle, styles } from './styles';

const forgotPasswordTexts = texts.ForgotPassword;

export default function ForgotPassword({ fields, handleSubmitPress, loading }) {
  return (
    <View style={styles.container}>
      <StatusBar />
      <Loader loading={loading} />
      <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={scrollviewStyle}>
        <KeyboardAvoidingView style={styles.formContainer} enabled>
          <Text style={styles.title}>{forgotPasswordTexts.forgotPasswordTitle}</Text>
          {fields.map(({ field, key }) => (
            <View key={key}>{field}</View>
          ))}
          <TouchableOpacity style={styles.submitButton} activeOpacity={0.5} onPress={handleSubmitPress}>
            <Text style={styles.submitButtonText}>{forgotPasswordTexts.submitButtonText}</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
}

ForgotPassword.propTypes = {
  fields: array.isRequired,
  handleSubmitPress: func.isRequired,
  loading: bool.isRequired
};
