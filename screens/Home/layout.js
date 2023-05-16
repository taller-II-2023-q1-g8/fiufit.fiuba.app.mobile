import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { KeyboardAvoidingView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { string, bool, func, array } from 'prop-types';
import { MenuProvider, MenuOption, MenuOptions, Menu, MenuTrigger } from 'react-native-popup-menu';

import texts from '../../texts';
import Loader from '../../components/Loader';
import { Goal } from '../PersonalGoals/layout';

import { scrollviewStyle, styles } from './styles';

const homeTexts = texts.Home;

function DotMenu({ handleTrainerHome, handleSignOutPress }) {
  return (
    <View>
      <Menu>
        <MenuTrigger text="• • •" customStyles={{ triggerTexts: { fontSize: 25 } }} />
        <MenuOptions>
          <MenuOption onSelect={() => handleTrainerHome()}>
            <Text style={{ color: 'black', fontSize: 20 }}>Inicio Entrenador</Text>
          </MenuOption>
          <MenuOption onSelect={() => handleSignOutPress()}>
            <Text style={{ color: 'red', fontSize: 20 }}>Salir</Text>
          </MenuOption>
        </MenuOptions>
      </Menu>
    </View>
  );
}

DotMenu.propTypes = {
  handleTrainerHome: func.isRequired,
  handleSignOutPress: func.isRequired
};

export default function Home({
  goals,
  username,
  handleSignOutPress,
  handleProfile,
  handleSearchUsers,
  loading,
  handleTrainerHome
}) {
  return (
<<<<<<< HEAD
    <MenuProvider>
      <View style={styles.container}>
        <StatusBar />
        <Loader loading={loading} />
        <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={scrollviewStyle}>
          <KeyboardAvoidingView style={styles.formContainer} enabled>
            <View style={styles.header}>
              <Text style={styles.title}>{homeTexts.title}</Text>
              <DotMenu handleTrainerHome={handleTrainerHome} handleSignOutPress={handleSignOutPress} />
            </View>
            <Text style={styles.goalsTitle}>{homeTexts.closeGoalsTitle}</Text>
            {loading ? null : goals.map((goal) => Goal({ goal }))}
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    </MenuProvider>
=======
    <View style={styles.container}>
      <StatusBar />
      <Loader loading={loading} />
      <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={scrollviewStyle}>
        <KeyboardAvoidingView style={styles.formContainer} enabled>
          <Text style={styles.title}>{homeTexts.title}</Text>
          <Text>Welcome {username}!</Text>
          <Text style={styles.title}>{homeTexts.closeGoalsTitle}</Text>
          {loading ? null : goals.map((goal) => Goal({ goal }))}
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
>>>>>>> f8c509fac396a004f6f856ba24492e265c7db4c9
  );
}

Home.propTypes = {
  goals: array,
  username: string.isRequired,
  handleProfile: func.isRequired,
  handleSearchUsers: func.isRequired,
  handleSignOutPress: func.isRequired,
  loading: bool.isRequired,
  handleTrainerHome: func.isRequired
};
