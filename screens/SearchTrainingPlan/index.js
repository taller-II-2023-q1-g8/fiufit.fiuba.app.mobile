import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { func, shape } from 'prop-types';

import { fetchPlans } from '../../requests';
import { isEmpty } from '../../utils';
import Loader from '../../components/Loader';
import texts from '../../texts';

import { styles } from './styles';
import { hasSelectedFilters } from './filtering';
import SearchTrainingPlans from './layout';

export default function SearchPlansScreen({ navigation }) {
  // View Switching
  const [usersActive, setUsersActive] = useState(true);
  const [usersStyle, setUsersStyle] = useState(styles.viewSwitchActive);
  const [plansStyle, setPlansStyle] = useState(styles.viewSwitchInactive);

  const focusUsers = () => {
    setUsersActive(true);
    setUsersStyle(styles.viewSwitchActive);
    setPlansStyle(styles.viewSwitchInactive);
  };

  const focusPlans = () => {
    setUsersActive(false);
    setUsersStyle(styles.viewSwitchInactive);
    setPlansStyle(styles.viewSwitchActive);
  };

  // Training Plans
  const [plans, setPlans] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [query, setQuery] = useState({
    title: '',
    difficulty: 'ANY',
    tag: 'ANY'
  });

  useEffect(() => {
    async function fetchData() {
      fetchPlans('')
        .then((response) => response.json())
        .then((fetchedPlans) => {
          setPlans(fetchedPlans);
          setSearchResults(fetchedPlans);
        });
    }
    fetchData();
  }, []);

  const filterData = (searchQuery) => plans.filter((plan) => hasSelectedFilters(searchQuery, plan));

  const handleOnTitleChange = (newTitleSearch) => {
    const newQuery = { ...query, title: newTitleSearch };
    setQuery(newQuery);
    setSearchResults(filterData(newQuery));
  };

  const handleOnDifficultyChange = (newDifficultySearch) => {
    const newQuery = { ...query, difficulty: newDifficultySearch };
    setQuery(newQuery);
    setSearchResults(filterData(newQuery));
  };

  const handleOnTrainingTypeChange = (newTagSearch) => {
    const newQuery = { ...query, tag: newTagSearch };
    setQuery(newQuery);
    setSearchResults(filterData(newQuery));
  };

  const handleItemPress = (planID) => {
    navigation.navigate(texts.SearchedTrainingPlan.name, { planID });
  };

  // Users

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
          data={searchResults}
          handleOnTitleChange={handleOnTitleChange}
          handleOnDifficultyChange={handleOnDifficultyChange}
          handleOnTrainingTypeChange={handleOnTrainingTypeChange}
        />
      )}
    </>
  );
}

SearchPlansScreen.propTypes = {
  navigation: shape({
    navigate: func.isRequired
  }).isRequired
};
