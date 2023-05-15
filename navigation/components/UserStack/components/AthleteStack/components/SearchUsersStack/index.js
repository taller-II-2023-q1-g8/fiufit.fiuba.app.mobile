import React from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SearchedProfile from '../../../../../../../screens/SearchedProfile';
import SearchUsersScreen from '../../../../../../../screens/SearchUsers';
import texts from '../../../../../../../texts';

export default function SearchUsersStack() {
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
