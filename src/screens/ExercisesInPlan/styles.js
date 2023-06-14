import { StyleSheet, Dimensions } from 'react-native';

import { colors } from '../../colors';

const HEIGHT = Dimensions.get('window').height;
export const a = {
  primary: '#6f02b5',
  secondary: '#9440c7',
  tertiary: '#e8e8e8',
  alternative: '#d1c5d1',
  underlay: '#6b0ca8'
};
export const styles = StyleSheet.create({
  headerView: {
    paddingVertical: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  headerTitle: {
    fontSize: 35,
    fontWeight: 'bold',
    color: colors.white
  },
  headerButton: {
    fontWeight: 'bold',
    color: colors.white
  },
  ExerciseText: {
    fontSize: 18,
    color: colors.white
  },
  SwipedExerciseText: {
    color: a.alternative,
    fontStyle: 'italic',
    textDecorationLine: 'line-through',
    opacity: 0.6
  },
  ListView: {
    backgroundColor: colors.drawer,
    minHeight: 85,
    height: 90,
    width: '100%',
    padding: 15,
    justifyContent: 'space-around',
    marginBottom: 10,
    marginTop: 10,
    borderRadius: 10
  },
  wR: {
    fontSize: 12,
    color: a.alternative,
    textAlign: 'left',
    textTransform: 'uppercase'
  },
  ListViewHidden: {
    backgroundColor: colors.error,
    minHeight: 85,
    height: 90,
    width: '100%',
    padding: 15,
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginBottom: 10,
    marginTop: 10,
    borderRadius: 10
  },
  HiddenButton: {
    width: 55,
    alignItems: 'center'
  },
  EmptyView: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: HEIGHT / 5
  },
  ModalButton: {
    width: 60,
    height: 60,
    backgroundColor: colors.main_soft,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    position: 'absolute',
    bottom: 15
  },
  ModalContainer: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: colors.header
  },
  ModalView: {
    backgroundColor: colors.drawer,
    borderRadius: 18,
    padding: 35
  },
  ModalIcon: {
    alignItems: 'center',
    marginBottom: 30
  },
  StyledInput: {
    width: 300,
    height: 50,
    backgroundColor: colors.drawer,
    borderWidth: 1,
    borderColor: colors.white,
    padding: 10,
    fontSize: 16,
    borderRadius: 16,
    color: colors.white,
    marginTop: 15
  },
  StyledPicker: {
    width: 200,
    height: 50,
    backgroundColor: colors.drawer,
    fontSize: 16,
    color: colors.white,
    display: 'flex',
    flexDirection: 'row'
  },
  ModalActionGroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 30
  },
  ModalAction: {
    width: 60,
    height: 60,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center'
  },
  container: {
    height: '100%',
    padding: 20,
    paddingBottom: 0
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 20
  },
  fieldInputContainer: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderColor: '#C1C7D0',
    borderRadius: 4,
    borderWidth: 1,
    color: colors.white,
    display: 'flex',
    flexDirection: 'row',
    fontSize: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    width: '100%'
  }
});

/*

SafeAreaView`
  flex: 1;
  background-color: ${colors.primary};
  padding: 20px;
  padding-bottom: 0px;
*/
export const scrollviewStyle = {
  flex: 1,
  borderRadius: 2
};
