import { StyleSheet } from 'react-native';

import { colors } from '../../colors';

export const styles = StyleSheet.create({
  usersOrPlansSwitchContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 30
  },
  viewSwitchInactive: {
    alignSelf: 'center',
    backgroundColor: colors.main_soft,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 55,
    color: colors.white,
    fontSize: 18,
    marginHorizontal: 2,
    padding: 10,
    width: '48%'
  },
  viewSwitchActive: {
    backgroundColor: colors.main,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 55,
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 2,
    padding: 10,
    width: '48%'
  },
  separator: {
    height: 7,
    width: '100%',
    backgroundColor: colors.main
  },
  container: {
    width: '100%',
    height: '95%'
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 32,
    paddingVertical: 28,
    width: '100%'
  },
  usernameContainer: {
    backgroundColor: colors.main,
    alignItems: 'center'
  },
  username: {
    color: 'white',
    padding: 10
  },
  submitButton: {
    backgroundColor: colors.main,
    alignItems: 'center',
    borderRadius: 2
  },
  title: {
    alignSelf: 'center',
    fontSize: 22,
    fontWeight: '500',
    paddingTop: 20,
    marginBottom: 24
  },
  userList: {
    borderWidth: 5,
    flex: 1
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
  profileName: {
    fontSize: 17,
    color: colors.white,
    fontWeight: '600',
    paddingLeft: 10
  },
  profileType: {
    paddingLeft: 10,
    color: colors.white
  }
});

export const scrollviewStyle = {};
