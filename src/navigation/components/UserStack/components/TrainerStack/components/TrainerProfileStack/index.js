import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react-native';

import { colors } from '../../../../../../../colors';
import texts from '../../../../../../../texts';
import TrainerProfileContainer from '../../../../../../../screens/TrainerProfile';
import EditUserProfileContainer from '../../../../../../../screens/EditUserProfile';

export default function UserProfileStack() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={() => ({
        headerTintColor: colors.white,
        headerTitleStyle: { fontWeight: 'bold' },
        headerTitleAlign: 'center',
        headerStyle: { backgroundColor: colors.header }
      })}
    >
      <Stack.Screen
        component={TrainerProfileContainer}
        name={texts.TrainerProfile.name}
        options={{ headerShown: false }}
      />
      <Stack.Screen name={texts.EditUserProfile.name} component={EditUserProfileContainer} />
    </Stack.Navigator>
  );
}
