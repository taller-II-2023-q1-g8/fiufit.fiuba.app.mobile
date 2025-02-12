import { func, shape } from 'prop-types';
import { useFocusEffect } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';

import {
  fetchAllUsers,
  fetchCompletedPlanMetricsByUsername,
  fetchFollowedUsersByUsername,
  fetchFollowerUsersByUsername,
  fetchPlans,
  fetchPlansByTrainerID,
  fetchTrainersID,
  fetchUserProfileByUsername,
  fetchUsersByUsername
} from '../../requests';
import { processFetchedPlans } from '../../utils';
import { useStateValue } from '../../state';
import texts from '../../texts';

import { getDistanceFromLatLonInKm, getFilters } from './utils';
import { hasSelectedFilters } from './filtering';
import Explore from './layout';
import ErrorView from '../ErrorScreen';

export default function ExploreScreen({ navigation }) {
  const [plans, setPlans] = useState([]);
  const [filteredPlans, setFilteredPlans] = useState([]);
  const [plansQuery, setPlansQuery] = useState({
    difficulty: 'ANY',
    tag: 'ANY',
    title: ''
  });
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'Usuarios' },
    { key: 'second', title: 'Entrenamientos' }
  ]);
  const [err, setErr] = useState(false);

  const filterData = (searchQuery) => plans.filter((plan) => hasSelectedFilters(searchQuery, plan));

  const handleOnTitleChange = (newTitleSearch) => {
    const newQuery = { ...plansQuery, title: newTitleSearch };
    setPlansQuery(newQuery);
    setFilteredPlans(filterData(newQuery));
  };

  const handleOnChange = (key, newDifficultySearch) => {
    const newQuery = { ...plansQuery, [key]: newDifficultySearch };
    setPlansQuery(newQuery);
    setFilteredPlans(filterData(newQuery));
  };

  const handleItemPress = (plan) => {
    if (plan.blocked === 'true') {
      Alert.alert(texts.BlockedPlan.alert);
    } else {
      navigation.navigate(texts.SearchedTrainingPlan.name, { plan });
    }
  };
  // Users
  const [usernames, setUsernames] = useState([]);
  const [filteredUsernames, setFilteredUsernames] = useState([]);
  const [filterUsers, setFilterUsers] = useState({
    name: '',
    rol: 'Any',
    distance: Number.MAX_VALUE
  });
  const [state] = useStateValue();

  const handleOnUsernameChange = (newUsernameQuery) => {
    const aux = { ...filterUsers, name: newUsernameQuery };
    setFilterUsers(aux);
    if (aux.rol === 'Any') {
      setFilteredUsernames(
        usernames.filter(
          (user) =>
            user.username !== state.user.username &&
            user.username.toLowerCase().includes(newUsernameQuery.toLowerCase())
        )
      );
    } else if (aux.rol === 'Trainer') {
      const l1 = state.userLocation.latitude;
      const l2 = state.userLocation.longitude;
      setFilteredUsernames(
        usernames.filter(
          (user) =>
            user.username !== state.user.username &&
            user.username.toLowerCase().includes(newUsernameQuery.toLowerCase()) &&
            user.role === aux.rol &&
            getDistanceFromLatLonInKm(l1, l2, user.latitude, user.longitude) < aux.distance
        )
      );
    } else {
      setFilteredUsernames(
        usernames.filter(
          (user) =>
            user.username !== state.user.username &&
            user.username.toLowerCase().includes(newUsernameQuery.toLowerCase()) &&
            user.role === aux.rol
        )
      );
    }
  };

  const handleOnDistanceChange = (name, newDistance) => {
    if (state.userLocation !== undefined) {
      let distance = newDistance;
      if (newDistance === '') {
        distance = Number.MAX_VALUE;
      }
      const aux = { ...filterUsers, distance };
      setFilterUsers(aux);
      // Permitio que trackeemos su location
      const l1 = state.userLocation.latitude;
      const l2 = state.userLocation.longitude;
      const a = usernames.filter(
        (user) =>
          user.role === filterUsers.rol &&
          user.username !== state.user.username &&
          user.username.toLowerCase().includes(filterUsers.name.toLowerCase())
      );
      const b = a.filter(
        (user) => getDistanceFromLatLonInKm(l1, l2, user.latitude, user.longitude) < distance
      );
      setFilteredUsernames(b);
    } else {
      console.log('Primero tenes que habilitar el tracking');
    }
  };
  const handleOnRoleChange = (name, newUserRole) => {
    const aux = { ...filterUsers, rol: newUserRole };
    setFilterUsers(aux);
    if (newUserRole === 'Any') {
      setFilteredUsernames(
        usernames.filter(
          (user) =>
            user.username !== state.user.username &&
            user.username.toLowerCase().includes(aux.name.toLowerCase())
        )
      );
    } else {
      setFilteredUsernames(
        usernames.filter(
          (user) =>
            user.role === newUserRole &&
            user.username !== state.user.username &&
            user.username.toLowerCase().includes(aux.name.toLowerCase())
        )
      );
    }
  };

  const nothing = (username) => {
    navigation.navigate(texts.SearchedProfile.name, { username });
  };
  useEffect(() => {
    if (filterUsers) {
      if (filterUsers.rol === 'Any') {
        setFilteredUsernames(
          usernames.filter(
            (user) =>
              user.username !== state.user.username &&
              user.username.toLowerCase().includes(filterUsers.name.toLowerCase())
          )
        );
      } else if (filterUsers.rol === 'Trainer') {
        const l1 = state.userLocation.latitude;
        const l2 = state.userLocation.longitude;
        setFilteredUsernames(
          usernames.filter(
            (user) =>
              user.username !== state.user.username &&
              user.username.toLowerCase().includes(filterUsers.name.toLowerCase()) &&
              user.role === filterUsers.rol &&
              getDistanceFromLatLonInKm(l1, l2, user.latitude, user.longitude) < filterUsers.distance
          )
        );
      } else {
        setFilteredUsernames(
          usernames.filter(
            (user) =>
              user.username !== state.user.username &&
              user.username.toLowerCase().includes(filterUsers.name.toLowerCase()) &&
              user.role === filterUsers.rol
          )
        );
      }
    } else {
      setFilteredUsernames(usernames);
    }
  }, [usernames]);
  useFocusEffect(
    React.useCallback(() => {
      async function fetchData() {
        try {
          setErr(false);
          const response = await fetchPlans('');
          const plans1 = await response.json();
          await processFetchedPlans(plans1);
          setPlans(plans1);
          setFilteredPlans(plans1);
          const allUsers = await fetchAllUsers();
          const allUR = await allUsers.json();
          const trainersResponse = await fetchTrainersID();
          const trainersJson = await trainersResponse.json();
          console.log(trainersJson);
          const allU = allUR.message
            .filter((user) => user.username !== state.user.username)
            .map((user) => {
              const tr = trainersJson.find((trainer) => trainer.external_id === user.username);
              return {
                username: user.username,
                role: tr ? 'Trainer' : 'Athlete',
                latitude: user.latitude,
                longitude: user.longitude,
                verification: tr ? tr.verification.status : -1
              };
            });
          console.log(allU);
          setUsernames(allU);
        } catch (error) {
          console.log(error);
          setErr(true);
        }
      }
      fetchData();
      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, [])
  );

  const filters = getFilters(handleOnChange);
  return (
    <>
      <ErrorView err={err} />
      {!err && (
        <Explore
          setIndex={setIndex}
          index={index}
          routes={routes}
          dataPlans={filteredPlans}
          dataUsers={filteredUsernames}
          filterPlans={filters}
          filterUsers={filterUsers}
          handlePlanPress={handleItemPress}
          handleUserPress={nothing}
          handleOnPlanTitleChange={handleOnTitleChange}
          handleOnUserNameChange={handleOnUsernameChange}
          handleOnUserRoleChange={handleOnRoleChange}
          handleOnDistanceChange={handleOnDistanceChange}
        />
      )}
    </>
  );
}

ExploreScreen.propTypes = {
  navigation: shape({
    navigate: func.isRequired
  }).isRequired
};
