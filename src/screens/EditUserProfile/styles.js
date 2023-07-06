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
  },
  profilePicOpacity: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
    marginBottom: 20
  },
  profilePicture: {
    width: 300,
    height: 300,
    borderRadius: 15
  },
  overlayContainer: {
    position: 'absolute',
    bottom: 0,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 2,
    alignSelf: 'flex-end'
  },
  overlayText: {
    color: colors.white,
    fontSize: 20,
    fontWeight: 'bold'
  },
  fieldContainer: {
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

export const scrollviewStyle = {
  flexGrow: 1
};
