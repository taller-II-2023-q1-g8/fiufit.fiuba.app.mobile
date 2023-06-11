import React, { useEffect, useState } from 'react';
import { shape, func } from 'prop-types';

import AthleteTrainingPlan from './layout';

export default function AthleteTrainingPlanScreen({ route, navigation }) {
  const { plan } = route.params;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  const handle = (exercise) => {
    console.log(exercise);
  };

  return <AthleteTrainingPlan plan={plan} loading={loading} handle={handle} />;
}

AthleteTrainingPlanScreen.propTypes = {
  route: shape({
    params: shape.isRequired
  }).isRequired,
  navigation: shape({
    navigate: func.isRequired
  }).isRequired
};
