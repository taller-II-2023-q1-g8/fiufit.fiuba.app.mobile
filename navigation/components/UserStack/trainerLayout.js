import { bool, object, func } from 'prop-types';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { colors } from '../../../colors';
import { StateProvider } from '../../../utils/state/state';
import UserProfile from '../../../screens/UserProfile';
import HomeScreen from '../../../screens/Home';
import SearchUsersScreen from '../../../screens/SearchUsers';
import texts from '../../../texts';
import SearchedProfile from '../../../screens/SearchedProfile';
import EditUserProfile from '../../../screens/EditUserProfile';

export default function TrainerStack({ data, reducer, tabBarIcons }) {
  const Tab = createBottomTabNavigator();

  return (
    <StateProvider initialState={data} reducer={reducer}>
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
        </Tab.Navigator>
      </NavigationContainer>
    </StateProvider>
  );
}

TrainerStack.propTypes = {
  data: object.isRequired,
  reducer: func.isRequired,
  tabBarIcons: func.isRequired
};
