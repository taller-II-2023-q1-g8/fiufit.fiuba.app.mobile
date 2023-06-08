import { StyleSheet } from 'react-native';

import { colors } from '../../colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center'
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
    borderRadius: 10
  },
  senderMessageContainer: {
    backgroundColor: '#DCF8C5',
    alignSelf: 'flex-end'
  },
  receiverMessageContainer: {
    backgroundColor: colors.purple,
    alignSelf: 'flex-start'
  },
  senderMessageText: {
    color: 'black'
  },
  receiverMessageText: {
    color: 'black'
  },
  profilePic: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10
  }
});
