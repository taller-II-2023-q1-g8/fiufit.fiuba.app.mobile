import { bool, func } from 'prop-types';
import React from 'react';

import Loader from '../../../components/Loader';

import AthleteStack from './components/AthleteStack';
import TrainerStack from './components/TrainerStack';

export default function UserStack({ loading, tabBarIconsAthlete, tabBarIconsTrainer }) {
  return (
    <>
      <Loader loading={loading} />
      {!loading && (
        <AuxStack tabBarIconsAthlete={tabBarIconsAthlete} tabBarIconsTrainer={tabBarIconsTrainer} />
      )}
    </>
  );
}

function AuxStack({ tabBarIconsAthlete, tabBarIconsTrainer }) {
  return (
    <>
      <AthleteStack tabBarIcons={tabBarIconsAthlete} />
      <TrainerStack tabBarIcons={tabBarIconsTrainer} />
    </>
  );
}
AuxStack.propTypes = {
  tabBarIconsAthlete: func.isRequired,
  tabBarIconsTrainer: func.isRequired
};
UserStack.propTypes = {
  loading: bool.isRequired,
  tabBarIconsAthlete: func.isRequired,
  tabBarIconsTrainer: func.isRequired
};
