import { StyleSheet } from 'react-native';

import { colors } from '../../colors';

export const styles = StyleSheet.create({
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
    paddingVertical: 16,
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
