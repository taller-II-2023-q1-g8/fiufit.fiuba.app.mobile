import { shape, func } from 'prop-types';
import React, { useEffect, useState } from 'react';

import texts from '../../texts';
import { useStateValue } from '../../state';
import { fetchTrainingPlanByID, fetchAthletesID, addPlanToAthleteAsFavorite } from '../../requests';
import Loader from '../../components/Loader';

import SearchedTrainingPlan from './layout';

export default function SearchedTrainingPlanContainer({ route, navigation }) {
  const { plan } = route.params;
  const [state, dispatch] = useStateValue();
  const [ownAthleteInternalID, setOwnAthleteInternalID] = useState(null);
  const [trainerUsername, setTrainerUsername] = useState(null);

  const handleStartTraining = () => {
    addPlanToAthleteAsFavorite(plan.id, ownAthleteInternalID);
    navigation.navigate(texts.AthleteTrainingPlan.name, { plan });
  };

  useEffect(() => {
    async function fetchData() {
      let response = await fetchTrainingPlanByID(plan.id);
      let dataJson = await response.json();
      setTrainerUsername(dataJson.message.trainer.external_id);

      response = await fetchAthletesID();
      dataJson = await response.json();
      const myAthlete = await dataJson.find((athlete) => athlete.external_id === state.user.username);
      setOwnAthleteInternalID(myAthlete.id);
    }
    fetchData();
  }, []);

  return (
    <>
      {'title' in plan && (
        <SearchedTrainingPlan
          title={plan.title}
          description={plan.description}
          trainer={trainerUsername}
          difficulty={plan.difficulty}
          exercises={plan.exercises}
          handleStartTraining={handleStartTraining}
        />
      )}
      <Loader loading={!('title' in plan)} />
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
