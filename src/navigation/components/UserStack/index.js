import { string } from 'prop-types';
import React, { useEffect, useState } from 'react';

import { fetchFollowedUsersByUsername, fetchUserByEmail, fetchUserGoalsByUsername } from '../../../requests';
import { useStateValue } from '../../../state';

import UserStack from './layout';

export default function UserStackContainer({ email }) {
  // Token es una promise, hay que ejecutarla en algun momento
  // Cargar aca el usuario en initial state y ejecutar la token promise
  // Para tener el token de validacion para hacer requests
  const [loading, setLoading] = useState(true);
  const [, dispatch] = useStateValue();

  const fetchUser = async () => {
    const userResponse = await fetchUserByEmail(email);
    const userJson = await userResponse.json();
    const goalsResponse = await fetchUserGoalsByUsername(userJson.message.username);
    const goalsJson = await goalsResponse.json();
    const followed = await fetchFollowedUsersByUsername(userJson.message.username);
    const followedJson = await followed.json();

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

UserStackContainer.propTypes = {
  email: string
};
