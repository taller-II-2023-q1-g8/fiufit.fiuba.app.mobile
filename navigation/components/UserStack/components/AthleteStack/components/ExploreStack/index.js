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
      <Stack.Screen
        name={texts.SearchedTrainingPlan.name}
        component={SearchedTrainingPlan}
        options={{ title: '' }}
      />
      <Stack.Screen
        name={texts.TrainingInProgress.name}
        component={TrainingInProgress}
        options={{ title: '' }}
      />
      {/* <Stack.Screen
        name={texts.SearchUsers.name}
        component={SearchUsersScreen}
        options={{ title: '', headerShown: false }}
      /> */}
      <Stack.Screen name={texts.SearchedProfile.name} component={SearchedProfile} options={{ title: '' }} />
    </Stack.Navigator>
  );
}
