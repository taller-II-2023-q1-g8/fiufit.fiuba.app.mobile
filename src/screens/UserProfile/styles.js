import { StyleSheet } from 'react-native';

import { colors } from '../../colors';

export const styles = StyleSheet.create({
  container: {
    padding: 20,
    height: '100%'
  },
  header: {
    marginTop: 20,
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row'
  },
  username: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold'
  },
  profilePicture: {
    borderRadius: 50,
    height: 110,
    marginRight: 20,
    width: 110
  },
  title: {
    marginTop: 30,
    color: colors.white,
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 10
  }
});
