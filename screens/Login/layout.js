import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Image, KeyboardAvoidingView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { arrayOf, bool, func } from 'prop-types';

import GmailLogo from '../../assets/gmail_logo.png';
import Loader from '../../components/Loader';
import texts from '../../texts';

import { scrollviewStyle, styles } from './styles';

const loginTexts = texts.Login;

export default function Login({ fields, handleForgotPassword, handleRegister, handleSubmitPress, loading }) {
  return (
    <View style={styles.container}>
      <StatusBar />
      <Loader loading={loading} />
      <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={scrollviewStyle}>
        <KeyboardAvoidingView style={styles.formContainer} enabled>
          <Text style={styles.title}>{loginTexts.loginTitle}</Text>
          {fields.map(({ field, key }) => (
            <View key={key}>{field}</View>
          ))}
          <TouchableOpacity style={styles.submitButton} activeOpacity={0.5} onPress={handleSubmitPress}>
            <Text style={styles.submitButtonText}>{loginTexts.submitButtonText}</Text>
          </TouchableOpacity>
          <Text style={{ textAlign: 'center', fontSize: 18 }}>o ingresá con</Text>
          <TouchableOpacity activeOpacity={0.8}>
            <Image style={styles.socialNetworkLogo} source={GmailLogo} />
          </TouchableOpacity>
          <View style={styles.redirectionButtons}>
            <Text style={styles.forgotPassword} onPress={handleForgotPassword}>
              {loginTexts.forgotYourPasswordQuestion}
            </Text>
            <View style={styles.needAccountContainer}>
              <Text style={styles.needAccountText}>{loginTexts.needAccount}</Text>
              <Text style={styles.registerButton} onPress={handleRegister}>
                {loginTexts.register}
              </Text>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
}

Login.propTypes = {
  fields: arrayOf(bool).isRequired,
  handleForgotPassword: func.isRequired,
  handleRegister: func.isRequired,
  handleSubmitPress: func.isRequired,
  loading: bool.isRequired
};
