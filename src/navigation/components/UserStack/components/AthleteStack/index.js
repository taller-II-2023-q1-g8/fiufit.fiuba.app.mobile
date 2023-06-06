import { func } from 'prop-types';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { colors } from '../../../../../colors';
import { useStateValue } from '../../../../../state';
import HomeScreen from '../../../../../screens/Home';
import texts from '../../../../../texts';
import { tabBarIconsAthlete } from '../../utils';
import SearchedProfile from '../../../../../screens/SearchedProfile';
import SearchedTrainingPlan from '../../../../../screens/SearchedTrainingPlan';
import TrainingInProgress from '../../../../../screens/TrainingInProgress';

import ExploreStack from './components/ExploreStack';
import UserProfileStack from './components/UserProfileStack';
import FeedStack from './components/FeedStack';

function TabStack() {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.main,
        tabBarIcon: (icon) => tabBarIconsAthlete(route, icon),
        tabBarInactiveTintColor: colors.gray,
        tabBarShowLabel: false,
        tabBarStyle: { backgroundColor: colors.header, height: 60 }
      })}
    >
      <Tab.Screen component={HomeScreen} name={texts.Home.name} />
      <Tab.Screen component={FeedStack} name={texts.Feed.name} />
      <Tab.Screen component={ExploreStack} name={texts.SearchPlansStack.name} />
      <Tab.Screen component={UserProfileStack} name={texts.UserProfileStack.name} />
    </Tab.Navigator>
  );
}

export default function AthleteStack() {
  const [state] = useStateValue();
  const Stack = createNativeStackNavigator();
  return state.athleteScreen ? (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={() => ({
          headerTintColor: colors.white,
          headerTitleStyle: { fontWeight: 'bold' },
          headerTitleAlign: 'center',
          headerStyle: { backgroundColor: colors.header }
        })}
      >
        <Stack.Screen name="Tab Stack" component={TabStack} options={{ headerShown: false }} />
        <Stack.Screen name={texts.SearchedProfile.name} component={SearchedProfile} />
        <Stack.Screen name={texts.SearchedTrainingPlan.name} component={SearchedTrainingPlan} />
        <Stack.Screen name={texts.TrainingInProgress.name} component={TrainingInProgress} />
      </Stack.Navigator>
    </NavigationContainer>
  ) : null;
}
