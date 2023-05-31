import React from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem
} from '@react-navigation/drawer';
import { func, shape, object } from 'prop-types';
import { Text } from 'react-native';

import Feed from '../../../../../../../screens/Feed';
import texts from '../../../../../../../texts';
import { useStateValue } from '../../../../../../../state';
import FollowersScreen from '../../../../../../../screens/FollowersScreen';

function CustomDrawerContent({ props }) {
  const [state] = useStateValue();
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}
export default function FeedStack({ navigation }) {
  const Drawer = createDrawerNavigator();
  const CDC = React.useCallback((props) => <CustomDrawerContent props={{ ...props }} />, []);
  return (
    <Drawer.Navigator useLegacyImplementation drawerContent={(props) => CDC(props)}>
      <Drawer.Screen
        name={texts.Feed.name}
        component={Feed}
        options={{ title: 'Feed', headerShown: false }}
      />

      <Drawer.Screen
        name={texts.FollowersScreen.name}
        component={FollowersScreen}
        options={{ title: 'Seguidores', headerShown: false }}
      />
    </Drawer.Navigator>
  );
}

FeedStack.propTypes = {
  navigation: shape({
    navigate: func.isRequired
  }).isRequired
};

CustomDrawerContent.propTypes = {
  props: object
};
