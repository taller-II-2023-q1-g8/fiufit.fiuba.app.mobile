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
  const handleCalificationPress = (planTitle) => {
    console.log(planTitle);
  };

  return <TrainerPlanView data={data} loading={loading} handleCalificationPress={handleCalificationPress} />;
}

// TrainerPlanViewContainer.propTypes = {
//   route: shape({
//     params: shape.isRequired
//   }).isRequired
// };
