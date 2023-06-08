import { func, shape } from 'prop-types';
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, ImageBackground } from 'react-native';
import React, { useState } from 'react';

import { colors } from '../../colors';
import { fetchPlans, fetchTrainersID, fetchUsersByUsername } from '../../requests';
import { isEmpty } from '../../utils';
import { useStateValue } from '../../state';
import BackgroundImage from '../../assets/Background.jpg';
import Loader from '../../components/Loader';
import texts from '../../texts';

import { getFilters } from './utils';
import { hasSelectedFilters } from './filtering';
import { styles } from './styles';
import SearchTrainingPlans from './search_plans_layout';
import SearchUsers from './search_users_layout';

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
        (user) =>
          user.username !== state.user.username &&
          user.username.toLowerCase().includes(newUsernameQuery.toLowerCase())
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

  const filters = getFilters(handleOnChange);

  return (
    <View style={{ backgroundColor: colors.header }}>
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
      <ImageBackground source={BackgroundImage}>
        {!isEmpty(plans) && !usersActive && (
          <SearchTrainingPlans
            filters={filters}
            handleItemPress={handleItemPress}
            data={filteredPlans}
            handleOnTitleChange={handleOnTitleChange}
            refreshing={refreshingPlans}
            onRefresh={onRefreshPlans}
          />
        )}
        {usersActive && (
          <SearchUsers
            handleItemPress={nothing}
            data={filteredUsernames}
            handleOnSearchChange={handleOnUsernameChange}
            refreshing={refreshingUsers}
            onRefresh={onRefreshUsers}
          />
        )}
      </ImageBackground>
    </View>
  );
}

ExploreScreen.propTypes = {
  navigation: shape({
    navigate: func.isRequired
  }).isRequired
};
