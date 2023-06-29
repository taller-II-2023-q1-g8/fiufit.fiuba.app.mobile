import { array, func, number, bool, object } from 'prop-types';
import {
  FlatList,
  useWindowDimensions,
  View,
  ImageBackground,
  TouchableOpacity,
  Animated,
  Text
} from 'react-native';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';
import React from 'react';

import { Item, ItemSeparatorView } from '../Explore/search_users_layout';
import Loader from '../../components/Loader';
import BackgroundImage from '../../assets/Background.jpg';
import { colors } from '../../colors';

import { styles } from './styles';

function UserList({ data, handleItemPress }) {
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
const UserListMemo = React.memo(UserList);
function Tabs({ data, index, routes, setIndex, handleItemPress }) {
  const renderScene = ({ route }) => {
    console.log(route.key);
    switch (route.key) {
      case 'first':
        return <UserListMemo data={data.followed} handleItemPress={handleItemPress} />;
      case 'second':
        return <UserListMemo data={data.followers} handleItemPress={handleItemPress} />;
      default:
        return null;
    }
  };

  const layout = useWindowDimensions();
  const renderLabel = ({ route, focused }) => (
    <Text style={[styles.label, { opacity: focused ? 1 : 0.5 }]}>{route.title}</Text>
  );
  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorContainerStyle={styles.indicatorContainer}
      style={styles.tab}
      renderLabel={renderLabel}
      tabStyle={{ borderRightWidth: 1, borderLeftWidth: 1 }}
      indicatorStyle={styles.indicator}
    />
  );
  return (
    <ImageBackground source={BackgroundImage} resizeMode="cover">
      <View style={styles.container}>
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          renderTabBar={renderTabBar}
          onIndexChange={setIndex}
          initialLayout={{ width: layout.width }}
        />
      </View>
    </ImageBackground>
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
UserList.propTypes = {
  data: object,
  handleItemPress: func
};
