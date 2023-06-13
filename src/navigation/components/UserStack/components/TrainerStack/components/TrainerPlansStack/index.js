import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SearchedProfileContainer from '../../../../../../../screens/SearchedProfile';
import TrainerHomeScreen from '../../../../../../../screens/TrainerHome';
import TrainerPlanViewContainer from '../../../../../../../screens/TrainerPlanView';
import texts from '../../../../../../../texts';
import PlanExercisesScreen from '../../../../../../../screens/PlanExercises';
import PlanStatsScreen from '../../../../../../../screens/PlanStats';
import EditPlanScreen from '../../../../../../../screens/EditPlan';

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
      <Stack.Screen
        name={texts.SearchedProfile.name}
        component={SearchedProfileContainer}
        options={{ title: '' }}
      />
      <Stack.Screen name={texts.EditPlan.name} component={EditPlanScreen} options={{ title: '' }} />
      <Stack.Screen name={texts.PlanExercises.name} component={PlanExercisesScreen} options={{ title: '' }} />
      <Stack.Screen name={texts.PlanStats.name} component={PlanStatsScreen} options={{ title: '' }} />
    </Stack.Navigator>
  );
}
