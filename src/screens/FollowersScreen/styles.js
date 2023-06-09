import { StyleSheet, StatusBar } from 'react-native';

import { colors } from '../../colors';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%'
  },
  tabBar: {
    flexDirection: 'row',
    borderRadius: 50
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    backgroundColor: colors.main_soft,
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 50,
    borderWidth: 1,
    borderColor: colors.white
  },
  tabItemOdd: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    backgroundColor: colors.main_soft,
    borderWidth: 1,
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50,
    borderColor: colors.white
  }
});

export const scrollviewStyle = {
  flexGrow: 1,
  padding: 0
};
