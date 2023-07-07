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
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20
  },
  formContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
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
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  submitButton: {
    backgroundColor: '#f9f9f9',
    alignItems: 'center',
    padding: 20,
    margin: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#f0f0f0'
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10
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
  banner: {
    height: 200,
    marginRight: 0,
    marginLeft: 0,
    width: 372
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
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  }
});

export const scrollviewStyle = {
  flex: 1,
  borderRadius: 2
};
