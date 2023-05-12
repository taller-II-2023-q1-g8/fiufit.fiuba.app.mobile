import { bool, object, func } from 'prop-types';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';

import { colors } from '../../../colors';
import { StateProvider, useStateValue } from '../../../utils/state/state';
import TrainerHomeScreen from '../../../screens/TrainerHome';
import texts from '../../../texts';

export default function TrainerStack({ tabBarIcons }) {
  const [state, dispatch] = useStateValue();
  const Tab = createBottomTabNavigator();
  return state.athleteScreen ? null : (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: (icon) => tabBarIcons(route, icon),
          tabBarActiveTintColor: colors.purple,
          tabBarInactiveTintColor: colors.gray
        })}
      >
        <Tab.Screen component={TrainerHomeScreen} name={texts.TrainerHome.iconTitle} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

TrainerStack.propTypes = {
  tabBarIcons: func.isRequired
};
