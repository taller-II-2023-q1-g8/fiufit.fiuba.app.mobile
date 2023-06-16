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
    height: '20%',
    flexDirection: 'row'
  },
  headerInfo: {
    flex: 4,
    flexDirection: 'row'
  },
  headerIcons: {
    flex: 1,
    height: '100%',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between'
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
  }
});
