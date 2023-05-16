import { func } from 'prop-types';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';

import { colors } from '../../../../../colors';
import { useStateValue } from '../../../../../utils/state/state';
import HomeScreen from '../../../../../screens/Home';
import texts from '../../../../../texts';
import AddPlanScreen from '../../../../../screens/AddPlan';

import SearchUsersStack from './components/SearchUsersStack';
import SearchPlansStack from './components/SearchPlansStack';
import UserProfileStack from './components/UserProfileStack';

export default function AthleteStack({ tabBarIcons }) {
  const Tab = createBottomTabNavigator();
  const [state, dispatch] = useStateValue();
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
        <Tab.Screen component={SearchUsersStack} name={texts.SearchUsers.name} />
        <Tab.Screen component={AddPlanScreen} name={texts.AddPlan.name} />
        <Tab.Screen component={SearchPlansStack} name={texts.SearchTrainingPlans.name} />
        <Tab.Screen component={UserProfileStack} name={texts.UserProfile.name} />
      </Tab.Navigator>
    </NavigationContainer>
  ) : null;
}

AthleteStack.propTypes = {
  tabBarIcons: func.isRequired
};
