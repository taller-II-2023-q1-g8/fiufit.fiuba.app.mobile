import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import ForgotPassword from '../../../screens/Auth/ForgotPassword';
import Login from '../../../screens/Auth/Login';
import Register from '../../../screens/Auth/Register';
import { colors } from '../../../colors';
import FederatedRegister from '../../../screens/Auth/FederatedRegister';
import texts from '../../../texts';

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
          component={FederatedRegister}
          name={texts.FederatedRegister.name}
          options={defaultNavigationOptions}
        />
        <Stack.Screen
          component={ForgotPassword}
          name={texts.ForgotPassword.name}
          options={defaultNavigationOptions}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
