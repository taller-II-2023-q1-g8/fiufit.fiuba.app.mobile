import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react-native';

import { colors } from '../../../../../../../colors';
import texts from '../../../../../../../texts';
import TrainerProfileContainer from '../../../../../../../screens/TrainerProfile';
import EditTrainerProfile from '../../../../../../../screens/EditTrainerProfile';

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
      <Stack.Screen name={texts.EditTrainerProfile.name} component={EditTrainerProfile} />
    </Stack.Navigator>
  );
}
