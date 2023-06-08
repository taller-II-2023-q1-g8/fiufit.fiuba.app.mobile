import React from 'react';
import { KeyboardAvoidingView, ScrollView, Text, View, ImageBackground } from 'react-native';
import { bool, func, array } from 'prop-types';
import { MenuProvider, MenuOption, MenuOptions, Menu, MenuTrigger } from 'react-native-popup-menu';

import { colors } from '../../colors';
import { Goal } from '../PersonalGoals/layout';
import BackgroundImage from '../../assets/Background.jpg';
import Loader from '../../components/Loader';
import texts from '../../texts';

import { scrollviewStyle, styles } from './styles';

const homeTexts = texts.Home;

function DotMenu({ handleTrainerHome, handleSignOutPress }) {
  return (
    <View>
      <Menu>
        <MenuTrigger>
          <Text style={{ fontSize: 20, color: colors.white }}>• • •</Text>
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
  const sortedGoals =
    userGoals
      .sort?.((a, b) => new Date(a.deadline) - new Date(b.deadline))
      .filter((goal) => goal.status === 'in_progress') || [];
  const now = new Date();

  // de las más cercanas a expirar, muestro 3
  const closestGoals = sortedGoals.filter((goal, index) => index < 3 || new Date(goal.deadline) < now);
  return closestGoals;
};
export default function Home({ goals, handleSignOutPress, loading, handleTrainerHome }) {
  return (
    <MenuProvider>
      <ImageBackground source={BackgroundImage} resizeMode="cover">
        <View style={styles.container}>
          <Loader loading={loading} />
          <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={scrollviewStyle}>
            <View style={styles.homeHeader}>
              <Text style={{ ...styles.title, color: colors.white }}>{homeTexts.title}</Text>
              <DotMenu handleTrainerHome={handleTrainerHome} handleSignOutPress={handleSignOutPress} />
            </View>
            <KeyboardAvoidingView style={styles.formContainer} enabled>
              <Text style={styles.goalsTitle}>{homeTexts.closeGoalsTitle}</Text>
              {loading ? null : sortGoals(goals).map((goal) => Goal({ goal }))}
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </ImageBackground>
    </MenuProvider>
  );
}

Home.propTypes = {
  goals: array,
  handleSignOutPress: func.isRequired,
  loading: bool.isRequired,
  handleTrainerHome: func.isRequired
};
