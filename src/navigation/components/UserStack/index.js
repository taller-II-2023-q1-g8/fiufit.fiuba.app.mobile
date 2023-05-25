/* eslint-disable react/prop-types */
import Ionicons from 'react-native-vector-icons/Ionicons';
import React, { useEffect, useState } from 'react';

import ICONS from '../../constants';
import texts from '../../../texts';
import { useStateValue } from '../../../utils/state/state';
import { fetchUserByEmail, fetchUserGoalsByUsername } from '../../../requests';
import { isEmpty } from '../../../utils';

import UserStack from './layout';

export default function UserStackContainer({ email }) {
  // Token es una promise, hay que ejecutarla en algun momento
  // Cargar aca el usuario en initial state y ejecutar la token promise
  // Para tener el token de validacion para hacer requests
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [state, dispatch] = useStateValue();

  const fetchUser = async () => {
    const userResponse = await fetchUserByEmail(email);
    const userJson = await userResponse.json();
    const goalsResponse = await fetchUserGoalsByUsername(userJson.message.username);
    const goalsJson = await goalsResponse.json();
    console.log({ userJson: userJson.message, goalsJson: goalsJson.message });

    dispatch({
      type: 'setUserData',
      user: userJson.message,
      userGoals: goalsJson.message
    });
    setLoading(false);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const tabBarIconsAthlete = (route, { focused, color, size }) => {
    let iconName;

    if (route.name === texts.Home.name) iconName = focused ? ICONS.HOME : ICONS.FOCUSED_HOME;
    else if (route.name === texts.SearchUsersStack.name) iconName = focused ? ICONS.LIST : ICONS.FOCUSED_LIST;
    else if (route.name === texts.SearchPlansStack.name) iconName = focused ? ICONS.LIST : ICONS.FOCUSED_LIST;
    else if (route.name === texts.AddPlan.name) {
      iconName = focused ? ICONS.ADD : ICONS.FOCUSED_ADD;
      color = 'red';
    } else if (route.name === texts.UserProfileStack.name)
      iconName = focused ? ICONS.PERSON : ICONS.FOCUSED_PERSON;

    return <Ionicons name={iconName} size={size} color={color} />;
  };

  const tabBarIconsTrainer = (route, { focused, color, size }) => {
    let iconName;

    if (route.name === texts.TrainerHome.iconTitle) iconName = focused ? ICONS.HOME : ICONS.FOCUSED_HOME;
    else if (route.name === texts.AddPlan.name) {
      iconName = focused ? ICONS.ADD : ICONS.FOCUSED_ADD;
      color = 'red';
    }
    return <Ionicons name={iconName} size={size} color={color} />;
  };

  return (
    <UserStack
      loading={loading}
      tabBarIconsAthlete={tabBarIconsAthlete}
      tabBarIconsTrainer={tabBarIconsTrainer}
    />
  );
}
