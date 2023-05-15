import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react-native';

import EditUserProfile from '../../../../../../../screens/EditUserProfile';
import texts from '../../../../../../../texts';
import UserProfile from '../../../../../../../screens/UserProfile/layout';

export default function UserProfileStack() {
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
