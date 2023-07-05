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
    color: colors.white,
    alignItems: 'center',
    marginVertical: 10
  },
  suggestedPlansT: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.white,
    alignItems: 'center',
    marginVertical: 10,
    marginTop: 30
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
    color: colors.gray
  },
  trainingCompletedBody: {
    flex: 5,
    backgroundColor: colors.feed_items,
    paddingHorizontal: 5
  },
  planInfoContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
    marginTop: 3
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
    color: colors.gray,
    paddingBottom: 3,
    textAlign: 'center'
  },
  planTagsText: {
    fontSize: 14,
    color: colors.white,
    paddingBottom: 3,
    textAlign: 'center'
  },
  planCalification: {
    fontSize: 14,
    color: colors.gray,
    paddingBottom: 3,
    textAlign: 'center'
  },
  planScore: {
    fontSize: 32,
    color: colors.white,
    textAlign: 'center'
  },
  planDifficultyText: {
    fontSize: 24,
    color: colors.white,
    textAlign: 'center'
  },
  planCompletedText: {
    fontSize: 12,
    marginBottom: 2,
    color: colors.white
  },
  planDescText: {
    fontSize: 17,
    color: colors.white,
    marginBottom: 7,
    paddingLeft: 8
  },
  planContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20
  },
  description: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5
  },
  label: {
    fontWeight: 'bold',
    marginRight: 5,
    marginLeft: 9,
    color: 'gray'
  },
  value: {
    fontSize: 14
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 5
  },
  tag: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 5,
    marginBottom: 5,
    borderRadius: 5,
    fontSize: 12
  },
  descriptionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginTop: 6
  },
  bottomContainer: {
    flex: 2,
    flexDirection: 'row'
  },
  bottomLeft: {
    flex: 1,
    marginTop: 8
  },
  bottomMiddle: {
    flex: 1,
    marginTop: 8
  },
  bottomRight: {
    flex: 1,
    marginTop: 8
  },
  noPlans: {
    color: colors.white,
    fontSize: 16,
    opacity: 0.7
  }
});

export const scrollviewStyle = {
  flexGrow: 1,
  padding: 0
};
