import React, { useState } from "react";

import { colors } from "../../../colors";
import { NAME_FIELD_KEY } from "../constants";
import { styles } from "../styles";
import { texts } from "../../../texts";
import { View, TouchableOpacity, Text, TextInput } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

const fieldsTexts = texts.Fields;

const DateField = ({ onChangeText, error }) => {
  const [date, setDate] = useState(undefined);
  const [show, setShow] = useState(false);

  const onChange = (event, selectedValue) => {
    setShow(false);
    const currentDate = selectedValue || new Date();
    setDate(currentDate);
    onChangeText(currentDate);
  };

  const showDatePicker = () => {
    setDate(new Date());
    setShow(true);
  };

  const formatDate = (date) =>
    `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} `;

  return (
    <View style={styles.fieldContainer}>
      <Text style={{ ...styles.fieldTitle, ...(error && styles.errorTitle) }}>
        {fieldsTexts.birthdateFieldTitle}
      </Text>
      <TouchableOpacity style={{ width: "100%" }} onPress={showDatePicker}>
        <Text
          style={{
            ...styles.fieldInputContainer,
            ...(error && styles.error),
            ...(!date && { color: colors.placeholder }),
          }}
        >
          {date ? formatDate(date) : fieldsTexts.birthdatePlaceholder}
        </Text>
      </TouchableOpacity>
      {show && (
        <DateTimePicker
          value={date}
          display="default"
          mode="date"
          onChange={onChange}
        />
      )}
      {error && <Text style={styles.errorDescription}>{error}</Text>}
    </View>
  );
};

export default DateField;
