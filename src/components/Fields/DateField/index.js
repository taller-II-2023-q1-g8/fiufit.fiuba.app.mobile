import { func, string } from 'prop-types';
import { View, TouchableOpacity, Text } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useState } from 'react';

import { colors } from '../../../colors';
import styles from '../styles';

function DateField({ onChangeText, name, title, placeholder, error }) {
  const [date, setDate] = useState(undefined);
  const [show, setShow] = useState(false);

  const onChange = (event, selectedValue) => {
    setShow(false);
    const currentDate = selectedValue || new Date();
    setDate(currentDate);
    onChangeText(name, selectedValue);
  };

  const showDatePicker = () => {
    setDate(new Date());
    setShow(true);
  };

  const formatDate = (dateToFormat) =>
    `${dateToFormat.getDate()}/${dateToFormat.getMonth() + 1}/${dateToFormat.getFullYear()} `;

  return (
    <View style={styles.fieldContainer}>
      <Text style={{ ...styles.fieldTitle, ...(error && styles.errorTitle) }}>{title}</Text>
      <TouchableOpacity style={{ width: '100%' }} onPress={showDatePicker}>
        <Text
          style={{
            ...styles.fieldInputContainer,
            ...(error && styles.error),
            ...(!date && { color: colors.placeholder })
          }}
        >
          {date ? formatDate(date) : placeholder}
        </Text>
      </TouchableOpacity>
      {show && <DateTimePicker value={date} display="default" mode="date" onChange={onChange} />}
      {error && <Text style={styles.errorDescription}>{error}</Text>}
    </View>
  );
}

DateField.propTypes = {
  error: string.isRequired,
  name: string,
  onChangeText: func.isRequired,
  placeholder: string.isRequired,
  title: string.isRequired
};

export default DateField;
