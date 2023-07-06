import { string } from 'prop-types';
import React, { useEffect, useState } from 'react';
import * as Location from 'expo-location';

import {
  fetchFollowedUsersByUsername,
  fetchUserByEmail,
  fetchUserGoalsByUsername,
  updateLastLoginTime,
  updateUserLocation
} from '../../../requests';
import { useStateValue } from '../../../state';

import UserStack from './layout';

export default function UserStackContainer({ email }) {
  const [loading, setLoading] = useState(true);
  const [locationGranted, setLocationGranted] = useState(false);
  const [, dispatch] = useStateValue();

  const fetchUser = async () => {
    const userResponse = await fetchUserByEmail(email);
    const userJson = await userResponse.json();
    updateLastLoginTime(userJson.message.username);
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

  const setLocation = async () => {
    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.BestForNavigation
    });
    /* Tue Jun 27 15:17:12 2023: -34.5384222,-58.4816437 */
    dispatch({
      type: 'updateLocation',
      newLocation: { latitude: location.coords.latitude, longitude: location.coords.longitude }
    });
    const userResponse = await fetchUserByEmail(email);
    const userJson = await userResponse.json();
    // Luego de fetchear hacer un post a la bdd con username = state.user.username
    const user = {
      username: userJson.message.username,
      latitude: location.coords.latitude,
      longitude: location.coords.longitude
    };
    const a = await updateUserLocation(user);
    console.log(location.coords.latitude, location.coords.longitude);
  };

  useEffect(() => {
    const config = async () => {
      const resf = await Location.requestForegroundPermissionsAsync();
      if (resf.status !== 'granted') {
        console.log('Permission to access location was denied');
        setLocationGranted(false);
      } else {
        console.log('Permission to access location granted');
        setLocationGranted(true);
      }
    };
    config();
  }, []);
  useEffect(() => {
    if (locationGranted) {
      setLocation();
      const dataInterval = setInterval(() => setLocation(), 120 * 1000);
      return () => clearInterval(dataInterval);
    }
  }, [locationGranted]);
  return <UserStack loading={loading} />;
}

UserStackContainer.propTypes = {
  email: string
};
