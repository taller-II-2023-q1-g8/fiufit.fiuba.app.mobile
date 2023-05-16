import React, { useEffect, useState } from 'react';

import TrainerPlanView from './layout';

export default function TrainerPlanViewContainer() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  // console.log('ROUTE1:', route);
  useEffect(() => {
    async function fetchData() {
      // const response = await fetchTrainingPlanByTitle(username);
      // const json = await response.json();
      // setData(json.message);
      const planData = {
        title: 'Duro como final de AM3',
        difficulty: 'HARD',
        description: 'Hacé que el volumen de tus brazos no se pueda calcular ni con variable compleja.',
        created_at: '2021-04-04',
        updated_at: '2021-04-04',
        likes: '3',
        average_calification: '5.1',
        quality_califactions: [
          {
            username: 'Franco Papa',
            quality_cal: 'Great workout for the arms',
            calification: 7
          }
        ]
      };
      setData(planData);
      setLoading(false);
    }
    fetchData();
  }, []);
  const handleCalificationPress = (/* planTitle */) => {
    // console.log(planTitle);
  };

  return <TrainerPlanView data={data} loading={loading} handleCalificationPress={handleCalificationPress} />;
}

// TrainerPlanViewContainer.propTypes = {
//   route: shape({
//     params: shape.isRequired
//   }).isRequired
// };
