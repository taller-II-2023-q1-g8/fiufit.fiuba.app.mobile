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
import { getPlanPicURL } from '../../utils';

import SearchedTrainingPlan from './layout';

export default function SearchedTrainingPlanContainer({ route, navigation }) {
  const { plan } = route.params;
  const [state, dispatch] = useStateValue();
  const [ownAthleteInternalID, setOwnAthleteInternalID] = useState(null);
  const [trainerUsername, setTrainerUsername] = useState(null);
  const [athleteRating, setAthleteRating] = useState(null);
  const [favorite, setFavorite] = useState(null);
  const [planPicUrl, setPlanPicUrl] = useState(null);

  const handleStartTraining = () => {
    navigation.navigate(texts.Exercise.name, { plan, athleteId: ownAthleteInternalID, athleteRating });
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
  const handleRateTraining = () => {
    navigation.navigate(texts.Rating.name, { plan, athleteId: ownAthleteInternalID, pop: 1, athleteRating });
  };
  useEffect(() => {
    async function fetchData() {
      let response = await fetchTrainingPlanByID(plan.id);
      let dataJson = await response.json();
      setTrainerUsername(dataJson.message.trainer.external_id);
      const rating = dataJson.message.athletes.find((athlete) => athlete.external_id === state.user.username);
      setAthleteRating(rating);
      console.log(rating);
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

  const [loading, setLoading] = useState(true);
  const fetchPlanPicUrl = async () => {
    const url = await getPlanPicURL(plan.id);
    setPlanPicUrl(url);
    setLoading(false);
  };

  useEffect(() => {
    fetchPlanPicUrl();
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
          handleRateTraining={handleRateTraining}
          planPicUrl={planPicUrl}
          loading={loading}
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
