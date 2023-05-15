import React, { useEffect, useState } from 'react';
import { func, shape } from 'prop-types';

import Loader from '../../components/Loader';
import { isEmpty } from '../../utils';
import { fetchPlans } from '../../requests';
import texts from '../../texts';

import SearchTrainingPlans from './layout';

export default function SearchPlansScreen({ navigation }) {
  const [searchResults, setSearchResults] = useState([]);
  const [difficultySearch, setDifficultySearch] = useState('ANY');
  const [trainingTypeSearch, setTrainingTypeSearch] = useState('ANY');
  const [titleSearch, setTitleSearch] = useState('');
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetchPlans('');
      const json = await response.json();
      setData(json);
    }
    fetchData();
  }, []);

  const filterByDifficulty = (plan, difficulty) => difficulty === 'ANY' || plan.difficulty === difficulty;

  const filterByTrainingType = (plan, trainingType) =>
    trainingType === 'ANY' || plan.trainingType === trainingType;

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

  const handleOnTrainingTypeChange = (trainingTypeToSearch) => {
    setTrainingTypeSearch(trainingTypeToSearch);
    setSearchResults(filterData(titleSearch, trainingTypeToSearch, filterByTrainingType));
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
