import { StyleSheet } from 'react-native';

import { colors } from '../../colors';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%'
  },
  formContainer: {
    paddingHorizontal: 32,
    width: '100%',
    paddingTop: 20,
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
    backgroundColor: colors.header,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 42,
    paddingVertical: 15
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
    backgroundColor: colors.main,
    alignItems: 'center',
    borderRadius: 4,
    marginBottom: 24,
    marginTop: 24
  },
  submitButtonText: {
    color: colors.white,
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
    aspectRatio: 1.65,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'lightgray',
    marginBottom: 20,
    height: 200,
    overflow: 'hidden'
  },
  trainingCompletedHeader: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.main_soft
  },
  profilePicture: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center'
  },
  userPhoto: {
    width: 47,
    height: 47,
    borderRadius: 50
  },
  border: {
    height: 1,
    backgroundColor: 'black'
  },
  usernameContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10
  },
  usernameWrapper: {
    justifyContent: 'center'
  },
  usernameText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'left',
    marginTop: 10,
    marginLeft: 8,
    color: colors.white
  },
  dateWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginBottom: 3
  },
  dateText: {
    fontSize: 12,
    fontStyle: 'italic',
    textAlign: 'center',
    marginRight: 3,
    color: colors.white
  },
  trainingCompletedBody: {
    flex: 5,
    backgroundColor: colors.feed_items,
    paddingHorizontal: 10
  },
  planInfoContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
    marginTop: 10
  },
  planImage: {
    width: 120,
    height: 120,
    borderRadius: 50,
    marginRight: 5
  },
  planDetails: {
    flex: 1
  },
  planName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: colors.white
  },
  planDifficulty: {
    fontSize: 14,
    color: colors.white
  },
  planCompletedText: {
    fontSize: 12,
    marginBottom: 2,
    color: colors.white
  }
});

export const scrollviewStyle = {
  flexGrow: 1,
  padding: 0
};
