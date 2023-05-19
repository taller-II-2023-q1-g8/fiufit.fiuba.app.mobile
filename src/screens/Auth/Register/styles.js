import { StyleSheet } from 'react-native';

import { colors } from '../../../colors';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    height: '100%',
    width: '100%'
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    paddingHorizontal: 32,
    paddingVertical: 16,
    width: '100%'
  },
  title: {
    alignSelf: 'center',
    fontSize: 22,
    fontWeight: '500',
    marginBottom: 24,
    paddingTop: 20
  },
  submitButton: {
    alignItems: 'center',
    backgroundColor: colors.purple,
    borderRadius: 4,
    marginBottom: 24
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    paddingVertical: 8
  },
  scrollButton: {
    backgroundColor: colors.purple,
    alignItems: 'center',
    width: '46%',
    borderRadius: 4,
    margin: 10
  },
  scrollButtonDisabled: {
    backgroundColor: colors.gray,
    alignItems: 'center',
    width: '46%',
    borderRadius: 4,
    margin: 10
  }
});

export const scrollviewStyle = {
  flexGrow: 1
};
