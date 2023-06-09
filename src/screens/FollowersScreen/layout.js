import { array, func, number, bool, object } from 'prop-types';
import {
  FlatList,
  useWindowDimensions,
  View,
  ImageBackground,
  TouchableOpacity,
  Animated
} from 'react-native';
import { SceneMap, TabView } from 'react-native-tab-view';
import React from 'react';

import { Item, ItemSeparatorView } from '../Explore/search_users_layout';
import Loader from '../../components/Loader';
import BackgroundImage from '../../assets/Background.jpg';
import { colors } from '../../colors';

import { styles } from './styles';

function UserList(data, handleItemPress) {
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
  const renderTabBar = (props) => {
    // eslint-disable-next-line react/prop-types
    const inputRange = props.navigationState.routes.map((x, i) => i);

    return (
      <View style={styles.tabBar}>
        {/* eslint-disable-next-line react/prop-types */}
        {props.navigationState.routes.map((route, i) => {
          // eslint-disable-next-line react/prop-types
          const opacity = props.position.interpolate({
            inputRange,
            outputRange: inputRange.map((inputIndex) => (inputIndex === i ? 1 : 0.5))
          });

          return (
            <TouchableOpacity style={styles.tabItem} onPress={() => setIndex(i)}>
              <Animated.Text style={{ opacity, color: colors.white, fontSize: 16, fontWeight: 'bold' }}>
                {route.title}
              </Animated.Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };
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
