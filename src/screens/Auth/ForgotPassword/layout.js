import React from 'react';
import { bool, func, object } from 'prop-types';
import {
  ImageBackground,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import Loader from '../../../components/Loader';
import texts from '../../../texts';
import BackgroundImage from '../../../assets/Background.jpg';

import { scrollviewStyle, styles } from './styles';

const forgotPasswordTexts = texts.ForgotPassword;

export default function ForgotPassword({ emailField, handleSubmitPress, loading }) {
  return (
    <ImageBackground source={BackgroundImage} resizeMode="cover">
      <View style={styles.container}>
        <Loader loading={loading} />
        <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={scrollviewStyle}>
          <KeyboardAvoidingView style={styles.formContainer} enabled>
            <View key={emailField.key}>{emailField.field}</View>
            <TouchableOpacity style={styles.submitButton} activeOpacity={0.5} onPress={handleSubmitPress}>
              <Text style={styles.submitButtonText}>{forgotPasswordTexts.submitButtonText}</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    </ImageBackground>
  );
}

ForgotPassword.propTypes = {
  emailField: object.isRequired,
  handleSubmitPress: func.isRequired,
  loading: bool.isRequired
};
