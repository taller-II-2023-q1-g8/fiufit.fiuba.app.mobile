import React, { useEffect, useState } from 'react';

import { fetchUserGoalsByUsername } from '../../requests';
import { isEmpty } from '../../utils';
import { useStateValue } from '../../utils/state/state';
import Loader from '../../components/Loader';

import PersonalGoals from './layout';

export default function PersonalGoalsContainer() {
  const [goals, setGoals] = useState([]);
  const [state, dispatch] = useStateValue();

  useEffect(() => {
    async function fetchData() {
      const response = await fetchUserGoalsByUsername(state.user.username);
      const json = await response.json();
      setGoals(json.message);
    }
    fetchData();
  }, []);

  return (
    <>
      {/* <Loader loading={isEmpty(goals)} /> */}
      {/* {!isEmpty(goals) && <PersonalGoals goals={goals} username={state.user.username} />} */}
      <PersonalGoals goals={goals} />
    </>
  );
}
