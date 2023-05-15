import { func } from 'prop-types';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { colors } from '../../../colors';
import { useStateValue } from '../../../utils/state/state';
import UserProfile from '../../../screens/UserProfile';
import HomeScreen from '../../../screens/Home';
import SearchUsersScreen from '../../../screens/SearchUsers';
import SearchPlansScreen from '../../../screens/SearchTrainingPlan';
import texts from '../../../texts';
import SearchedProfile from '../../../screens/SearchedProfile';
import EditUserProfile from '../../../screens/EditUserProfile';
import SearchedTrainingPlan from '../../../screens/SearchedTrainingPlan';
import TrainingInProgress from '../../../screens/TrainingInProgress';
import PersonalGoals from '../../../screens/PersonalGoals';
import CreateGoal from '../../../screens/CreateGoal';

function SearchUsersScreens() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={texts.SearchUsers.name}
        component={SearchUsersScreen}
        options={{ title: '', headerShown: false }}
      />
      <Stack.Screen name={texts.SearchedProfile.name} component={SearchedProfile} options={{ title: '' }} />
    </Stack.Navigator>
  );
}

function PersonalGoalsScreens() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen name={texts.PersonalGoals.name} component={PersonalGoals} options={{ title: '' }} />
      <Stack.Screen name={texts.CreateGoal.name} component={CreateGoal} options={{ title: '' }} />
    </Stack.Navigator>
  );
}

function SearchPlansScreens() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={texts.SearchTrainingPlans.name}
        component={SearchPlansScreen}
        options={{ title: '', headerShown: false }}
      />
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
  );
}

function UserProfileScreens() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        component={UserProfile}
        name={texts.UserProfile.name}
        options={{ title: '', headerShown: false }}
      />
      <Stack.Screen
        name={texts.EditUserProfile.name}
        component={EditUserProfile}
        options={{ title: 'Tu Perfil' }}
      />
    </Stack.Navigator>
  );
}
export default function AthleteStack({ tabBarIcons }) {
  const Tab = createBottomTabNavigator();
  const [state] = useStateValue();
  return state.athleteScreen ? (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: (icon) => tabBarIcons(route, icon),
          tabBarActiveTintColor: colors.purple,
          tabBarInactiveTintColor: colors.gray
        })}
      >
        <Tab.Screen component={HomeScreen} name={texts.Home.name} />
        <Tab.Screen component={SearchUsersScreens} name={texts.SearchUsers.name} />
        <Tab.Screen component={SearchPlansScreens} name={texts.SearchTrainingPlans.name} />
        <Tab.Screen component={UserProfileScreens} name={texts.UserProfile.name} />
        <Tab.Screen component={PersonalGoalsScreens} name={texts.PersonalGoals.name} />
      </Tab.Navigator>
    </NavigationContainer>
  ) : null;
}

AthleteStack.propTypes = {
  tabBarIcons: func.isRequired
};
