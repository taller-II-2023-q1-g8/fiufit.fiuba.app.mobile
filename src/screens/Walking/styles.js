import { StyleSheet } from 'react-native';

import { colors } from '../../colors';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center'
  },
  infoContainer: {
    width: '80%',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.white,
    backgroundColor: colors.header
  },
  stepsContainer: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between'
    // borderWidth: 1,
    // borderColor: colors.white,
    // borderBottomWidth: 0,
  },
  timeContainer: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between'
    // borderWidth: 1,
    // borderColor: colors.white,
    // borderTopWidth: 0,
  },
  steps: {
    padding: 10,
    textAlign: 'right',
    width: '65%',
    fontSize: 50,
    color: colors.white
  },
  stepsImg: {
    marginRight: 35,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  mts: {
    marginRight: 35,
    display: 'flex',
    fontSize: 20,
    color: colors.white,
    alignItems: 'center',
    justifyContent: 'center'
  },
  timeImg: {
    marginRight: 35,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },

  time: {
    padding: 10,
    fontSize: 50,
    width: '65%',
    textAlign: 'right',
    color: colors.white
  },
  actionButton: {
    margin: 20,
    borderRadius: 20,
    padding: 5
  },

  startButton: {
    backgroundColor: 'green'
  },
  pauseButton: {
    backgroundColor: colors.main,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 100
  },
  stopButton: {
    backgroundColor: 'red'
  },

  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },

  actionButtonText: {
    fontSize: 30,
    padding: 10,
    color: colors.white
  },

  errorText: {
    fontSize: 30,
    color: colors.white
  }
});

export const scrollviewStyle = {
  flexGrow: 1,
  padding: 0
};
