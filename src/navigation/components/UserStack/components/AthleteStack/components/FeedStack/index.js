import React from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { object } from 'prop-types';

import Feed from '../../../../../../../screens/Feed';
import FollowersScreen from '../../../../../../../screens/FollowersScreen';
import MessagingScreen from '../../../../../../../screens/Messaging';
import texts from '../../../../../../../texts';

function CustomDrawerContent({ props }) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}
export default function FeedStack() {
  const Drawer = createDrawerNavigator();
  const CDC = React.useCallback((props) => <CustomDrawerContent props={{ ...props }} />, []);
  return (
    <Drawer.Navigator useLegacyImplementation drawerContent={(props) => CDC(props)}>
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
