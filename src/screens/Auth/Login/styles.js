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
    fontSize: 22,
    color: 'white',
    fontWeight: '500',
    paddingTop: 60,
    marginBottom: 24 // because of gap not working :/
  },
  submitButton: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    borderColor: 'white',
    borderWidth: 2,
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
    color: 'white',
    marginRight: 8 // because of gap not working :/
  },
  forgotPassword: {
    color: colors.main,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 16 // because of gap not working :/
  },
  registerButton: {
    color: colors.main,
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
