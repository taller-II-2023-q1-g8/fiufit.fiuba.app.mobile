import * as React from 'react';
import { View, useWindowDimensions } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';

function FirstRoute() {
  return <View style={{ flex: 1, backgroundColor: '#ff4081' }} />;
}

function SecondRoute() {
  return <View style={{ flex: 1, backgroundColor: '#673ab7' }} />;
}

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute
});

export default function TabViewExample() {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'First' },
    { key: 'second', title: 'Second' }
  ]);

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
    />
  );
}
