import { StyleSheet } from 'react-native';

import { colors } from '../../colors';

export const styles = StyleSheet.create({
  container: {
    padding: 10,
    height: '100%'
  },
  header: {
    marginTop: 20,
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row'
  },
  item: {
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: 10
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
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 20
  },
  title: {
    marginTop: 30,
    color: colors.white,
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 10
  },
  titleFavs: {
    marginTop: 60,
    color: colors.white,
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 10
  }
});
