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

  const tabBarIcons = (route, { focused, color, size }) => {
    let iconName;

    if (route.name === texts.Home.name) iconName = focused ? ICONS.HOME : ICONS.FOCUSED_HOME;
    else if (route.name === texts.SearchUsers.name) iconName = focused ? ICONS.LIST : ICONS.FOCUSED_LIST;
    else if (route.name === texts.Profile.name) iconName = focused ? ICONS.PERSON : ICONS.FOCUSED_PERSON;

    return <Ionicons name={iconName} size={size} color={color} />;
  };

  return <UserStack data={data} loading={loading} reducer={reducer} tabBarIcons={tabBarIcons} />;
}

UserStackContainer.propTypes = {
  email: string.isRequired,
  token: object.isRequired
};
