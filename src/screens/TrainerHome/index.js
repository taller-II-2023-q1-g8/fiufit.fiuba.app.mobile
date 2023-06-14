import React, { useEffect, useState } from 'react';
import { func, shape } from 'prop-types';

import { useStateValue } from '../../state';
import texts from '../../texts';
import { fetchPlansByTrainerUsername } from '../../requests';
import { processFetchedPlans } from '../../utils';

import TrainerHome from './layout';

export default function TrainerHomeScreen({ navigation }) {
  const [state, dispatch] = useStateValue();
  const [data, setData] = useState(state.plansData); // initialState = state.dataPlans?
  const [loading, setLoading] = useState(true);

  async function fetchData() {
    const response = await fetchPlansByTrainerUsername(state.user.username);
    const plans = await response.json();

    await processFetchedPlans(plans);
    setLoading(false);
    dispatch({
      type: 'updatePlansData',
      plansData: plans
    });
    // setData(plans);
  }

  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    if (!loading) {
      const plans = state.plansData;
      setData(plans);
    }
  }, [state.plansData]);
  const handleItemPress = (itemData) => {
    navigation.navigate(texts.TrainerPlanView.name, { itemData });
  };
  const handleTrainerHome = () => {
    dispatch({
      type: 'changeCurrentStack',
      athleteScreen: true
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
