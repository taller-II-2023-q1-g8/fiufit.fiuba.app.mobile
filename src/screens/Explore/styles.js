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
    // backgroundColor: '#666666',
    backgroundColor: colors.dark_purple,
    fontSize: 18,
    color: colors.white,
    padding: 10,
    height: 45,
    width: '48%',
    borderTopRightRadius: 55,
    alignSelf: 'center',
    marginHorizontal: 2,
    borderTopLeftRadius: 15
  },
  viewSwitchActive: {
    marginHorizontal: 2,
    // borderBottomWidth: 0,
    // borderColor: '#CACACA',
    // borderWidth: 1.5,
    backgroundColor: colors.purple,
    fontSize: 18,
    color: 'white',
    padding: 10,
    height: 50,
    width: '48%',
    borderTopRightRadius: 55,
    borderTopLeftRadius: 15
  },
  separator: {
    height: 7,
    width: '100%',
    backgroundColor: colors.purple
  },
  container: {
    backgroundColor: colors.white,
    width: '100%',
    height: '100%',
    flex: 1
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
    backgroundColor: colors.purple,
    alignItems: 'center'
  },
  username: {
    color: 'white',
    padding: 10
  },
  submitButton: {
    backgroundColor: colors.purple,
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
    fontWeight: '600',
    paddingLeft: 10
  },
  profileType: {
    paddingLeft: 10
  }
});

export const scrollviewStyle = {
  flex: 1,
  borderRadius: 2
};
