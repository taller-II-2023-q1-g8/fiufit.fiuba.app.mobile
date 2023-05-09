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
        options={{ title: 'Editar' }}
      />
    </Stack.Navigator>
  );
}
export default function AthleteStack({ tabBarIcons }) {
  const Tab = createBottomTabNavigator();

  return (
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
        <Tab.Screen component={UserProfileScreens} name={texts.UserProfile.name} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

AthleteStack.propTypes = {
  tabBarIcons: func.isRequired
};
