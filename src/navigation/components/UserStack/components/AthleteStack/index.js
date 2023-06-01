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
import PrivateMessage from '../../../../../screens/PrivateMessage';

import ExploreStack from './components/ExploreStack';
import UserProfileStack from './components/UserProfileStack';
import FeedStack from './components/FeedStack';
import { MPHeader } from './layout';

function TabStack() {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: (icon) => tabBarIconsAthlete(route, icon),
        tabBarActiveTintColor: colors.purple,
        tabBarInactiveTintColor: colors.gray
      })}
    >
      <Tab.Screen component={HomeScreen} name={texts.Home.name} options={{ title: texts.Home.title }} />
      <Tab.Screen component={FeedStack} name={texts.Feed.name} options={{ title: texts.Feed.title }} />
      <Tab.Screen
        component={ExploreStack}
        name={texts.SearchPlansStack.name}
        options={{ title: texts.Explore.title }}
      />
      <Tab.Screen
        component={UserProfileStack}
        name={texts.UserProfileStack.name}
        options={{ title: texts.UserProfileStack.title }}
      />
    </Tab.Navigator>
  );
}
export default function AthleteStack() {
  const [state] = useStateValue();
  const Stack = createNativeStackNavigator();
  return state.athleteScreen ? (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Tab Stack" component={TabStack} options={{ title: '', headerShown: false }} />
        <Stack.Screen name={texts.SearchedProfile.name} component={SearchedProfile} options={{ title: '' }} />
        <Stack.Screen name={texts.PrivateMessage.name} component={PrivateMessage} options={MPHeader} />
        <Stack.Screen
          name={texts.SearchedTrainingPlan.name}
          component={SearchedTrainingPlan}
          options={{ title: '' }}
        />
        <Stack.Screen
          name={texts.TrainingInProgress.name}
          component={TrainingInProgress}
          options={{ title: '' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  ) : null;
}
