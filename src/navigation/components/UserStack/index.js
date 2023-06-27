import { string } from 'prop-types';
import React, { useEffect, useState } from 'react';
import * as Location from 'expo-location';

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

  useEffect(() => {
    const config = async () => {
      const resf = await Location.requestForegroundPermissionsAsync();
      if (resf.status !== 'granted') {
        console.log('Permission to access location was denied');
      } else {
        console.log('Permission to access location granted');
      }
    };

    config();
  }, []);
  const setLocation = async () => {
    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.BestForNavigation
    });
    /* Tue Jun 27 15:17:12 2023: -34.5384222,-58.4816437 */
    // Luego de fetchear hacer un post a la bdd con username = state.user.username
    console.log(location.coords.latitude, location.coords.longitude);
  };

  useEffect(() => {
    setLocation();
    const dataInterval = setInterval(() => setLocation(), 120 * 1000);
    return () => clearInterval(dataInterval);
  }, []);
  return <UserStack loading={loading} />;
}

UserStackContainer.propTypes = {
  email: string
};
