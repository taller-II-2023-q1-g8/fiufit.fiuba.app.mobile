import { bool, object, func } from 'prop-types';
import React from 'react';
import { Text, View } from 'react-native';

import Loader from '../../../components/Loader';
import { StateProvider, useStateValue } from '../../../utils/state/state';

import AthleteStack from './athleteLayout';

export default function UserStack({ loading, data, reducer, tabBarIcons }) {
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
  const [state, dispatch] = useStateValue();
  return state.athleteScreen ? (
    <AthleteStack tabBarIcons={tabBarIcons} />
  ) : (
    <View>
      <Text>Hola</Text>
    </View>
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
