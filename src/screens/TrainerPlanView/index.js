import React, { useEffect, useState } from 'react';
import { func, shape } from 'prop-types';

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
    console.log(athlete);
  };

  return <TrainerPlanView data={data} loading={loading} handleAthletePress={handleAthletePress} />;
}

TrainerPlanViewContainer.propTypes = {
  route: shape({
    params: shape.isRequired
  }).isRequired,
  navigation: shape({
    navigate: func.isRequired
  }).isRequired
};
