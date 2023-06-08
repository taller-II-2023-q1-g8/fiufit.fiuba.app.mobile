import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react-native';

import EditUserProfile from '../../../../../../../screens/EditUserProfile';
import UserProfile from '../../../../../../../screens/UserProfile';
import PersonalGoals from '../../../../../../../screens/PersonalGoals';
import CreateGoal from '../../../../../../../screens/CreateGoal';
import TabViewExample from '../../../../../../../screens/FollowersScreen';
import texts from '../../../../../../../texts';
import { colors } from '../../../../../../../colors';

function PersonalGoalsStack() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={texts.PersonalGoals.name}
        component={PersonalGoals}
        options={{ headerShown: false }}
      />
      <Stack.Screen name={texts.CreateGoal.name} component={CreateGoal} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

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
      <Stack.Screen component={UserProfile} name={texts.UserProfile.name} options={{ headerShown: false }} />
      <Stack.Screen name={texts.EditUserProfile.name} component={EditUserProfile} />
      <Stack.Screen component={PersonalGoalsStack} name={texts.PersonalGoalsStack.name} />
    </Stack.Navigator>
  );
}
