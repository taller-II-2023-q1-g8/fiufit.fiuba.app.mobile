import { StyleSheet } from 'react-native';

import { colors } from '../../../colors';

export const styles = StyleSheet.create({
  container: {
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
    color: colors.white,
    fontSize: 22,
    fontWeight: '500',
    marginBottom: 24,
    paddingTop: 20
  },
  submitButton: {
    alignItems: 'center',
    backgroundColor: colors.main,
    borderRadius: 4,
    marginBottom: 24
  },
  submitButtonText: {
    color: colors.white,
    fontSize: 16,
    paddingVertical: 8
  }
});

export const scrollviewStyle = {
  flexGrow: 1
};
