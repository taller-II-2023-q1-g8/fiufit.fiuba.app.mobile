import React, { useEffect, useState } from 'react';
import { func, shape } from 'prop-types';

import { fetchUserGoalsByUsername } from '../../requests';
import { useStateValue } from '../../utils/state/state';
import texts from '../../texts';

import PersonalGoals from './layout';

export default function PersonalGoalsContainer({ navigation }) {
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

  const handleAddGoal = () => navigation.navigate(texts.CreateGoal.name);

  return (
    <>
      {/* <Loader loading={isEmpty(goals)} /> */}
      {/* {!isEmpty(goals) && <PersonalGoals goals={goals} username={state.user.username} />} */}
      <PersonalGoals goals={goals} handleAddGoal={handleAddGoal} />
    </>
  );
}

PersonalGoalsContainer.propTypes = {
  navigation: shape({
    navigate: func.isRequired
  }).isRequired
};
