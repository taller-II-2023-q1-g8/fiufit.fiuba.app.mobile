import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { colors } from '../../../../../colors';
import { useStateValue } from '../../../../../state';
import AddPlanScreen from '../../../../../screens/AddPlan';
import TrainerHomeScreen from '../../../../../screens/TrainerHome';
import texts from '../../../../../texts';
import { tabBarIconsTrainer } from '../../utils';
import TrainerPlanViewContainer from '../../../../../screens/TrainerPlanView';
import SearchedProfileContainer from '../../../../../screens/SearchedProfile';
import EditPlanScreen from '../../../../../screens/EditPlan';
import ExercisesInPlanScreen from '../../../../../screens/ExercisesInPlan';
import PlanStatsScreen from '../../../../../screens/PlanStats';

import TrainerProfileStack from './components/TrainerProfileStack';

function TabStack() {
  const Tab = createBottomTabNavigator();
  return (
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
      <Tab.Screen component={TrainerHomeScreen} name={texts.TrainerHome.iconTitle} />
      <Tab.Screen component={AddPlanScreen} name={texts.AddPlan.name} />
      <Tab.Screen component={TrainerProfileStack} name={texts.TrainerProfile.name} />
    </Tab.Navigator>
  );
}

export default function TrainerStack() {
  const [state] = useStateValue();
  const Stack = createNativeStackNavigator();
  return state.athleteScreen ? null : (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={() => ({
          headerTintColor: colors.white,
          headerTitleStyle: { fontWeight: 'bold' },
          headerTitleAlign: 'center',
          headerStyle: { backgroundColor: colors.header }
        })}
      >
        <Stack.Screen name="Tab Stack" component={TabStack} options={{ title: '', headerShown: false }} />
        <Stack.Screen
          name={texts.TrainerPlanView.name}
          component={TrainerPlanViewContainer}
          options={{ title: '' }}
        />
        <Stack.Screen
          name={texts.SearchedProfile.name}
          component={SearchedProfileContainer}
          options={{ title: '' }}
        />
        <Stack.Screen name={texts.EditPlan.name} component={EditPlanScreen} options={{ title: '' }} />
        <Stack.Screen
          name={texts.PlanExercises.name}
          component={ExercisesInPlanScreen}
          options={{ title: '' }}
        />
        <Stack.Screen name={texts.PlanStats.name} component={PlanStatsScreen} options={{ title: '' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
