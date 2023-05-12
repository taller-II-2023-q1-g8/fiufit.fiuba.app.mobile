import React, { useEffect, useState } from 'react';
import { func, shape } from 'prop-types';

import Loader from '../../components/Loader';
import { isEmpty } from '../../utils';
import texts from '../../texts';

import SearchTrainingPlans from './layout';

export default function SearchPlansScreen({ navigation }) {
  const [searchResults, setSearchResults] = useState([]);
  const [difficultySearch, setDifficultySearch] = useState('ANY');
  const [titleSearch, setTitleSearch] = useState('');
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      // const response = await fetchUsersByUsername('');
      // const json = await response.json();
      // setData(json.message);
      setData([
        { title: 'Plan de la Fiuba', difficulty: 'EASY' },
        { title: 'Road To Ingeniero', difficulty: 'MEDIUM' },
        { title: 'Duro como final de AM3', difficulty: 'HARD' },
        { title: 'Fuerte como el café del comedor', difficulty: 'MEDIUM' }
      ]);
    }
    fetchData();
  }, []);

  const filterByDifficulty = (plan, difficultyToSearch) =>
    difficultyToSearch === 'ANY' || plan.difficulty === difficultyToSearch;

  const filterData = (titleToSearch, difficultyToSearch) =>
    data
      .filter(
        (plan) =>
          plan.title.toLowerCase().includes(titleToSearch.toLowerCase()) &&
          filterByDifficulty(plan, difficultyToSearch)
      )
      .map((plan) => plan.title);

  const handleOnTitleChange = (titleToSearch) => {
    setTitleSearch(titleToSearch);
    setSearchResults(filterData(titleToSearch, difficultySearch));
  };

  const handleOnDifficultyChange = (difficultyToSearch) => {
    setDifficultySearch(difficultyToSearch);
    setSearchResults(filterData(titleSearch, difficultyToSearch));
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
