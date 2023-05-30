import React from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SearchedTrainingPlan from '../../../../../../../screens/SearchedTrainingPlan';
import SearchPlansScreen from '../../../../../../../screens/Explore';
// import SearchUsersScreen from '../../../../../../../screens/SearchUsers';
import SearchedProfile from '../../../../../../../screens/SearchedProfile';
import TrainingInProgress from '../../../../../../../screens/TrainingInProgress';
import texts from '../../../../../../../texts';

export default function ExploreStack() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={texts.SearchTrainingPlans.name}
        component={SearchPlansScreen}
        options={{ title: '', headerShown: false }}
      />
    </Stack.Navigator>
  );
}
