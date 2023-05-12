import { func, string, array } from 'prop-types';
import { Picker } from '@react-native-picker/picker';
import { View, Text } from 'react-native';
import React, { useState } from 'react';

import styles from '../styles';

function GenericSelectField({ onChangeText, title, items }) {
  // const defSelectedValue = defaultValue == null ? 'femaile' : defaultValue;
  const [selectedValue, setSelectedValue] = useState('');

  const handleOnValueChange = (newSelectedValue) => {
    onChangeText(newSelectedValue);
    setSelectedValue(newSelectedValue);
  };

  return (
    <View style={styles.fieldContainer}>
      <Text style={styles.fieldTitle}>{title}</Text>
      <Picker
        selectedValue={selectedValue}
        style={styles.fieldInputContainer}
        onValueChange={handleOnValueChange}
      >
        {items.map((item) => (
          <Picker.Item label={item.label} value={item.value} />
        ))}
      </Picker>
      <Text style={styles.errorDescription} />
    </View>
  );
}

GenericSelectField.propTypes = {
  items: array.isRequired,
  onChangeText: func.isRequired,
  title: string.isRequired
};

export default GenericSelectField;
