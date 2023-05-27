import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { func, shape } from 'prop-types';

import { fetchPlans, fetchUsersByUsername } from '../../requests';
import { isEmpty } from '../../utils';
import Loader from '../../components/Loader';
import texts from '../../texts';
import { useStateValue } from '../../state';

import SearchUsers from './search_users_layout';
import { styles } from './styles';
import { hasSelectedFilters } from './filtering';
import SearchTrainingPlans from './search_plans_layout';
import { getFilters } from './utils';

export default function ExploreScreen({ navigation }) {
  const [plans, setPlans] = useState([]);
  const [filteredPlans, setFilteredPlans] = useState([]);
  const [plansQuery, setPlansQuery] = useState({
    difficulty: 'ANY',
    tag: 'ANY',
    title: ''
  });

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

  const handleItemPress = (planID) => {
    navigation.navigate(texts.SearchedTrainingPlan.name, { planID });
  };

  // Users
  const [usernames, setUsernames] = useState([]);
  const [filteredUsernames, setFilteredUsernames] = useState([]);
  const [state] = useStateValue();

  const handleOnUsernameChange = (newUsernameQuery) => {
    setFilteredUsernames(
      usernames.filter(
        (username) =>
          username !== state.user.username && username.toLowerCase().includes(newUsernameQuery.toLowerCase())
      )
    );
  };

  // View Switching
  const [usersActive, setUsersActive] = useState(true);
  const [usersStyle, setUsersStyle] = useState(styles.viewSwitchActive);
  const [plansStyle, setPlansStyle] = useState(styles.viewSwitchInactive);

  const focusUsers = () => {
    setUsersActive(true);
    setFilteredPlans(plans);
    setUsersStyle(styles.viewSwitchActive);
    setPlansStyle(styles.viewSwitchInactive);
  };

  const focusPlans = () => {
    setUsersActive(false);
    setFilteredUsernames(usernames);
    setUsersStyle(styles.viewSwitchInactive);
    setPlansStyle(styles.viewSwitchActive);
  };

  const nothing = (username) => {
    navigation.navigate(texts.SearchedProfile.name, { username });
  };

  useEffect(() => {
    async function fetchData() {
      fetchPlans('')
        .then((response) => response.json())
        .then((fetchedPlans) => {
          setPlans(fetchedPlans);
          setFilteredPlans(fetchedPlans);
        });

      fetchUsersByUsername('')
        .then((response) => response.json())
        .then((fetchedUsernames) => {
          setUsernames(fetchedUsernames.message);
          setFilteredUsernames(fetchedUsernames.message);
        });
    }
    fetchData();
    /*
    const dataInterval = setInterval(() => console.log('Hola'), 5 * 1000);

    return () => clearInterval(dataInterval); */
  }, []);

  const filters = getFilters(handleOnChange);

  return (
    <>
      <Loader loading={isEmpty(plans)} />
      <View style={styles.usersOrPlansSwitchContainer}>
        <Text style={usersStyle} onPress={focusUsers}>
          Usuarios
        </Text>
        <Text style={plansStyle} onPress={focusPlans}>
          Planes
        </Text>
      </View>
      <View style={styles.separator} />
      {!isEmpty(plans) && !usersActive && (
        <SearchTrainingPlans
          filters={filters}
          handleItemPress={handleItemPress}
          data={filteredPlans}
          handleOnTitleChange={handleOnTitleChange}
        />
      )}
      {usersActive && (
        <SearchUsers
          handleItemPress={nothing}
          data={filteredUsernames}
          handleOnSearchChange={handleOnUsernameChange}
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
