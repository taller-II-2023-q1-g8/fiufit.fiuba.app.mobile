import React from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SearchedTrainingPlan from '../../../../../../../screens/SearchedTrainingPlan';
import SearchPlansScreen from '../../../../../../../screens/Explore';
// import SearchUsersScreen from '../../../../../../../screens/SearchUsers';
import SearchedProfile from '../../../../../../../screens/SearchedProfile';
import Feed from '../../../../../../../screens/Feed';
import TrainingInProgress from '../../../../../../../screens/TrainingInProgress';
import texts from '../../../../../../../texts';

export default function FeedStack() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen name={texts.Feed.name} component={Feed} options={{ title: '', headerShown: false }} />
      <Stack.Screen name={texts.SearchedProfile.name} component={SearchedProfile} options={{ title: '' }} />
    </Stack.Navigator>
  );
}
