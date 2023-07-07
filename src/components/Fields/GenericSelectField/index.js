import { func, string, array, object } from 'prop-types';
import { Picker } from '@react-native-picker/picker';
import { View, Text } from 'react-native';
import React, { useState } from 'react';

import styles from '../styles';
import { colors } from '../../../colors';

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
        dropdownIconColor={colors.white}
        onValueChange={handleOnValueChange}
        selectedValue={selectedValue}
        style={fieldInputContainerStyle}
        mode="dropdown"
      >
        {items.map((item) => (
          <Picker.Item label={item.label} value={item.value} />
        ))}
      </Picker>
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
