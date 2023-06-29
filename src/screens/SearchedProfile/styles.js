import { StyleSheet } from 'react-native';

import { colors } from '../../colors';

const HeaderHeight = 170;
const TabBarHeight = 48;
export const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  follow: {
    fontSize: 18,
    color: colors.white
  },
  header: {
    top: 0,
    height: HeaderHeight,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    flexDirection: 'row',
    paddingLeft: 50
  },
  label: { fontSize: 16, color: colors.white, fontWeight: 'bold' },
  tab: { elevation: 0, shadowOpacity: 0, backgroundColor: colors.main, height: TabBarHeight },
  indicator: { backgroundColor: colors.white },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.white
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
    marginVertical: 10,
    color: colors.white
  },
  followButton: {
    backgroundColor: colors.placeholder,
    alignItems: 'center',
    borderRadius: 4,
    marginLeft: 20,
    marginRight: 30,
    width: '50%'
  },
  unfollowButton: {
    backgroundColor: colors.error,
    alignItems: 'center',
    borderRadius: 4,
    marginLeft: 20,
    marginRight: 30,
    width: '50%'
  },
  followersText: {
    fontWeight: 'bold',
    color: colors.white
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
    marginRight: 3
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
    flex: 1,
    color: colors.white
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
  },
  item: {
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: 10,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: 'lightgray',
    backgroundColor: colors.feed_items
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 20
  },
  profileName: {
    fontSize: 17,
    fontWeight: '600',
    paddingLeft: 10,
    color: colors.white
  },
  profileType: {
    paddingLeft: 10,
    color: colors.white
  },
  msgIcon: {
    width: 60,
    height: 60,
    marginLeft: 15
  }
});
