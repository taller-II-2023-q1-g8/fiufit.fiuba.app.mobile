import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import ForgotPassword from '../../../screens/ForgotPassword';
import Login from '../../../screens/Login';
import Register from '../../../screens/Register';
import texts from '../../../texts';
import { colors } from '../../../colors';

const appTexts = texts.App;
const Stack = createNativeStackNavigator();

const defaultNavigationOptions = {
  title: appTexts.headerTitle,
  headerTintColor: colors.white,
  headerTitleStyle: {
    fontWeight: 'bold'
  },
  headerTitleAlign: 'center',
  headerStyle: {
    backgroundColor: colors.purple
  }
};

export default function AuthStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen component={Login} name={texts.Login.name} options={defaultNavigationOptions} />
        <Stack.Screen component={Register} name={texts.Register.name} options={defaultNavigationOptions} />
        <Stack.Screen
          component={ForgotPassword}
          name={texts.ForgotPassword.name}
          options={defaultNavigationOptions}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
