import React from 'react';
import { FlatList, useWindowDimensions, View } from 'react-native';
import { SceneMap, TabView } from 'react-native-tab-view';
import { array, func, number, bool, object } from 'prop-types';

import Loader from '../../components/Loader';
import { Item, ItemSeparatorView } from '../Explore/search_users_layout';

function UserList(data, handleItemPress) {
  console.log(data);
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={data}
        renderItem={({ item }) => <Item handleItemPress={handleItemPress} user={item} />}
        ItemSeparatorComponent={ItemSeparatorView}
      />
    </View>
  );
}
function Tabs({ data, index, routes, setIndex, handleItemPress }) {
  const renderScene = SceneMap({
    first: () => UserList(data.followed, handleItemPress),
    second: () => UserList(data.followers, handleItemPress)
  });

  const layout = useWindowDimensions();
  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
    />
  );
}

export default function FollowInfo({ loading, index, routes, setIndex, data, handleItemPress }) {
  return (
    <>
      <Loader loading={loading} />
      {!loading && (
        <Tabs
          data={data}
          index={index}
          setIndex={setIndex}
          routes={routes}
          handleItemPress={handleItemPress}
        />
      )}
    </>
  );
}

FollowInfo.propTypes = {
  loading: bool,
  index: number,
  routes: array,
  setIndex: func,
  data: object,
  handleItemPress: func
};
Tabs.propTypes = {
  index: number,
  routes: array,
  setIndex: func,
  data: object,
  handleItemPress: func
};
