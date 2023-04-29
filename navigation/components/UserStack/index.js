import { NavigationContainer } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React, { useEffect, useState } from 'react';

import { Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { number, string } from 'prop-types';
import { colors } from '../../../colors';
import { StateProvider } from '../../../utils/state/state';
import CoffeeAutonomous from '../../../screens/Profile';
import HomeScreen from '../../../screens/Home';
import SearchUsersScreen from '../../../screens/SearchUsers';
import texts from '../../../texts';

// eslint-disable-next-line no-unused-vars
export default function UserStack({ email, token }) {
  // Token es una promise, hay que ejecutarla en algun momento
  // Cargar aca el usuario en initial state y ejecutar la token promise
  // Para tener el token de validacion para hacer requests
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    const response = await fetch(
      `https://api-gateway-k1nl.onrender.com/user?email=${email}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        mode: 'cors'
      }
    );
    const json = await response.json();
    // eslint-disable-next-line no-console
    console.log(json.message);
    const initialState = {
      user: json.message
    };
    setData(initialState);
    setLoading(false);
  };
  useEffect(() => {
    fetchUser();
  }, []);

  const reducer = (state, action) => {
    switch (action.type) {
      case 'changeUser':
        return {
          ...state,
          user: action.newUser
        };
      default:
        return state;
    }
  };

  const Tab = createBottomTabNavigator();

  return loading ? (
    <View>
      <Text> Loading... </Text>
    </View>
  ) : (
    <StateProvider initialState={data} reducer={reducer}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            // eslint-disable-next-line react/no-unstable-nested-components
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === texts.Home.name)
                iconName = focused ? 'home' : 'home-outline';
              else if (route.name === texts.SearchUsers.name)
                iconName = focused ? 'ios-list' : 'ios-list-outline';
              else if (route.name === texts.Profile.name)
                iconName = focused ? 'person' : 'person-outline';

              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: colors.purple,
            tabBarInactiveTintColor: colors.gray
          })}
        >
          <Tab.Screen component={HomeScreen} name={texts.Home.name} />
          <Tab.Screen component={CoffeeAutonomous} name={texts.Profile.name} />
          <Tab.Screen
            component={SearchUsersScreen}
            name={texts.SearchUsers.name}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </StateProvider>
  );
}

UserStack.propTypes = {
  email: string.isRequired,
  token: number.isRequired
};
