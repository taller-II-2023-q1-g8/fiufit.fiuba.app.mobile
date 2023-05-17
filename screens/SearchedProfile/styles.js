import { StyleSheet } from 'react-native';

import { colors } from '../../colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20
  },
  header: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row'
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  follow: {
    fontSize: 18
  },
  profilePicture: {
    borderRadius: 50,
    height: 110,
    marginRight: 20,
    width: 110
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 10
  },
  followButton: {
    backgroundColor: colors.placeholder,
    alignItems: 'center',
    borderRadius: 4,
    width: '50%'
  },
  unfollowButton: {
    backgroundColor: colors.error,
    alignItems: 'center',
    borderRadius: 4,
    width: '50%'
  }
});
