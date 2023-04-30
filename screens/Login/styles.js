import { StyleSheet } from 'react-native';

import { colors } from '../../colors';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%'
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    // gap: 24,
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
    marginBottom: 24 // because of gap not working :/
  },
  submitButton: {
    backgroundColor: colors.purple,
    alignItems: 'center',
    borderRadius: 4,
    marginBottom: 24 // because of gap not working :/
  },
  submitButtonText: {
    color: 'white',
    paddingVertical: 8,
    fontSize: 16
  },
  needAccountContainer: {
    display: 'flex',
    flexDirection: 'row'
    // gap: 8,
  },
  needAccountText: {
    fontSize: 16,
    marginRight: 8 // because of gap not working :/
  },
  forgotPassword: {
    color: colors.purple,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 16 // because of gap not working :/
  },
  registerButton: {
    color: colors.purple,
    fontSize: 16,
    fontWeight: 'bold'
  },
  redirectionButtons: {
    // gap: 16,
  },
  socialNetworkLogo: {
    width: 40,
    height: 40,
    marginVertical: 10,
    alignSelf: 'center'
  }
});

export const scrollviewStyle = {
  flex: 1,
  borderRadius: 2
};
