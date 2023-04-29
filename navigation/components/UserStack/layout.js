import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View } from 'react-native';
import { bool, object, func } from 'prop-types';

import { colors } from '../../../colors';
import { StateProvider } from '../../../utils/state/state';
import CoffeeAutonomous from '../../../screens/Profile';
import HomeScreen from '../../../screens/Home';
import SearchUsersScreen from '../../../screens/SearchUsers';
import texts from '../../../texts';

export default function UserStack({ loading, data, reducer, tabBarIcons }) {
  const Tab = createBottomTabNavigator();
  console.log({ data });
  return loading ? (
    <View>
      <Text> Loading... </Text>
    </View>
  ) : (
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
          <Tab.Screen component={CoffeeAutonomous} name={texts.Profile.name} />
          <Tab.Screen component={SearchUsersScreen} name={texts.SearchUsers.name} />
        </Tab.Navigator>
      </NavigationContainer>
    </StateProvider>
  );
}

UserStack.propTypes = {
  loading: bool.isRequired,
  data: object.isRequired,
  reducer: func.isRequired,
  tabBarIcons: func.isRequired
};
