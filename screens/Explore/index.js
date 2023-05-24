import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { func, shape } from 'prop-types';
import { useFocusEffect } from '@react-navigation/native';

import { fetchPlans, fetchTrainersID, fetchUsersByUsername } from '../../requests';
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
  const [usersActive, setUsersActive] = useState(true);
  const [usersStyle, setUsersStyle] = useState(styles.viewSwitchActive);
  const [plansStyle, setPlansStyle] = useState(styles.viewSwitchInactive);
  const [filteredPlans, setFilteredPlans] = useState([]);
  const [usernames, setUsernames] = useState([]);
  const [filteredUsernames, setFilteredUsernames] = useState([]);
  const [state] = useStateValue();
  const [plansQuery, setPlansQuery] = useState({
    title: '',
    difficulty: 'ANY',
    tag: 'ANY'
  });

  useFocusEffect(
    React.useCallback(() => {
      async function fetchData() {
        fetchPlans('')
          .then((response) => response.json())
          .then((fetchedPlans) => {
            setPlans(fetchedPlans);
            setFilteredPlans(fetchedPlans);
          });
        const usersResponse = await fetchUsersByUsername('');
        const usersJson = await usersResponse.json();
        const trainersResponse = await fetchTrainersID();
        const trainersJson = await trainersResponse.json();
        console.log(trainersJson);
        // Get de usuarios no traiga admins
        const users = usersJson.message
          .filter((username) => username !== state.user.username)
          .map((username) => ({
            username,
            role: trainersJson.find((trainer) => trainer.external_id === username) ? 'Trainer' : 'Athlete'
          }));
        console.log(users);
        setUsernames(users);
        setFilteredUsernames(users);
      }
      fetchData();
      return () => {
        console.log('Screen was unfocused');
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, [])
  );

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

  const handleOnUsernameChange = (newUsernameQuery) => {
    setFilteredUsernames(
      usernames.filter(
        (user) =>
          user.username !== state.user.username &&
          user.username.toLowerCase().includes(newUsernameQuery.toLowerCase())
      )
    );
  };

  const handleOnRoleChange = (newUserRole) => {
    if (newUserRole === 'Any') {
      setFilteredUsernames(usernames);
    } else {
      setFilteredUsernames(usernames.filter((user) => user.role === newUserRole));
    }
  };
  // View Switching

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
  const [refreshingUsers, setRefreshingUsers] = useState(false);
  const onRefreshUsers = React.useCallback(async () => {
    setRefreshingUsers(true);
    await fetchUsersByUsername('')
      .then((response) => response.json())
      .then((fetchedUsernames) => {
        setUsernames(fetchedUsernames.message);
        setFilteredUsernames(fetchedUsernames.message);
      });
    setRefreshingUsers(false);
  }, []);
  const [refreshingPlans, setRefreshingPlans] = useState(false);
  const onRefreshPlans = React.useCallback(async () => {
    setRefreshingPlans(true);
    await fetchPlans('')
      .then((response) => response.json())
      .then((fetchedPlans) => {
        setPlans(fetchedPlans);
        setFilteredPlans(fetchedPlans);
      });
    setRefreshingPlans(false);
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
      <View style={styles.separator} />
      {!isEmpty(plans) && !usersActive && (
        <SearchTrainingPlans
          handleItemPress={handleItemPress}
          data={filteredPlans}
          handleOnTitleChange={handleOnTitleChange}
          handleOnDifficultyChange={handleOnDifficultyChange}
          handleOnTrainingTypeChange={handleOnTrainingTypeChange}
          refreshing={refreshingPlans}
          onRefresh={onRefreshPlans}
        />
      )}
      {usersActive && (
        <SearchUsers
          handleItemPress={nothing}
          data={filteredUsernames}
          handleOnSearchChange={handleOnUsernameChange}
          handleOnRoleChange={handleOnRoleChange}
          refreshing={refreshingUsers}
          onRefresh={onRefreshUsers}
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
