import React from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SearchedTrainingPlan from '../../../../../../../screens/SearchedTrainingPlan/layout';
import SearchPlansScreen from '../../../../../../../screens/SearchTrainingPlan';
import texts from '../../../../../../../texts';

export default function SearchPlansStack() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={texts.SearchTrainingPlans.name}
        component={SearchPlansScreen}
        options={{ title: '', headerShown: false }}
      />
      <Stack.Screen
        name={texts.SearchedTrainingPlan.name}
        component={SearchedTrainingPlan}
        options={{ title: '' }}
      />
    </Stack.Navigator>
  );
}
