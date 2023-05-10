import { bool, object, func } from 'prop-types';
import React from 'react';
import { Text, View } from 'react-native';

import Loader from '../../../components/Loader';
import { StateProvider, useStateValue } from '../../../utils/state/state';

import AthleteStack from './athleteLayout';
import TrainerStack from './trainerLayout';

export default function UserStack({ loading, data, reducer, tabBarIcons }) {
  console.log(loading);
  return (
    <>
      <Loader loading={loading} />
      {!loading && (
        <StateProvider initialState={data} reducer={reducer}>
          <AuxStack tabBarIcons={tabBarIcons} />
        </StateProvider>
      )}
    </>
  );
}

function AuxStack({ tabBarIcons }) {
  return (
    <>
      <AthleteStack tabBarIcons={tabBarIcons} />
      <TrainerStack tabBarIcons={tabBarIcons} />
    </>
  );
}
AuxStack.propTypes = {
  tabBarIcons: func.isRequired
};
UserStack.propTypes = {
  loading: bool.isRequired,
  data: object.isRequired,
  reducer: func.isRequired,
  tabBarIcons: func.isRequired
};
