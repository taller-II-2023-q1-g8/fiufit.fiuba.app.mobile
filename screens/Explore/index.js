import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { func, shape } from 'prop-types';

import { fetchPlans, fetchUsersByUsername } from '../../requests';
import { isEmpty } from '../../utils';
import Loader from '../../components/Loader';
import texts from '../../texts';
import { useStateValue } from '../../utils/state/state';

import SearchUsers from './search_users_layout';
import { styles } from './styles';
import { hasSelectedFilters } from './filtering';
import SearchTrainingPlans from './search_plans_layout';

export default function ExploreScreen({ navigation }) {
  // Training Plans
  const [plans, setPlans] = useState([]);
  const [filteredPlans, setFilteredPlans] = useState([]);
  const [plansQuery, setPlansQuery] = useState({
    title: '',
    difficulty: 'ANY',
    tag: 'ANY'
  });

  const filterData = (searchQuery) => plans.filter((plan) => hasSelectedFilters(searchQuery, plan));

  const handleOnTitleChange = (newTitleSearch) => {
    const newQuery = { ...plansQuery, title: newTitleSearch };
    setPlansQuery(newQuery);
    setFilteredPlans(filterData(newQuery));
  };

  const handleOnDifficultyChange = (newDifficultySearch) => {
    const newQuery = { ...plansQuery, difficulty: newDifficultySearch };
    setPlansQuery(newQuery);
    setFilteredPlans(filterData(newQuery));
  };

  const handleOnTrainingTypeChange = (newTagSearch) => {
    const newQuery = { ...plansQuery, tag: newTagSearch };
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
  }, []);

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
      {!isEmpty(plans) && !usersActive && (
        <SearchTrainingPlans
          handleItemPress={handleItemPress}
          data={filteredPlans}
          handleOnTitleChange={handleOnTitleChange}
          handleOnDifficultyChange={handleOnDifficultyChange}
          handleOnTrainingTypeChange={handleOnTrainingTypeChange}
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
