import React, { useEffect, useState } from 'react';
import { func, shape } from 'prop-types';

import { fetchPlans } from '../../requests';
import { isEmpty } from '../../utils';
import Loader from '../../components/Loader';
import texts from '../../texts';

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
      setSearchResults(json.map((plan) => plan));
    }
    fetchData();
  }, []);

  const hasSelectedDifficulty = (difficulty, plan) => difficulty === 'ANY' || difficulty === plan.difficulty;
  const hasSelectedTag = (tag, plan) => tag === 'ANY' || plan.tags.includes(tag);

  const hasSelectedFilters = (plan, name, difficulty, tag) =>
    plan.title.includes(name) && hasSelectedDifficulty(difficulty, plan) && hasSelectedTag(tag, plan);

  const filterByName = (plan, name) => hasSelectedFilters(plan, name, difficultySearch, trainingTagSearch);

  const filterByDifficulty = (plan, difficulty) =>
    hasSelectedFilters(plan, titleSearch, difficulty, trainingTagSearch);

  const filterByTrainingTag = (plan, trainingTag) =>
    hasSelectedFilters(plan, titleSearch, difficultySearch, trainingTag);

  const filterData = (filterToApllied, filterToUse = () => {}) =>
    data.filter((plan) => filterToUse(plan, filterToApllied)).map((plan) => plan.title);

  const handleOnTitleChange = (titleToSearch) => {
    setTitleSearch(titleToSearch);
    setSearchResults(filterData(titleToSearch, filterByName));
  };

  const handleOnDifficultyChange = (difficultyToSearch) => {
    setDifficultySearch(difficultyToSearch);
    setSearchResults(filterData(difficultyToSearch, filterByDifficulty));
  };

  const handleOnTrainingTypeChange = (trainingTagToSearch) => {
    setTrainingTagSearch(trainingTagToSearch);
    setSearchResults(filterData(trainingTagToSearch, filterByTrainingTag));
  };

  const handleItemPress = (planID) => {
    navigation.navigate(texts.SearchedTrainingPlan.name, { planID });
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
