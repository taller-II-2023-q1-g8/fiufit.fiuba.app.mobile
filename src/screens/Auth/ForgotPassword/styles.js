import { StyleSheet } from 'react-native';

import { colors } from '../../../colors';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%'
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
    paddingTop: 20,
    marginBottom: 24
  },
  submitButton: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    borderColor: colors.white,
    borderWidth: 2,
    borderRadius: 4,
    marginBottom: 24
  },
  submitButtonText: {
    color: colors.white,
    paddingVertical: 8,
    fontSize: 16
  }
});

export const scrollviewStyle = {
  flex: 1,
  borderRadius: 2
};
