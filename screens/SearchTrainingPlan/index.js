import React, { useEffect, useState } from 'react';
import { func, shape } from 'prop-types';
import { Text } from 'react-native';

import Loader from '../../components/Loader';
import { isEmpty } from '../../utils';
import texts from '../../texts';
import { fetchPlans } from '../../requests';

import SearchTrainingPlans from './layout';

export default function SearchPlansScreen({ navigation }) {
  const [difficultySearch, setDifficultySearch] = useState('ANY');
  const [trainingTagSearch, setTrainingTagSearch] = useState('ANY');
  const [titleSearch, setTitleSearch] = useState('');
  const [data, setData] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetchPlans('');
      const json = await response.json();
      setData(json);
      setSearchResults(json.map((plan) => plan.title));
    }
    fetchData();
  }, []);

  const filterByDifficulty = (plan, difficulty) =>
    (difficulty === 'ANY' || difficulty === plan.difficulty) &&
    (trainingTagSearch === 'ANY' || plan.tags.includes(trainingTagSearch));

  const filterByTrainingTag = (plan, trainingTag) =>
    (difficultySearch === 'ANY' || difficultySearch === plan.difficulty) &&
    (trainingTag === 'ANY' || plan.tags.includes(trainingTag));

  const filterData = (titleToSearch, filterToApllied, filterToUse = () => {}) =>
    data
      .filter(
        (plan) =>
          plan.title.toLowerCase().includes(titleToSearch.toLowerCase()) && filterToUse(plan, filterToApllied)
      )
      .map((plan) => plan.title);

  const handleOnTitleChange = (titleToSearch) => {
    setTitleSearch(titleToSearch);
    setSearchResults(filterData(titleToSearch, difficultySearch));
  };

  const handleOnDifficultyChange = (difficultyToSearch) => {
    setDifficultySearch(difficultyToSearch);
    setSearchResults(filterData(titleSearch, difficultyToSearch, filterByDifficulty));
  };

  const handleOnTrainingTypeChange = (trainingTagToSearch) => {
    setTrainingTagSearch(trainingTagToSearch);
    setSearchResults(filterData(titleSearch, trainingTagToSearch, filterByTrainingTag));
  };

  const handleItemPress = (planTitle) => {
    navigation.navigate(texts.SearchedTrainingPlan.name, { planTitle });
  };

  return (
    <>
      <Loader loading={isEmpty(data)} />
      {!isEmpty(data) && (
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
