import { StyleSheet } from 'react-native';

import { colors } from '../../colors';

export const styles = StyleSheet.create({
  container: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: colors.white
  },
  stars: {
    display: 'flex',
    flexDirection: 'row'
  },
  starUnselected: {
    color: colors.white
  },
  starSelected: {
    color: '#ffb300'
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    marginRight: 10,
    paddingHorizontal: 10,
    marginTop: 15,
    borderRadius: 10,
    color: colors.white
  }
});
