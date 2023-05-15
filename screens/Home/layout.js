import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { KeyboardAvoidingView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { string, bool, func } from 'prop-types';

import texts from '../../texts';
import Loader from '../../components/Loader';

import { scrollviewStyle, styles } from './styles';

const homeTexts = texts.Home;

export default function Home({
  username,
  handleSignOutPress,
  handleProfile,
  handleSearchUsers,
  loading,
  handleTrainerHome
}) {
  return (
    <View style={styles.container}>
      <StatusBar />
      <Loader loading={loading} />
      <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={scrollviewStyle}>
        <KeyboardAvoidingView style={styles.formContainer} enabled>
          <Text style={styles.title}>{homeTexts.homeTitle}</Text>
          <Text>Welcome {username}!</Text>
          {
            <TouchableOpacity style={styles.submitButton} activeOpacity={0.5} onPress={handleSignOutPress}>
              <Text style={styles.submitButtonText}>{homeTexts.submitButtonText}</Text>
            </TouchableOpacity>
            /*
          <TouchableOpacity style={styles.submitButton} activeOpacity={0.5} onPress={handleProfile}>
            <Text style={styles.submitButtonText}>{homeTexts.profileButtonText}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.submitButton} activeOpacity={0.5} onPress={handleSearchUsers}>
            <Text style={styles.submitButtonText}>{homeTexts.searchUsersButtonText}</Text>
          </TouchableOpacity> */
          }
          <TouchableOpacity style={styles.submitButton} activeOpacity={0.5} onPress={handleTrainerHome}>
            <Text style={styles.submitButtonText}>Ir a home de trainer</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
}

Home.propTypes = {
  username: string.isRequired,
  handleProfile: func.isRequired,
  handleSearchUsers: func.isRequired,
  handleSignOutPress: func.isRequired,
  loading: bool.isRequired,
  handleTrainerHome: func.isRequired
};
