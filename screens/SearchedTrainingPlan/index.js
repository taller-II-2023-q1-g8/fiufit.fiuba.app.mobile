import { shape } from 'prop-types';
import React, { useEffect, useState } from 'react';

import { fetchTrainingPlanByTitle } from '../../requests';

import SearchedTrainingPlan from './layout';

export default function SearchedTrainingPlanContainer({ route }) {
  const [data, setData] = useState([]);
  const { title } = route.params;

  useEffect(() => {
    async function fetchData() {
      // const response = await fetchTrainingPlanByTitle(username);
      // const json = await response.json();
      // setData(json.message);
      const planData = {
        title: 'Duro como final de AM3',
        trainer: 'Marco Aurelio',
        difficulty: 'HARD',
        description: 'Hacé que el volumen de tus brazos no se pueda calcular ni con variable compleja.',
        created_at: '2021-04-04',
        updated_at: '2021-04-04',
        exercises: [
          {
            title: 'Curl de Biceps',
            muscle: 'Biceps'
          },
          {
            title: 'Curl en Banco Scott',
            muscle: 'Biceps'
          },
          {
            title: 'Tirón de Triceps con Cable',
            muscle: 'Triceps'
          },
          {
            title: 'Remo con Barra',
            muscle: 'Espalda'
          },
          {
            title: 'Banco de Pecho Plano',
            muscle: 'Pectorales'
          }
        ]
      };
      setData(planData);
    }
    fetchData();
  }, []);

  return <SearchedTrainingPlan data={data} />;
}

SearchedTrainingPlanContainer.propTypes = {
  route: shape({
    params: shape.isRequired
  }).isRequired
};
