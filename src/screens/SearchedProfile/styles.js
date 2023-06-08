import { StyleSheet } from 'react-native';

import { colors } from '../../colors';

export const styles = StyleSheet.create({
  container: {
    padding: 20,
    height: '100%'
  },
  followText: {
    color: colors.white,
    fontSize: 14
  },
  unfollowText: {
    color: colors.white,
    fontSize: 14
  },
  header: {
    alignItems: 'center',
    display: 'flex',
    marginTop: 20,
    flexDirection: 'row'
  },
  username: {
    color: colors.white,
    alignSelf: 'baseline',
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
    color: colors.white,
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 10
  },
  followButton: {
    backgroundColor: colors.transparent,
    alignItems: 'center',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.white,
    paddingHorizontal: 10,
    paddingVertical: 5
  },
  unfollowButton: {
    backgroundColor: colors.error,
    alignItems: 'center',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.white,
    paddingHorizontal: 10,
    paddingVertical: 5
  }
});
