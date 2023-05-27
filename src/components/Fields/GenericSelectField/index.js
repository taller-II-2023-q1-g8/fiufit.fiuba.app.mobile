import { func, string, array, object } from 'prop-types';
import { Picker } from '@react-native-picker/picker';
import { View, Text } from 'react-native';
import React, { useState } from 'react';

import styles from '../styles';

function GenericSelectField({
  onChangeText,
  title,
  name,
  items,
  titleStyle = styles.fieldTitle,
  fieldInputContainerStyle = styles.fieldInputContainer,
  containerStyle = styles.fieldContainer
}) {
  // const defSelectedValue = defaultValue == null ? 'femaile' : defaultValue;
  const [selectedValue, setSelectedValue] = useState('');

  const handleOnValueChange = (newSelectedValue) => {
    onChangeText(name, newSelectedValue);
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
  name: string.isRequired,
  onChangeText: func.isRequired,
  title: string.isRequired,
  titleStyle: object.isRequired,
  containerStyle: object.isRequired,
  fieldInputContainerStyle: object
};

export default GenericSelectField;
