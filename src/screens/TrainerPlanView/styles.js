import { StyleSheet } from 'react-native';

import { colors } from '../../colors';

export const styles = StyleSheet.create({
  submitButton: {
    backgroundColor: colors.soft_red,
    alignItems: 'center',
    borderRadius: 4,
    marginBottom: 15,
    marginVertical: 10,
    marginRight: 5
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20
  },
  header: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row'
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  quantity_cal: {
    fontSize: 16
  },
  quality_cal: {
    fontSize: 16
  },
  profilePicture: {
    borderRadius: 50,
    height: 110,
    marginRight: 20,
    width: 110
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 10
  },
  startButton: {
    alignItems: 'center',
    backgroundColor: colors.purple,
    borderRadius: 4,
    marginBottom: 24
  },
  startButtonText: {
    color: 'white',
    fontSize: 16,
    paddingVertical: 8
  }
});
