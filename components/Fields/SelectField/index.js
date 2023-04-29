import { func, string } from 'prop-types';
import { Picker } from '@react-native-picker/picker';
import { View, Text } from 'react-native';
import React, { useState } from 'react';
import styles from '../styles';

function SelectField({ onChangeText, error, title }) {
  const [selectedValue, setSelectedValue] = useState('female');

  const handleOnValueChange = (newSelectedValue) => {
    onChangeText(newSelectedValue);
    setSelectedValue(newSelectedValue);
  };

  return (
    <View style={styles.fieldContainer}>
      <Text style={{ ...styles.fieldTitle, ...(error && styles.errorTitle) }}>
        {title}
      </Text>
      <Picker
        selectedValue={selectedValue}
        style={{
          ...styles.fieldInputContainer,
          ...(error && styles.error)
        }}
        onValueChange={handleOnValueChange}
      >
        <Picker.Item label="Mujer" value="female" />
        <Picker.Item label="Hombre" value="male" />
        <Picker.Item label="Otro" value="other" />
      </Picker>
      {error && <Text style={styles.errorDescription}>{error}</Text>}
    </View>
  );
}

SelectField.propTypes = {
  onChangeText: func.isRequired,
  error: string.isRequired,
  title: string.isRequired
};

export default SelectField;
