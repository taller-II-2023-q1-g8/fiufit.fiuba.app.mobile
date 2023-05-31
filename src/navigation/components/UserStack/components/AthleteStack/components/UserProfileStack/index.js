import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react-native';

import EditUserProfile from '../../../../../../../screens/EditUserProfile';
import UserProfile from '../../../../../../../screens/UserProfile';
import PersonalGoals from '../../../../../../../screens/PersonalGoals';
import CreateGoal from '../../../../../../../screens/CreateGoal';
import TabViewExample from '../../../../../../../screens/FollowersScreen';
import texts from '../../../../../../../texts';

function PersonalGoalsScreens() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen name={texts.PersonalGoals.name} component={PersonalGoals} />
      <Stack.Screen name={texts.CreateGoal.name} component={CreateGoal} />
    </Stack.Navigator>
  );
}

export default function UserProfileStack() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        component={UserProfile}
        name={texts.UserProfile.name}
        options={{ title: '', headerShown: false }}
      />
      <Stack.Screen
        name={texts.EditUserProfile.name}
        component={EditUserProfile}
        options={{ title: 'Tu Perfil' }}
      />
      <Stack.Screen
        component={PersonalGoalsScreens}
        name={texts.PersonalGoals.name}
        options={{ title: '', headerShown: false }}
      />
    </Stack.Navigator>
  );
}
