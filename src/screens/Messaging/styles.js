import { StyleSheet, Dimensions } from 'react-native';

import { colors } from '../../colors';

const { width, height } = Dimensions.get('window');
const modalWidth = width - 40; // Adjust the width as per your requirements
const modalHeight = height - 80; // Adjust the height as per your requirements

export const styles = StyleSheet.create({
  backgroundContainer: {
    width: '100%',
    height: '100%'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  newConvOpacity: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center'
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
    opacity: 0.69
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
    backgroundColor: 'rgba(0, 0, 0, 0.8)', // Semi-transparent background
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
    borderRadius: 10,
    zIndex: 9999
  },
  searchContainer: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 10,
    width: '100%'
  }
});
