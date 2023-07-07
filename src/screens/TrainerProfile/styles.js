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
  noPlans: {
    color: colors.white,
    fontSize: 16,
    opacity: 0.7
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

  item: {
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: 10,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: 'lightgray',
    backgroundColor: colors.feed_items,
    paddingLeft: 10
  },
  actionButton: {
    borderRadius: 20,
    width: '40%',
    backgroundColor: colors.main_soft,
    alignItems: 'center'
  }
});

export const scrollviewStyle = {
  flexGrow: 1,
  paddingBottom: 40
};
