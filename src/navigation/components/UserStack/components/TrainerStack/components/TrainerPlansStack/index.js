import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TrainerHomeScreen from '../../../../../../../screens/TrainerHome';
import TrainerPlanViewContainer from '../../../../../../../screens/TrainerPlanView';
import texts from '../../../../../../../texts';

export default function TrainerPlanStack() {
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
