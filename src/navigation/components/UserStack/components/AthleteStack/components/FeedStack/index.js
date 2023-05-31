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

function ItemCustom(name, handleItemPress) {
  return <DrawerItem label={name} onPress={() => handleItemPress(name)} />;
}
function CustomDrawerContent({ props, handleItemPress }) {
  const [state] = useStateValue();
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <Text> Seguidos </Text>
      {state.followedUsers.map((user) => ItemCustom(user, handleItemPress))}
    </DrawerContentScrollView>
  );
}
export default function FeedStack({ navigation }) {
  const Drawer = createDrawerNavigator();
  const nothing = (username) => {
    navigation.navigate(texts.SearchedProfile.name, { username });
  };
  const CDC = React.useCallback(
    (props, handleItemPress) => (
      <CustomDrawerContent props={{ ...props }} handleItemPress={handleItemPress} />
    ),
    []
  );
  return (
    <Drawer.Navigator useLegacyImplementation drawerContent={(props) => CDC(props, nothing)}>
      <Drawer.Screen name={texts.Feed.name} component={Feed} options={{ title: '', headerShown: false }} />
    </Drawer.Navigator>
  );
}

FeedStack.propTypes = {
  navigation: shape({
    navigate: func.isRequired
  }).isRequired
};

CustomDrawerContent.propTypes = {
  handleItemPress: func,
  props: object
};
