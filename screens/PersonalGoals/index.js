import React, { useEffect, useState } from 'react';

import { fetchUserGoalsByUsername } from '../../requests';
import { isEmpty } from '../../utils';
import Loader from '../../components/Loader';

import PersonalGoals from './layout';

export default function PersonalGoalsContainer() {
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetchUserGoalsByUsername('federico');
      const json = await response.json();
      setGoals(json.message);
    }
    fetchData();
  }, []);

  return (
    <>
      <Loader loading={isEmpty(goals)} />
      {!isEmpty(goals) && <PersonalGoals goals={goals} />}
    </>
  );
}
