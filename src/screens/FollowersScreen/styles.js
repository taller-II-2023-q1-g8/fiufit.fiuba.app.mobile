import { StyleSheet, StatusBar } from 'react-native';

import { colors } from '../../colors';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%'
  },
  tabBar: {
    flexDirection: 'row'
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    backgroundColor: colors.main
  }
});

export const scrollviewStyle = {
  flexGrow: 1,
  padding: 0
};
