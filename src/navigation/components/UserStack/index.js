/* eslint-disable react/prop-types */
import Ionicons from 'react-native-vector-icons/Ionicons';
import React, { useEffect, useState } from 'react';

import ICONS from '../../constants';
import texts from '../../../texts';
import { useStateValue } from '../../../state';
import { fetchFollowedUsersByUsername, fetchUserByEmail, fetchUserGoalsByUsername } from '../../../requests';

import UserStack from './layout';

export default function UserStackContainer({ email }) {
  // Token es una promise, hay que ejecutarla en algun momento
  // Cargar aca el usuario en initial state y ejecutar la token promise
  // Para tener el token de validacion para hacer requests
  const [loading, setLoading] = useState(true);
  const [state, dispatch] = useStateValue();

  const fetchUser = async () => {
    const userResponse = await fetchUserByEmail(email);
    const userJson = await userResponse.json();
    const goalsResponse = await fetchUserGoalsByUsername(userJson.message.username);
    const goalsJson = await goalsResponse.json();
    const followed = await fetchFollowedUsersByUsername(userJson.message.username);
    const followedJson = await followed.json();

    console.log('b', userJson.message);

    dispatch({
      type: 'setUserData',
      user: userJson.message,
      userGoals: goalsJson.message,
      followedUsers: followedJson.message
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
    else if (route.name === texts.Feed.name) iconName = focused ? ICONS.PEOPLE : ICONS.FOCUSED_PEOPLE;
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
