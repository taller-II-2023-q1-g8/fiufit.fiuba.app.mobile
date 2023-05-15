import { func, string, array, object } from 'prop-types';
import { Picker } from '@react-native-picker/picker';
import { View, Text } from 'react-native';
import React, { useState } from 'react';

import styles from '../styles';

function GenericSelectField({
  onChangeText,
  title,
  items,
  titleStyle = styles.fieldTitle,
  fieldInputContainerStyle = styles.fieldInputContainer,
  containerStyle = styles.fieldContainer
}) {
  // const defSelectedValue = defaultValue == null ? 'femaile' : defaultValue;
  const [selectedValue, setSelectedValue] = useState('');

  const handleOnValueChange = (newSelectedValue) => {
    onChangeText(newSelectedValue);
    setSelectedValue(newSelectedValue);
  };

  return (
    <View style={containerStyle}>
      <Text style={titleStyle}>{title}</Text>
      <Picker
        selectedValue={selectedValue}
        style={fieldInputContainerStyle}
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
  title: string.isRequired,
  titleStyle: object.isRequired,
  containerStyle: object.isRequired,
  fieldInputContainerStyle: object.isRequired
};

export default GenericSelectField;
