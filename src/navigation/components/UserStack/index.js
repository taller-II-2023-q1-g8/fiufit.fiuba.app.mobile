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
  return <UserStack loading={loading} />;
}
