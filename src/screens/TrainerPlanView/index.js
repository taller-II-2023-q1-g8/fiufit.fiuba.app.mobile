import React, { useEffect, useState } from 'react';

import TrainerPlanView from './layout';

export default function TrainerPlanViewContainer(itemDataObject) {
  const [data, setData] = useState(itemDataObject.route.params.itemData);
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

// TrainerPlanViewContainer.propTypes = {
//   route: shape({
//     params: shape.isRequired
//   }).isRequired
// };
