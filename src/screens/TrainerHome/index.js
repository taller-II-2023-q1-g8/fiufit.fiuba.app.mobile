import React, { useEffect, useState } from 'react';
import { func, shape } from 'prop-types';

import { useStateValue } from '../../utils/state/state';
import texts from '../../texts';
import { fetchPlansByTrainerUsername } from '../../requests';

import TrainerHome from './layout';

export default function TrainerHomeScreen({ navigation }) {
  const [state, dispatch] = useStateValue();
  const [data, setData] = useState(state.plansData); // initialState = state.dataPlans?
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchData() {
      const response = await fetchPlansByTrainerUsername(state.user.username);
      const plans = await response.json();

      await plans.forEach((plan) => {
        const NO_CALIFICATION = 'No hay calificacion';

        plan.athletes.forEach((athlete) => {
          athlete.username = athlete.external_id;

          if (athlete.calification_score === -1) {
            athlete.calification_score = NO_CALIFICATION;
          }

          if (athlete.calification === '') {
            athlete.calification = NO_CALIFICATION;
          }
        });

        plan.likes = plan.athletes.map((athlete) => athlete.is_liked).reduce((res, a) => res + a, 0);
        const califications = plan.athletes
          .map((athlete) => athlete.calification_score)
          .filter((e) => e !== NO_CALIFICATION);

        if (califications.length > 0) {
          plan.average_calification = califications.reduce((res, a) => res + a, 0) / califications.length;
        } else {
          plan.average_calification = NO_CALIFICATION;
        }

        plan.athletes_that_favorited = plan.athletes;
      });

      dispatch({
        type: 'addPlansData',
        plansData: plans
      });
      setData(plans);
      setLoading(false);
    }
    fetchData();
  }, []);
  const handleItemPress = (itemData) => {
    navigation.navigate(texts.TrainerPlanView.name, { itemData });
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
