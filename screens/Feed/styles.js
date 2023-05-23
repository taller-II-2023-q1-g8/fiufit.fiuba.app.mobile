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
  homeHeader: {
    backgroundColor: colors.purple,
    width: '100%',
    // height: 70,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 42,
    paddingTop: 20,
    paddingBottom: 5
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
  },
  trainingCompletedContainer: {
    width: '90%',
    aspectRatio: 2.8,
    borderWidth: 2,
    borderColor: 'black',
    marginBottom: 20,
    height: 120
  },
  trainingCompletedHeader: {
    flex: 1,
    backgroundColor: 'lightblue'
  },
  trainingCompletedBody: {
    flex: 2,
    backgroundColor: 'lightgray'
  },
  border: {
    height: 1,
    backgroundColor: 'black'
  }
});

export const scrollviewStyle = {
  flexGrow: 1,
  padding: 0
};
