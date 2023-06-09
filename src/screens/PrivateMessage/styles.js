import { StyleSheet } from 'react-native';

import { colors } from '../../colors';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%'
  },
  scrollViewCont: {
    flexGrow: 1
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginRight: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    color: colors.gray
  },
  senderMessageContainer: {
    alignSelf: 'flex-end',
    backgroundColor: colors.main_soft,
    marginRight: 18,
    marginTop: 4,
    marginLeft: 75,
    borderRadius: 15
  },
  receiverMessageContainer: {
    backgroundColor: colors.drawer,
    alignSelf: 'flex-start',
    marginTop: 4,
    marginLeft: 10,
    marginRight: 75,
    borderRadius: 15
  },
  senderMessageText: {
    color: 'white',
    marginRight: 8,
    marginLeft: 8
  },
  receiverMessageText: {
    color: 'white',
    marginRight: 8,
    marginLeft: 8
  },
  profilePic: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10
  },
  sendMsgIcon: {
    width: 30,
    height: 30,
    marginRight: 8
  }
});
