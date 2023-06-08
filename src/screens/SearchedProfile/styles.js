import { StyleSheet } from 'react-native';

import { colors } from '../../colors';

const HeaderHeight = 300;
const TabBarHeight = 48;
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
    padding: 20,
    height: '100%'
  },
  followText: {
    color: colors.white,
    fontSize: 14
  },
  unfollowText: {
    color: colors.white,
    fontSize: 14
  },
  header: {
    top: 0,
    height: HeaderHeight,
    width: '100%',
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute'
  },
  label: { fontSize: 16, color: '#222' },
  tab: { elevation: 0, shadowOpacity: 0, backgroundColor: '#61d5ea', height: TabBarHeight },
  indicator: { backgroundColor: '#222' },
  username: {
    color: colors.white,
    alignSelf: 'baseline',
    fontSize: 18,
    fontWeight: 'bold'
  },
  profilePicture: {
    borderRadius: 50,
    height: 110,
    marginRight: 20,
    width: 110
  },
  title: {
    color: colors.white,
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 10
  },
  followButton: {
    backgroundColor: colors.transparent,
    alignItems: 'center',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.white,
    paddingHorizontal: 10,
    paddingVertical: 5
  },
  unfollowButton: {
    backgroundColor: colors.error,
    alignItems: 'center',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.white,
    paddingHorizontal: 10,
    paddingVertical: 5
  },

  trainingCompletedContainer: {
    width: '90%',
    aspectRatio: 1.65,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: 'lightgray',
    marginBottom: 20,
    height: 200,
    overflow: 'hidden'
  },
  trainingCompletedHeader: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#B8E9EB'
  },
  profilePictureItem: {
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
  usernameItem: {
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
    marginLeft: 8
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
    marginRight: 3
  },
  trainingCompletedBody: {
    flex: 5,
    backgroundColor: 'white',
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
    marginBottom: 5
  },
  planDifficulty: {
    fontSize: 14,
    color: 'gray'
  },
  planCompletedText: {
    fontSize: 12,
    marginBottom: 2
  },
  item: {
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: 10
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 20
  },
  profileName: {
    fontSize: 17,
    fontWeight: '600',
    paddingLeft: 10
  },
  profileType: {
    paddingLeft: 10
  }
});
