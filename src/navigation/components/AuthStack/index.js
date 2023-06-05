import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import ForgotPassword from '../../../screens/Auth/ForgotPassword';
import Login from '../../../screens/Auth/Login';
import Register from '../../../screens/Auth/Register';
import { colors } from '../../../colors';
import FederatedRegister from '../../../screens/Auth/FederatedRegister';
import texts from '../../../texts';

const Stack = createNativeStackNavigator();

const options = {
  headerTintColor: colors.white,
  headerTitleStyle: { fontWeight: 'bold' },
  headerTitleAlign: 'center',
  headerStyle: { backgroundColor: colors.header }
};

export default function AuthStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen component={Login} name={texts.Login.name} options={{ headerShown: false }} />
        <Stack.Screen component={Register} name={texts.Register.name} options={options} />
        <Stack.Screen component={FederatedRegister} name={texts.FederatedRegister.name} options={options} />
        <Stack.Screen component={ForgotPassword} name={texts.ForgotPassword.name} options={options} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
