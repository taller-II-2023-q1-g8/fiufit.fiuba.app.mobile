import { StyleSheet } from 'react-native';

import { colors } from '../../colors';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    width: '100%',
    height: '100%'
  },
  formContainer: {
    paddingHorizontal: 32,
    width: '100%',
    paddingTop: 8,
    paddingBottom: 32
  },
  logoutButton: {
    position: 'absolute',
    top: 25,
    right: 16,
    padding: 8
  },
  logoutButtonIcon: {
    width: 38,
    height: 38
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 16
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold'
  },
  goalsTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    alignItems: 'center',
    marginBottom: 10
  },
  submitButton: {
    backgroundColor: colors.purple,
    alignItems: 'center',
    borderRadius: 4,
    marginBottom: 24,
    marginTop: 24
  },
  submitButtonText: {
    color: 'white',
    paddingVertical: 8,
    fontSize: 16
  },
  menu_view: {
    position: 'absolute',
    top: 25,
    right: 16,
    padding: 8
  }
});

export const scrollviewStyle = {
  flexGrow: 1
};
