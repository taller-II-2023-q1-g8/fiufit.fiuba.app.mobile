import Ionicons from 'react-native-vector-icons/Ionicons';
import React, { useEffect, useState } from 'react';
import { string } from 'prop-types';

import texts from '../../../texts';
import ICONS from '../../constants';
import { fetchUserByEmail, fetchUserGoalsByUsername } from '../../../requests';

import UserStack from './layout';

export default function UserStackContainer({ email }) {
  // Token es una promise, hay que ejecutarla en algun momento
  // Cargar aca el usuario en initial state y ejecutar la token promise
  // Para tener el token de validacion para hacer requests
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    const response = await fetchUserByEmail(email);
    const json = await response.json();
    const goals = await fetchUserGoalsByUsername(json.message.username);
    const goalsJson = await goals.json();

    const initialState = {
      user: json.message,
      athleteScreen: true,
      plansData: [],
      userGoals: goalsJson.message
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
      case 'changeCurrentStack':
        return {
          ...state,
          athleteScreen: action.newScreen
        };
      case 'addPlansData':
        return {
          ...state,
          plansData: action.plansData
        };
      case 'addNewGoal':
        return {
          ...state,
          userGoals: action.newGoal
        };
      default:
        return state;
    }
  };

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
      data={data}
      loading={loading}
      reducer={reducer}
      tabBarIconsAthlete={tabBarIconsAthlete}
      tabBarIconsTrainer={tabBarIconsTrainer}
    />
  );
}

UserStackContainer.propTypes = {
  email: string.isRequired
  // token: object.isRequired
};
