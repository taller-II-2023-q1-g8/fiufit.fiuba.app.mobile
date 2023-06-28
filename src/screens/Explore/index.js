import { func, shape } from 'prop-types';
import { useFocusEffect } from '@react-navigation/native';
import React, { useState } from 'react';

import { fetchPlans, fetchTrainersID, fetchUsersByUsername } from '../../requests';
import { processFetchedPlans } from '../../utils';
import { useStateValue } from '../../state';
import texts from '../../texts';

import { getDistanceFromLatLonInKm, getFilters } from './utils';
import { hasSelectedFilters } from './filtering';
import Explore from './layout';

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
    navigation.navigate(texts.SearchedTrainingPlan.name, { plan });
  };
  // Users
  const [usernames, setUsernames] = useState([]);
  const [filteredUsernames, setFilteredUsernames] = useState([]);
  const [filterUsers, setFilterUsers] = useState({
    name: '',
    rol: 'Any',
    distance: null
  });
  const [state] = useStateValue();

  const handleOnUsernameChange = (newUsernameQuery) => {
    const aux = { ...filterUsers, name: newUsernameQuery };
    setFilterUsers(aux);
    console.log(aux);
    if (aux.rol === 'Any') {
      setFilteredUsernames(
        usernames.filter(
          (user) =>
            user.username !== state.user.username &&
            user.username.toLowerCase().includes(newUsernameQuery.toLowerCase())
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

  const handleOnDistanceChange = (newDistance) => {
    if (state.userLocation !== undefined) {
      // Permitio que trackeemos su location
      const l1 = state.userLocation.latitude;
      const l2 = state.userLocation.longitude;
      // Distancia para probar
      const l3 = 0;
      const l4 = 0;
      console.log('Distancia: ', getDistanceFromLatLonInKm(l1, l2, l3, l4));
    } else {
      console.log('Primero tenes que habilitar el tracking');
    }
  };
  const handleOnRoleChange = (name, newUserRole) => {
    console.log(newUserRole);
    const aux = { ...filterUsers, rol: newUserRole };
    setFilterUsers(aux);
    console.log(aux);
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

  useFocusEffect(
    React.useCallback(() => {
      async function fetchData() {
        const response = await fetchPlans('');
        const plans1 = await response.json();
        await processFetchedPlans(plans1);
        setPlans(plans1);
        setFilteredPlans(plans1);
        const usersResponse = await fetchUsersByUsername('');
        const usersJson = await usersResponse.json();
        const trainersResponse = await fetchTrainersID();
        const trainersJson = await trainersResponse.json();
        // Get de usuarios no traiga admins
        const users = usersJson.message
          .filter((username) => username !== state.user.username)
          .map((username) => ({
            username,
            role: trainersJson.find((trainer) => trainer.external_id === username) ? 'Trainer' : 'Athlete'
          }));
        setUsernames(users);
        setFilteredUsernames(users);
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
  );
}

ExploreScreen.propTypes = {
  navigation: shape({
    navigate: func.isRequired
  }).isRequired
};
