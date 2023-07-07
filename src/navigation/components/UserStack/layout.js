import { bool } from 'prop-types';
import React from 'react';

import Loader from '../../../components/Loader';
import ErrorView from '../../../screens/ErrorScreen';

import AthleteStack from './components/AthleteStack';
import TrainerStack from './components/TrainerStack';

export default function UserStack({ loading, err }) {
  return (
    <>
      <Loader loading={loading} />
      <ErrorView err={err} />
      {!loading && !err && <AuxStack />}
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
  loading: bool,
  err: bool
};
