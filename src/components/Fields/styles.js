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
    color: colors.white,
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
    tintColor: colors.white,
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
  },
  fieldContainer2: {
    alignItems: 'flex-start',
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 24,
    padding: 0,
    width: '80%'
  },
  item: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingVertical: 15,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: 'lightgray',
    backgroundColor: colors.feed_items,
    paddingLeft: 10,
    marginBottom: 15
  }
});

export default styles;
