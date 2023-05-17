import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { KeyboardAvoidingView, ScrollView, Text, View } from 'react-native';
import { bool, func, array } from 'prop-types';
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
        <MenuTrigger>
          <Text style={{ fontSize: 20, color: 'white' }}>• • •</Text>
        </MenuTrigger>
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

const sortGoals = (userGoals) => {
  const sortedGoals = userGoals
    .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
    .filter((goal) => goal.status === 'in_progress');
  const now = new Date();

  // de las más cercanas a expirar, muestro 3
  const closestGoals = sortedGoals.filter((goal, index) => index < 3 || new Date(goal.deadline) < now);
  return closestGoals;
};
export default function Home({ goals, handleSignOutPress, loading, handleTrainerHome }) {
  return (
    <MenuProvider>
      <View style={styles.container}>
        <StatusBar />
        <Loader loading={loading} />
        <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={scrollviewStyle}>
          <View style={styles.homeHeader}>
            <Text style={{ ...styles.title, color: 'white' }}>{homeTexts.title}</Text>
            <DotMenu handleTrainerHome={handleTrainerHome} handleSignOutPress={handleSignOutPress} />
          </View>
          <KeyboardAvoidingView style={styles.formContainer} enabled>
            <Text style={styles.goalsTitle}>{homeTexts.closeGoalsTitle}</Text>
            {loading ? null : sortGoals(goals).map((goal) => Goal({ goal }))}
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    </MenuProvider>
  );
}

Home.propTypes = {
  goals: array,
  handleSignOutPress: func.isRequired,
  loading: bool.isRequired,
  handleTrainerHome: func.isRequired
};
