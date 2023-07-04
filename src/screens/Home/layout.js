import React, { useEffect, useState } from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  Image
} from 'react-native';
import { bool, func, array, object } from 'prop-types';
import { MenuProvider, MenuOption, MenuOptions, Menu, MenuTrigger } from 'react-native-popup-menu';

import { colors } from '../../colors';
import { Goal } from '../PersonalGoals/layout';
import BackgroundImage from '../../assets/Background.jpg';
import Loader from '../../components/Loader';
import texts from '../../texts';
import manPic from '../../assets/man.jpeg';
import { dateToDisplayString } from '../Feed/layout';
import { getPlanPicURL } from '../../utils';

import { scrollviewStyle, styles } from './styles';

const homeTexts = texts.Home;

function handlePressAux(id) {
  console.log('ejecutar: handlePress(plan.id)');
}

function difficultyToDisplay(dif) {
  if (dif === 'HARD') return 'DIFÍCIL';
  if (dif === 'NORMAL') return 'MEDIA';
  if (dif === 'EASY') return 'FÁCIL';
  return '-';
}

function SuggestedPlan({ plan, handlePress }) {
  const [planPicUrl, setPlanPicUrl] = useState(null);
  const fetchPlanPicUrl = async () => {
    const url = await getPlanPicURL(plan.id);
    setPlanPicUrl(url);
  };

  useEffect(() => {
    fetchPlanPicUrl();
  }, []);

  return (
    <View style={styles.trainingCompletedContainer}>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => handlePress(plan)}
        style={styles.trainingCompletedHeader}
      >
        <View style={styles.profilePicture}>
          {planPicUrl !== null ? (
            <Image source={{ uri: planPicUrl }} style={styles.userPhoto} />
          ) : (
            <Image source={manPic} style={styles.userPhoto} />
          )}
        </View>
        <View style={styles.usernameContainer}>
          <View style={styles.usernameWrapper}>
            <Text style={styles.usernameText}>{plan.title}</Text>
          </View>
          <View style={styles.dateWrapper}>
            <Text style={styles.dateText}>{`Creado ${dateToDisplayString(new Date(plan.created_at))}`}</Text>
          </View>
        </View>
      </TouchableOpacity>
      <View style={styles.border} />
      <View style={styles.trainingCompletedBody}>
        <View style={styles.descriptionContainer}>
          <Text style={styles.label}>Descripción:</Text>
          <Text style={styles.planDescText}>{plan.description}</Text>
        </View>
        <View style={styles.bottomContainer}>
          <View style={styles.bottomLeft}>
            <Text style={styles.planDifficulty}>Dificultad: </Text>
            <Text style={styles.planDifficultyText}>{difficultyToDisplay(plan.difficulty)}</Text>
          </View>
          <View style={styles.bottomMiddle}>
            <Text style={styles.planDifficulty}>Tags: </Text>
            <Text style={styles.planTagsText}>{plan.tags}</Text>
          </View>
          <View style={styles.bottomRight}>
            <Text style={styles.planCalification}>Calificación: </Text>
            {plan.averageCalification === -1 ? (
              <Text style={styles.planScore}>-/10</Text>
            ) : (
              <Text style={styles.planScore}>{Number(plan.averageCalification.toFixed(1))}/10</Text>
            )}
          </View>
        </View>
      </View>
    </View>
  );
}
function LastPlan({ plan, handlePress }) {
  const [planPicUrl, setPlanPicUrl] = useState(null);
  const fetchPlanPicUrl = async () => {
    const url = await getPlanPicURL(plan.id);
    setPlanPicUrl(url);
  };

  useEffect(() => {
    fetchPlanPicUrl();
  }, []);

  return (
    <View style={styles.trainingCompletedContainer}>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => handlePress(plan.plan)}
        style={styles.trainingCompletedHeader}
      >
        <View style={styles.profilePicture}>
          {planPicUrl !== null ? (
            <Image source={{ uri: planPicUrl }} style={styles.userPhoto} />
          ) : (
            <Image source={manPic} style={styles.userPhoto} />
          )}
        </View>
        <View style={styles.usernameContainer}>
          <View style={styles.usernameWrapper}>
            <Text style={styles.usernameText}>{plan.plan.title}</Text>
          </View>
          <View style={styles.dateWrapper}>
            <Text style={styles.dateText}>{`Realizado ${dateToDisplayString(new Date(plan.date))}`}</Text>
          </View>
        </View>
      </TouchableOpacity>
      <View style={styles.border} />
      <View style={styles.trainingCompletedBody}>
        <View style={styles.descriptionContainer}>
          <Text style={styles.label}>Descripción:</Text>
          <Text style={styles.planDescText}>{plan.plan.description}</Text>
        </View>
        <View style={styles.bottomContainer}>
          <View style={styles.bottomLeft}>
            <Text style={styles.planDifficulty}>Dificultad: </Text>
            <Text style={styles.planDifficultyText}>{difficultyToDisplay(plan.plan.difficulty)}</Text>
          </View>
          <View style={styles.bottomMiddle}>
            <Text style={styles.planDifficulty}>Tags: </Text>
            <Text style={styles.planTagsText}>{plan.plan.tags}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

SuggestedPlan.propTypes = {
  plan: object.isRequired,
  handlePress: func.isRequired
};

LastPlan.propTypes = {
  plan: object.isRequired,
  handlePress: func.isRequired
};

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
export default function Home({
  goals,
  suggestedPlans,
  lastPlans,
  handleSignOutPress,
  loading,
  handleTrainerHome,
  handlePlanPress
}) {
  return (
    <MenuProvider>
      <ImageBackground source={BackgroundImage} resizeMode="cover">
        <Loader loading={loading} />

        <View style={styles.container}>
          {loading ? null : (
            <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={scrollviewStyle}>
              <View style={styles.homeHeader}>
                <Text style={{ ...styles.title, color: colors.white }}>{homeTexts.title}</Text>
              </View>
              <KeyboardAvoidingView style={styles.formContainer} enabled>
                <Text style={styles.goalsTitle}>{homeTexts.closeGoalsTitle}</Text>
                {loading ? null : sortGoals(goals).map((goal) => Goal({ goal }))}
                <Text style={styles.suggestedPlansT}>{homeTexts.lastPlansTitles}</Text>
                {lastPlans.map((plan) => (
                  <LastPlan key={plan.id} plan={plan} handlePress={handlePlanPress} />
                ))}
                <Text style={styles.suggestedPlansT}>{homeTexts.suggestedPlansTitle}</Text>
                {loading
                  ? null
                  : suggestedPlans.map((plan) => (
                      <SuggestedPlan key={plan.id} plan={plan} handlePress={handlePlanPress} />
                    ))}
              </KeyboardAvoidingView>
            </ScrollView>
          )}
        </View>
      </ImageBackground>
    </MenuProvider>
  );
}

Home.propTypes = {
  goals: array,
  suggestedPlans: array,
  handleSignOutPress: func.isRequired,
  loading: bool.isRequired,
  handleTrainerHome: func.isRequired,
  handlePlanPress: func.isRequired,
  lastPlans: array
};
