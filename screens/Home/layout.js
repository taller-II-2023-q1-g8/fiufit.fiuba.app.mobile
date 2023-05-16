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
  );
}

Home.propTypes = {
  goals: array,
  username: string.isRequired,
  handleSignOutPress: func.isRequired,
  loading: bool.isRequired,
  handleTrainerHome: func.isRequired
};
