import { array, bool, func } from 'prop-types';
import React from 'react';

import Loader from '../../../components/Loader';
import CreatePlan from '../../../screens/AddPlan/layout';

import AthleteStack from './components/AthleteStack';
import TrainerStack from './components/TrainerStack';

export default function UserStack({ loading }) {
  return (
    <>
      <Loader loading={loading} />
      {!loading && <AuxStack />}
    </>
  );
}

function AuxStack() {
  return (
    <>
      <AthleteStack />
      <TrainerStack />
    </>
  );
}
UserStack.propTypes = {
  loading: bool
};
