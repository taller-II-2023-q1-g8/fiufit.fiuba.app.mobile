import { StyleSheet } from 'react-native';

import { colors } from '../../colors';

export const styles = StyleSheet.create({
  container: {
    height: '100%',
    padding: 20,
    marginTop: 40
  },
  profileName: {
    fontSize: 17,
    fontWeight: '600',
    paddingLeft: 10,
    color: colors.white
  },
  profileType: {
    paddingLeft: 10,
    color: colors.white
  },
  header: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row'
  },
  username: {
    fontSize: 18,
    color: colors.white,
    fontWeight: 'bold'
  },
  profilePicture: {
    alignSelf: 'flex-start',
    borderRadius: 20,
    height: 150,
    marginRight: 20,
    width: 110
  },
  item: {
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: 10
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 20
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 10,
    color: colors.white
  },
  startButton: {
    backgroundColor: colors.transparent,
    alignItems: 'center',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.white,
    paddingHorizontal: 10,
    paddingVertical: 10
  },
  startButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold'
  }
});
