import { bool } from 'prop-types';
import { StyleSheet, View, Modal, ActivityIndicator } from 'react-native';
import React from 'react';

import { colors } from '../../colors';

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#00000040'
  },
  activityIndicatorWrapper: {
    backgroundColor: colors.header,
    borderColor: colors.white,
    borderWidth: 1,
    height: 100,
    width: 100,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  activityIndicator: {
    alignItems: 'center',
    height: 80
  }
});

function Loader(props) {
  const { loading } = props;

  return (
    <Modal transparent animationType="none" visible={loading}>
      <View style={styles.modalBackground}>
        <View style={styles.activityIndicatorWrapper}>
          <ActivityIndicator animating color={colors.white} size="large" style={styles.activityIndicator} />
        </View>
      </View>
    </Modal>
  );
}

Loader.propTypes = {
  loading: bool.isRequired
};

export default Loader;
