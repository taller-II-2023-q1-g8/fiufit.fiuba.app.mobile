import React from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SearchPlansScreen from '../../../../../../../screens/Explore';
// import SearchUsersScreen from '../../../../../../../screens/SearchUsers';
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
