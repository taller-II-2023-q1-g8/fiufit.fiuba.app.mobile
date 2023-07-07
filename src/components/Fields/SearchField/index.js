import Ionicons from 'react-native-vector-icons/Ionicons';
import { func, string } from 'prop-types';
import { TextInput, View } from 'react-native';
import React from 'react';

import { textFieldType } from '../constants';
import styles from '../styles';
import { colors } from '../../../colors';

function SearchField({ onChangeText, placeholder }) {
  return (
    <View style={styles.fieldInputContainer}>
      <Ionicons name="search" size={20} color={colors.white} />
      <TextInput
        autoCapitalize="none"
        keyboardType={textFieldType}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.placeholder}
        style={styles.searchField}
        underlineColorAndroid="transparent"
      />
    </View>
  );
}

SearchField.propTypes = {
  onChangeText: func.isRequired,
  placeholder: string.isRequired
};

export default SearchField;
