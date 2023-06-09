import React from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerToggleButton
} from '@react-navigation/drawer';
import { object } from 'prop-types';

import Feed from '../../../../../../../screens/Feed';
import FollowersScreen from '../../../../../../../screens/FollowersScreen';
import MessagingScreen from '../../../../../../../screens/Messaging';
import texts from '../../../../../../../texts';
import { colors } from '../../../../../../../colors';

function CustomDrawerContent({ props }) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

function CustomDrawerToggleButton() {
  return <DrawerToggleButton tintColor={colors.white} />;
}
export default function FeedStack() {
  const Drawer = createDrawerNavigator();
  const CDC = React.useCallback((props) => <CustomDrawerContent props={{ ...props }} />, []);
  return (
    <Drawer.Navigator
      useLegacyImplementation
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: colors.header,
          elevation: 0,
          shadowOpacity: 0
        },
        headerTitleStyle: { color: colors.white },
        headerLeft: CustomDrawerToggleButton
      }}
      drawerContent={(props) => CDC(props)}
    >
      <Drawer.Screen name={texts.Feed.name} component={Feed} options={{ title: 'Feed', headerShown: true }} />

      <Drawer.Screen
        name={texts.FollowersScreen.name}
        component={FollowersScreen}
        options={{ title: 'Seguidores', headerShown: true }}
      />
      <Drawer.Screen
        name={texts.MessagingScreen.name}
        component={MessagingScreen}
        options={{ title: 'Mensajes', headerShown: true }}
      />
    </Drawer.Navigator>
  );
}

CustomDrawerContent.propTypes = {
  props: object
};
