import { View, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { styles } from "../styles";
import { useState } from "react";

const SelectField = ({ onChangeText, error, title }) => {
  const [selectedValue, setSelectedValue] = useState("female");

  const handleOnValueChange = (selectedValue) => {
    onChangeText(selectedValue);
    setSelectedValue(selectedValue);
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
          ...(error && styles.error),
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
};

export default SelectField;
