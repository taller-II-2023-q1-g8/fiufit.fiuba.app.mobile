import { shape, func } from 'prop-types';
import React, { useEffect, useState } from 'react';

import texts from '../../texts';
import { useStateValue } from '../../state';
import {
  fetchTrainingPlanByID,
  fetchAthletesID,
  addPlanToAthleteAsFavorite,
  removePlanToAthleteAsFavorite
} from '../../requests';
import Loader from '../../components/Loader';

import SearchedTrainingPlan from './layout';

export default function SearchedTrainingPlanContainer({ route, navigation }) {
  const { plan } = route.params;
  const [state, dispatch] = useStateValue();
  const [ownAthleteInternalID, setOwnAthleteInternalID] = useState(null);
  const [trainerUsername, setTrainerUsername] = useState(null);
  const [favorite, setFavorite] = useState(null);

  const handleStartTraining = () => {
    navigation.navigate(texts.Exercise.name, { plan });
  };
  const handleFavorite = () => {
    // addPlanToAthleteAsFavorite(plan.id, ownAthleteInternalID);
    setFavorite(true);
    console.log('Faved');
  };
  const handleRemoveFavorite = () => {
    // removePlanToAthleteAsFavorite(plan.id, ownAthleteInternalID);
    setFavorite(false);
    console.log('Unfaved');
  };

  useEffect(() => {
    async function fetchData() {
      let response = await fetchTrainingPlanByID(plan.id);
      let dataJson = await response.json();
      setTrainerUsername(dataJson.message.trainer.external_id);
      dataJson.message.athletes.forEach((athlete) => console.log(athlete));
      console.log(dataJson);
      response = await fetchAthletesID();
      dataJson = await response.json();
      const myAthlete = await dataJson.find((athlete) => athlete.external_id === state.user.username);
      console.log(myAthlete);
      // Hacer get del endpoint?
      setFavorite(false);
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
          favorite={favorite}
          handleRemoveFavorite={handleRemoveFavorite}
          handleFavorite={handleFavorite}
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
