import { bool, object, func } from 'prop-types';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { colors } from '../../../colors';
import { StateProvider, useStateValue } from '../../../utils/state/state';
import TrainerHomeScreen from '../../../screens/TrainerHome';
import texts from '../../../texts';
import TrainerPlanViewContainer from '../../../screens/TrainerPlanView';

function TrainerHome() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={texts.TrainerHome.name}
        component={TrainerHomeScreen}
        options={{ title: '', headerShown: false }}
      />
      <Stack.Screen
        name={texts.TrainerPlanView.name}
        component={TrainerPlanViewContainer}
        options={{ title: '' }}
      />
    </Stack.Navigator>
  );
}
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
        <Tab.Screen component={TrainerHome} name={texts.TrainerHome.iconTitle} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

TrainerStack.propTypes = {
  tabBarIcons: func.isRequired
};
