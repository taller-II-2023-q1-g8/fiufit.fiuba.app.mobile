import React from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  Text,
  View,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import { bool, func, shape } from 'prop-types';
import { scrollviewStyle, styles } from './styles';
import Loader from '../../components/Loader';
import texts from '../../texts';

const registerTexts = texts.Register;

export default function Register({ fields, handleSubmitPress, loading }) {
  return (
    <View style={styles.container}>
      <StatusBar />
      <Loader loading={loading} />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={scrollviewStyle}
      >
        <KeyboardAvoidingView style={styles.formContainer} enabled>
          <Text style={styles.title}>{registerTexts.registerTitle}</Text>
          {fields.map((field, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <View key={i}>{field}</View>
          ))}
          <TouchableOpacity
            style={styles.submitButton}
            activeOpacity={0.5}
            onPress={handleSubmitPress}
          >
            <Text style={styles.submitButtonText}>
              {registerTexts.submitButtonText}
            </Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
}

Register.propTypes = {
  // eslint-disable-next-line react/require-default-props
  fields: shape,
  handleSubmitPress: func.isRequired,
  loading: bool.isRequired
};
