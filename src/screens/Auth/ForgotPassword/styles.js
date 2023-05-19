import { StyleSheet } from 'react-native';

import { colors } from '../../../colors';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
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
    fontSize: 22,
    fontWeight: '500',
    paddingTop: 20,
    marginBottom: 24
  },
  submitButton: {
    backgroundColor: colors.purple,
    alignItems: 'center',
    borderRadius: 4,
    marginBottom: 24
  },
  submitButtonText: {
    color: 'white',
    paddingVertical: 8,
    fontSize: 16
  }
});

export const scrollviewStyle = {
  flex: 1,
  borderRadius: 2
};
