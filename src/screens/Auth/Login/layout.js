/* eslint-disable react/prop-types */
import React from 'react';
import {
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import PropTypes, { bool, func } from 'prop-types';

import { colors } from '../../../colors';
import BackgroundImage from '../../../assets/Background.jpg';
import GmailLogo from '../../../assets/gmail_logo.png';
import Loader from '../../../components/Loader';
import texts from '../../../texts';

import { scrollviewStyle, styles } from './styles';

const loginTexts = texts.Login;

export default function Login({
  fields,
  handleForgotPassword,
  handleRegister,
  handleSubmitPress,
  loading,
  handleGmailLogin
}) {
  return (
    <ImageBackground source={BackgroundImage} resizeMode="cover">
      <View style={styles.container}>
        <Loader loading={loading} />
        <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={scrollviewStyle}>
          <KeyboardAvoidingView style={styles.formContainer} enabled>
            <Text style={styles.title}>{loginTexts.title}</Text>
            {fields.map(({ field, key }) => (
              <View key={key}>{field}</View>
            ))}
            <TouchableOpacity style={styles.submitButton} activeOpacity={0.5} onPress={handleSubmitPress}>
              <Text style={styles.submitButtonText}>{loginTexts.submitButtonText}</Text>
            </TouchableOpacity>
            <Text style={{ textAlign: 'center', fontSize: 18, color: colors.white }}>o ingresá con</Text>
            <TouchableOpacity activeOpacity={0.8} onPress={handleGmailLogin}>
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
    </ImageBackground>
  );
}

Login.propTypes = {
  fields: PropTypes.array.isRequired,
  handleForgotPassword: func.isRequired,
  handleRegister: func.isRequired,
  handleSubmitPress: func.isRequired,
  handleGmailLogin: func.isRequired,
  loading: bool.isRequired
};
