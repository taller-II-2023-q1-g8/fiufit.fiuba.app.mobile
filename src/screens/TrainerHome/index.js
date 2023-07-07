import React, { useEffect, useState } from 'react';
import { func, shape } from 'prop-types';
import { Alert } from 'react-native';

import { useStateValue } from '../../state';
import texts from '../../texts';
import { fetchPlansByTrainerUsername, fetchUserProfileByUsername } from '../../requests';
import { processFetchedPlans } from '../../utils';

import TrainerHome from './layout';
import ErrorView from '../ErrorScreen';

export default function TrainerHomeScreen({ navigation }) {
  const [state, dispatch] = useStateValue();
  const [data, setData] = useState(state.plansData); // initialState = state.dataPlans?
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(false);

  async function fetchData() {
    try {
      const response = await fetchPlansByTrainerUsername(state.user.username);
      const plans = await response.json();

      await processFetchedPlans(plans);
      setLoading(false);
      dispatch({
        type: 'updatePlansData',
        plansData: plans
      });
    } catch (error) {
      console.log(error);
      setErr(true);
    }
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
    if (itemData.blocked === 'true') {
      Alert.alert(texts.BlockedPlan.alert);
    } else {
      navigation.navigate(texts.TrainerPlanView.name, { itemData });
    }
  };
  const handleTrainerHome = () => {
    dispatch({
      type: 'changeCurrentStack',
      athleteScreen: true
    });
  };
  return (
    <>
      <ErrorView err={err} />
      {!err && (
        <TrainerHome
          username={state.user.username}
          handleTrainerHome={handleTrainerHome}
          data={data}
          handleItemPress={handleItemPress}
          loading={loading}
        />
      )}
    </>
  );
}
TrainerHomeScreen.propTypes = {
  navigation: shape({
    navigate: func.isRequired
  }).isRequired
};
