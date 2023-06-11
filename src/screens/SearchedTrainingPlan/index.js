import { shape, func } from 'prop-types';
import React, { useEffect, useState } from 'react';

import texts from '../../texts';
import { useStateValue } from '../../state';
import { fetchTrainingPlanByID, fetchAthletesID, addPlanToAthleteAsFavorite } from '../../requests';
import Loader from '../../components/Loader';

import SearchedTrainingPlan from './layout';

export default function SearchedTrainingPlanContainer({ route, navigation }) {
  const [data, setData] = useState([]);
  const [state, dispatch] = useStateValue();
  const [ownAthleteInternalID, setOwnAthleteInternalID] = useState(null);
  const { planID } = route.params;

  const handleStartTraining = () => {
    addPlanToAthleteAsFavorite(planID, ownAthleteInternalID);
    navigation.navigate(texts.AthleteTrainingPlan.name);
  };

  useEffect(() => {
    async function fetchData() {
      let response = await fetchTrainingPlanByID(planID);
      let dataJson = await response.json();
      dataJson.message.trainer_ext_id = dataJson.message.trainer.external_id;
      setData(dataJson.message);

      response = await fetchAthletesID();
      dataJson = await response.json();
      console.log(dataJson);
      setOwnAthleteInternalID(dataJson.find((athlete) => athlete.external_id === state.user.username).id);
    }
    fetchData();
  }, []);

  return (
    <>
      {'title' in data && (
        <SearchedTrainingPlan
          title={data.title}
          description={data.description}
          trainer={data.trainer_ext_id}
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
