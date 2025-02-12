import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import texts from '../../../texts';
import ICONS from '../../constants';
import { colors } from '../../../colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const styles = StyleSheet.create({
  walkingContainerStyle: {
    height: 80,
    width: 80,
    backgroundColor: colors.main_soft,
    borderRadius: 100,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export const tabBarIconsAthlete = (route, { focused, color, size }) => {
  let iconName;
  if (route.name === texts.Home.name) iconName = focused ? ICONS.HOME : ICONS.FOCUSED_HOME;
  else if (route.name === texts.SearchUsersStack.name) iconName = focused ? ICONS.LIST : ICONS.FOCUSED_LIST;
  else if (route.name === texts.SearchPlansStack.name) iconName = focused ? ICONS.LIST : ICONS.FOCUSED_LIST;
  else if (route.name === texts.Walking.name) {
    const color1 = focused ? colors.drawer : color;
    return (
      <View style={styles.walkingContainerStyle}>
        <MaterialCommunityIcons name="shoe-print" size={30} color={color1} />
      </View>
    );
  } else if (route.name === texts.AddPlan.name) {
    iconName = focused ? ICONS.ADD : ICONS.FOCUSED_ADD;
    color = 'red';
  } else if (route.name === texts.UserProfileStack.name)
    iconName = focused ? ICONS.PERSON : ICONS.FOCUSED_PERSON;
  else if (route.name === texts.Feed.name) iconName = focused ? ICONS.PEOPLE : ICONS.FOCUSED_PEOPLE;
  return <Ionicons name={iconName} size={size} color={color} />;
};

export const tabBarIconsTrainer = (route, { focused, color, size }) => {
  let iconName;

  if (route.name === texts.TrainerHome.iconTitle) iconName = focused ? ICONS.HOME : ICONS.FOCUSED_HOME;
  else if (route.name === texts.AddPlan.name) {
    iconName = focused ? ICONS.ADD : ICONS.FOCUSED_ADD;
    const color1 = focused ? colors.drawer : color;
    return (
      <View style={styles.walkingContainerStyle}>
        <Ionicons name={iconName} size={30} color={color1} />
      </View>
    );
  } else if (route.name === texts.TrainerProfile.name) {
    iconName = focused ? ICONS.TRAINER_PROFILE : ICONS.FOCUSED_TRAINER_PROFILE;
  }
  return <Ionicons name={iconName} size={size} color={color} />;
};
