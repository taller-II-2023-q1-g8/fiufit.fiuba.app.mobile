import { bool, object, func } from 'prop-types';
import React from 'react';
import { Text, View } from 'react-native';

import Loader from '../../../components/Loader';
import { StateProvider, useStateValue } from '../../../utils/state/state';

import AthleteStack from './athleteLayout';
import TrainerStack from './trainerLayout';

export default function UserStack({ loading, data, reducer, tabBarIconsAthlete, tabBarIconsTrainer }) {
  console.log(loading);
  return (
    <>
      <Loader loading={loading} />
      {!loading && (
        <StateProvider initialState={data} reducer={reducer}>
          <AuxStack tabBarIconsAthlete={tabBarIconsAthlete} tabBarIconsTrainer={tabBarIconsTrainer} />
        </StateProvider>
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
  data: object.isRequired,
  reducer: func.isRequired,
  tabBarIconsAthlete: func.isRequired,
  tabBarIconsTrainer: func.isRequired
};
