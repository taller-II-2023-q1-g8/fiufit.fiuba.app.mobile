import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';

import { colors } from '../../../../../colors';
import { useStateValue } from '../../../../../state';
import AddPlanScreen from '../../../../../screens/AddPlan';
import texts from '../../../../../texts';
import { tabBarIconsTrainer } from '../../utils';

import TrainerProfileStack from './components/TrainerProfileStack';
import TrainerPlanStack from './components/TrainerPlansStack';

export default function TrainerStack() {
  const [state] = useStateValue();
  const Tab = createBottomTabNavigator();
  return state.athleteScreen ? null : (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: colors.main,
          tabBarIcon: (icon) => tabBarIconsTrainer(route, icon),
          tabBarInactiveTintColor: colors.gray,
          tabBarShowLabel: false,
          tabBarStyle: { backgroundColor: colors.header, height: 60 }
        })}
      >
        <Tab.Screen component={TrainerPlanStack} name={texts.TrainerHome.iconTitle} />
        <Tab.Screen component={AddPlanScreen} name={texts.AddPlan.name} />
        <Tab.Screen component={TrainerProfileStack} name={texts.TrainerProfile.name} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
