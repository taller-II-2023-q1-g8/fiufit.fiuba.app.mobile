import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';

import { colors } from '../../../../../colors';
import { tabBarIconsAthlete } from '../../utils';
import { useStateValue } from '../../../../../state';
import HomeScreen from '../../../../../screens/Home';
import SearchedProfile from '../../../../../screens/SearchedProfile';
import SearchedTrainingPlan from '../../../../../screens/SearchedTrainingPlan';
import texts from '../../../../../texts';
import AthleteTrainingPlanScreen from '../../../../../screens/AthleteTrainingPlan';
import PrivateMessage from '../../../../../screens/PrivateMessage';
import ExerciseScreen from '../../../../../screens/Exercise';
import RestScreen from '../../../../../screens/Rest';
import RatingScreen from '../../../../../screens/Rating';

import ExploreStack from './components/ExploreStack';
import FeedStack from './components/FeedStack';
import { MPHeader } from './layout';
import UserProfileStack from './components/UserProfileStack';

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
        <Stack.Screen name="Tab Stack" component={TabStack} options={{ title: '', headerShown: false }} />
        <Stack.Screen name={texts.SearchedProfile.name} component={SearchedProfile} options={{ title: '' }} />
        <Stack.Screen name={texts.PrivateMessage.name} component={PrivateMessage} options={MPHeader} />
        <Stack.Screen
          name={texts.SearchedTrainingPlan.name}
          component={SearchedTrainingPlan}
          options={{ title: '' }}
        />
        <Stack.Screen
          name={texts.AthleteTrainingPlan.name}
          component={AthleteTrainingPlanScreen}
          options={{ title: '' }}
        />
        <Stack.Screen name={texts.Exercise.name} component={ExerciseScreen} options={{ title: '' }} />
        <Stack.Screen name={texts.Rest.name} component={RestScreen} options={{ title: '' }} />
        <Stack.Screen name={texts.Rating.name} component={RatingScreen} options={{ title: '' }} />
      </Stack.Navigator>
    </NavigationContainer>
  ) : null;
}
