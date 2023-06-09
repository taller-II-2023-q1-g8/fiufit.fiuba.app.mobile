import { StyleSheet, Dimensions } from 'react-native';

import { colors } from '../../colors';

const { width, height } = Dimensions.get('window');
const modalWidth = width - 40;
const modalHeight = height - 80;

export const styles = StyleSheet.create({
  backgroundContainer: {
    width: '100%',
    height: '100%'
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center'
  },
  scrollViewContent: {
    flexGrow: 1
  },
  opacityButton: {
    position: 'absolute',
    bottom: 25,
    right: 25,
    zIndex: 999
  },
  opacityButtonIcon: {
    width: 60,
    height: 60,
    borderRadius: 35
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  msgContainer: {
    flex: 1
  },
  scrollViewContainer: {
    flex: 1,
    position: 'relative'
  },
  newConvOpacity: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    zIndex: 999
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
    paddingVertical: 10,
    marginLeft: 10
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 20
  },
  newConvPic: {
    width: 35,
    height: 35,
    borderRadius: 20,
    opacity: 1
  },
  profileName: {
    fontSize: 17,
    fontWeight: '600',
    paddingLeft: 10,
    color: colors.white
  },
  timeOfLastMsg: {
    paddingLeft: 10,
    color: colors.white
  },
  modalContainer: {
    position: 'absolute',
    top: (height - modalHeight) / 2 + 35,
    left: (width - modalWidth) / 2,
    width: modalWidth,
    height: modalHeight - 90,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
    borderRadius: 10,
    zIndex: 9999
  },
  searchContainer: {
    flex: 1,
    borderRadius: 10,
    width: '100%'
  }
});
