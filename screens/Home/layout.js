import React from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { arrayOf, bool, func } from 'prop-types';

import { scrollviewStyle, styles } from './styles';

import texts from '../../texts';
import Loader from '../../components/Loader';

const homeTexts = texts.Home;

export default function Home({
  fields,
  handleSignOutPress,
  handleProfile,
  handleSearchUsers,
  loading
}) {
  return (
    <View style={styles.container}>
      <StatusBar />
      <Loader loading={loading} />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={scrollviewStyle}
      >
        <KeyboardAvoidingView style={styles.formContainer} enabled>
          <Text style={styles.title}>{homeTexts.homeTitle}</Text>
          {fields.map((field, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <View key={i}>{field}</View>
          ))}
          <TouchableOpacity
            style={styles.submitButton}
            activeOpacity={0.5}
            onPress={handleSignOutPress}
          >
            <Text style={styles.submitButtonText}>
              {homeTexts.submitButtonText}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.submitButton}
            activeOpacity={0.5}
            onPress={handleProfile}
          >
            <Text style={styles.submitButtonText}>
              {homeTexts.profileButtonText}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.submitButton}
            activeOpacity={0.5}
            onPress={handleSearchUsers}
          >
            <Text style={styles.submitButtonText}>
              {homeTexts.searchUsersButtonText}
            </Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
}

Home.propTypes = {
  fields: arrayOf(bool).isRequired,
  handleProfile: func.isRequired,
  handleSearchUsers: func.isRequired,
  handleSignOutPress: func.isRequired,
  loading: bool.isRequired
};
