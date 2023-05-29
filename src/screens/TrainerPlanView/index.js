import React, { useEffect, useState } from 'react';
import { func, shape } from 'prop-types';

import texts from '../../texts';

import TrainerPlanView from './layout';

export default function TrainerPlanViewContainer({ route, navigation }) {
  const [data, setData] = useState(route.params.itemData);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchData() {
      setLoading(false);
    }
    fetchData();
  }, []);
  const handleAthletePress = (athlete) => {
    const { username } = athlete;
    navigation.navigate(texts.SearchedProfile.name, { username });
  };

  const handleAddExecrsiePress = () => {
    const planID = data.id;
    navigation.navigate(texts.ChooseExercises.name, { planID });
  };

  return (
    <TrainerPlanView
      data={data}
      loading={loading}
      handleAthletePress={handleAthletePress}
      handleAddExecrsiePress={handleAddExecrsiePress}
    />
  );
}

TrainerPlanViewContainer.propTypes = {
  route: shape({
    params: shape.isRequired
  }).isRequired,
  navigation: shape({
    navigate: func.isRequired
  }).isRequired
};
