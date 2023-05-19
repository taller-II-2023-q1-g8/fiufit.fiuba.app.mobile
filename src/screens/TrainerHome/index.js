import React, { useEffect, useState } from 'react';
import { func, shape } from 'prop-types';

import { useStateValue } from '../../utils/state/state';
import texts from '../../texts';
import { fetchPlansByTrainerID, fetchTrainersID } from '../../requests';

import TrainerHome from './layout';

export default function TrainerHomeScreen({ navigation }) {
  const [state, dispatch] = useStateValue();
  const [data, setData] = useState(state.plansData); // initialState = state.dataPlans?
  const [loading, setLoading] = useState(true);
  console.log('A');
  useEffect(() => {
    async function fetchData() {
      // Deberiamos hacer un fetch de los training plans del trainer.
      const trainers = await fetchTrainersID();
      const trainersJson = await trainers.json();
      const id = trainersJson.find((trainer) => trainer.external_id === state.user.username);
      if (id === undefined) {
        setData([]);
        setLoading(false);
        return;
      }
      const idMessage = {
        trainer_id: id.id
      };
      const plans = await fetchPlansByTrainerID(idMessage);
      const plansJson = await plans.json();
      dispatch({
        type: 'addPlansData',
        plansData: plansJson
      });
      setData(plansJson);
      setLoading(false);
    }
    fetchData();
  }, []);
  const handleItemPress = (planTitle) => {
    navigation.navigate(texts.TrainerPlanView.name, { planTitle });
  };
  const handleTrainerHome = () => {
    dispatch({
      type: 'changeCurrentStack',
      newScreen: true
    });
  };
  return (
    <TrainerHome
      username={state.user.username}
      handleTrainerHome={handleTrainerHome}
      data={data}
      handleItemPress={handleItemPress}
      loading={loading}
    />
  );
}
TrainerHomeScreen.propTypes = {
  navigation: shape({
    navigate: func.isRequired
  }).isRequired
};
