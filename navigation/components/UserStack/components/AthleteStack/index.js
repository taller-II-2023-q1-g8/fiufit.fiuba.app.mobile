import { func } from 'prop-types';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';

import { colors } from '../../../../../colors';
import { useStateValue } from '../../../../../utils/state/state';
import HomeScreen from '../../../../../screens/Home';
import texts from '../../../../../texts';
import FeedScreen from '../../../../../screens/Feed';

import ExploreStack from './components/ExploreStack';
import FeedStack from './components/FeedStack';
import UserProfileStack from './components/UserProfileStack';

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
    </NavigationContainer>
  ) : null;
}

AthleteStack.propTypes = {
  tabBarIcons: func.isRequired
};
