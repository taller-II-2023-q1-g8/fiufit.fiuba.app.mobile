import Ionicons from 'react-native-vector-icons/Ionicons';
import React, { useEffect, useState } from 'react';
import { object, string } from 'prop-types';

import texts from '../../../texts';
import ICONS from '../../constants';
import { fetchUserByEmail } from '../../../requests';

import UserStack from './layout';

export default function UserStackContainer({ email, token }) {
  // Token es una promise, hay que ejecutarla en algun momento
  // Cargar aca el usuario en initial state y ejecutar la token promise
  // Para tener el token de validacion para hacer requests
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    const response = await fetchUserByEmail(email);
    const json = await response.json();
    console.log(json);
    const initialState = {
      user: json.message,
      athleteScreen: true
    };
    setData(initialState);
    console.log('abc');
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
      case 'changeCurrentStack':
        return {
          ...state,
          athleteScreen: action.newScreen
        };
      default:
        return state;
    }
  };

  const tabBarIconsAthlete = (route, { focused, color, size }) => {
    let iconName;

    if (route.name === texts.Home.name) iconName = focused ? ICONS.HOME : ICONS.FOCUSED_HOME;
    else if (route.name === texts.SearchUsers.name) iconName = focused ? ICONS.LIST : ICONS.FOCUSED_LIST;
    else if (route.name === texts.SearchTrainingPlans.name)
      iconName = focused ? ICONS.LIST : ICONS.FOCUSED_LIST;
    else if (route.name === texts.UserProfile.name) iconName = focused ? ICONS.PERSON : ICONS.FOCUSED_PERSON;

    return <Ionicons name={iconName} size={size} color={color} />;
  };
  const tabBarIconsTrainer = (route, { focused, color, size }) => {
    let iconName;

    if (route.name === texts.TrainerHome.iconTitle) iconName = focused ? ICONS.HOME : ICONS.FOCUSED_HOME;

    return <Ionicons name={iconName} size={size} color={color} />;
  };
  // Agregar state provider aca?
  return (
    <UserStack
      data={data}
      loading={loading}
      reducer={reducer}
      tabBarIconsAthlete={tabBarIconsAthlete}
      tabBarIconsTrainer={tabBarIconsTrainer}
    />
  );
}

UserStackContainer.propTypes = {
  email: string.isRequired,
  token: object.isRequired
};
