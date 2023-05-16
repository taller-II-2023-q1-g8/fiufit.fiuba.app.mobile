import { shape, func } from 'prop-types';
import React, { useEffect, useState } from 'react';

import texts from '../../texts';
import { fetchTrainingPlanByID } from '../../requests';
import Loader from '../../components/Loader';

import SearchedTrainingPlan from './layout';

export default function SearchedTrainingPlanContainer({ route, navigation }) {
  const [data, setData] = useState([]);
  const { planID } = route.params;

  const handleStartTraining = () => navigation.navigate(texts.TrainingInProgress.name);

  useEffect(() => {
    async function fetchData() {
      const response = await fetchTrainingPlanByID(planID);
      const json = await response.json();
      setData(json.message);
    }
    fetchData();
  }, []);

  return (
    <>
      {'title' in data && (
        <SearchedTrainingPlan
          title={data.title}
          description={data.description}
          trainer={data.trainer.id}
          difficulty={data.difficulty}
          exercises={data.exercises}
          handleStartTraining={handleStartTraining}
        />
      )}
      <Loader loading={!('title' in data)} />
    </>
  );
}

SearchedTrainingPlanContainer.propTypes = {
  navigation: shape({
    navigate: func.isRequired
  }).isRequired,
  route: shape({
    params: shape.isRequired
  }).isRequired
};
