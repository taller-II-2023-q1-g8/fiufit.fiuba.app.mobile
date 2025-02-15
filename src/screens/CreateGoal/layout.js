import {
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
  ImageBackground
} from 'react-native';
import React from 'react';
import { array, bool, func } from 'prop-types';

import texts from '../../texts';
import Loader from '../../components/Loader';
import BackgroundImage from '../../assets/Background.jpg';

import { scrollviewStyle, styles } from './styles';

export default function CreateGoal({ loading, fields, handleSubmitPress }) {
  return (
    <>
      <Loader loading={loading} />
      {!loading && (
        <ImageBackground source={BackgroundImage} resizeMode="cover">
          <View style={styles.container}>
            <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={scrollviewStyle}>
              <KeyboardAvoidingView style={styles.formContainer} enabled>
                <Text style={styles.title}>{texts.CreateGoal.title}</Text>
                {fields.map((field) => (
                  <View>{field}</View>
                ))}
                <TouchableOpacity style={styles.submitButton} activeOpacity={0.5} onPress={handleSubmitPress}>
                  <Text style={styles.submitButtonText}>{texts.PersonalGoals.submitButtonText}</Text>
                </TouchableOpacity>
              </KeyboardAvoidingView>
            </ScrollView>
          </View>
        </ImageBackground>
      )}
    </>
  );
}

CreateGoal.propTypes = {
  fields: array.isRequired,
  handleSubmitPress: func.isRequired,
  loading: bool.isRequired
};
