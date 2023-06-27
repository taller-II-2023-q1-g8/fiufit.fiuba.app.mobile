import React from 'react';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';
import { useWindowDimensions, View, Text, Animated, ImageBackground } from 'react-native';
import { number, func, array, object } from 'prop-types';

import BackgroundImage from '../../assets/Background.jpg';

import { styles } from './styles';
import SearchUsers from './search_users_layout';
import SearchTrainingPlans from './search_plans_layout';

export default function Explore({
  index,
  setIndex,
  routes,
  dataPlans,
  dataUsers,
  handleUserPress,
  handlePlanPress,
  filterPlans,
  handleOnPlanTitleChange,
  handleOnUserNameChange,
  handleOnUserRoleChange,
  filterUsers
}) {
  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'first':
        return (
          <SearchUsers
            data={dataUsers}
            handleItemPress={handleUserPress}
            handleOnRoleChange={handleOnUserRoleChange}
            handleOnSearchChange={handleOnUserNameChange}
            filterUsers={filterUsers}
          />
        );
      case 'second':
        return (
          <SearchTrainingPlans
            data={dataPlans}
            handleItemPress={handlePlanPress}
            handleOnTitleChange={handleOnPlanTitleChange}
            filters={filterPlans}
          />
        );
      default:
        return null;
    }
  };
  const renderLabel = ({ route, focused }) => (
    <Text style={[styles.label, { opacity: focused ? 1 : 0.5 }]}>{route.title}</Text>
  );
  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorContainerStyle={styles.indicatorContainer}
      style={styles.tab}
      renderLabel={renderLabel}
      indicatorStyle={styles.indicator}
    />
  );

  const layout = useWindowDimensions();

  return (
    <ImageBackground source={BackgroundImage} resizeMode="cover">
      <View style={styles.backgroundContainer}>
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

Explore.propTypes = {
  index: number,
  setIndex: func,
  routes: array,
  dataPlans: object,
  dataUsers: object,
  handleUserPress: func,
  handlePlanPress: func,
  filterPlans: array,
  handleOnPlanTitleChange: func,
  handleOnUserNameChange: func,
  handleOnUserRoleChange: func,
  filterUsers: object
};
