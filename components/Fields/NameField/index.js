import { TextInput, View, Text } from "react-native";

import { texts } from "../../../texts";
import { styles } from "../styles";
import { NAME_FIELD_KEY, commonFieldProps, nameFieldType } from "../constants";

const fieldsTexts = texts.Fields;

const NameField = ({ onChangeText, error }) => {
  return (
    <View style={styles.fieldContainer} key={NAME_FIELD_KEY}>
      <Text style={{ ...styles.fieldTitle, ...(error && styles.errorText) }}>
        {fieldsTexts.nameFieldTitle}
      </Text>
      <TextInput
        autoCapitalize="none"
        keyboardType={nameFieldType}
        onChangeText={onChangeText}
        placeholder={fieldsTexts.namePlaceholder}
        {...commonFieldProps(error)}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

export default NameField;
