import { StyleSheet, Platform } from 'react-native';

import { colors } from '../../colors';

const styles = StyleSheet.create({
  fieldContainer: {
    alignItems: 'flex-start',
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 24,
    padding: 0,
    width: '100%'
  },
  fieldTitle: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '400',
    marginBottom: 12
  },
  fieldInputContainer: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderColor: '#C1C7D0',
    borderRadius: 4,
    borderWidth: 1,
    color: 'white',
    display: 'flex',
    flexDirection: 'row',
    fontSize: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    width: '100%'
  },
  error: {
    borderColor: colors.error,
    borderWidth: 2
  },
  errorTitle: {
    color: colors.error,
    fontWeight: 'bold'
  },
  errorDescription: {
    color: colors.error,
    marginTop: 12
  },
  passwordInputContainer: {
    alignItems: 'flex-end',
    display: 'flex',
    justifyContent: 'center',
    width: '100%'
  },
  hidePasswordContainer: {
    position: 'absolute',
    right: 10
  },
  hidePasswordIcon: {
    height: 20,
    tintColor: 'white',
    width: 20
  },
  searchField: {
    marginLeft: 10,
    alignItems: 'center',
    color: colors.white,
    display: 'flex',
    flexDirection: 'row',
    fontSize: 16,
    width: '100%'
  }
});

export default styles;
