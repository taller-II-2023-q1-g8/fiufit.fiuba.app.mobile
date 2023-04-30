import { StyleSheet } from 'react-native';

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
    fontSize: 16,
    fontWeight: '400',
    marginBottom: 12
  },
  fieldInputContainer: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: '#C1C7D0',
    borderRadius: 4,
    borderWidth: 1,
    display: 'flex',
    flexDirection: 'row',
    fontSize: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    width: '100%'
  },
  error: {
    borderColor: '#CC3300',
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
    width: 20
  }
});

export default styles;
