import { TextInput, View, Text } from "react-native";

import { texts } from "../../../texts";
import {
  EMAIL_FIELD_KEY,
  commonFieldProps,
  emailFieldType,
} from "../constants";
import { styles } from "../styles";

const fieldsTexts = texts.Fields;

const EmailField = ({ onChangeText, error }) => {
  return (
    <View style={styles.fieldContainer} key={EMAIL_FIELD_KEY}>
      <Text style={{ ...styles.fieldTitle, ...(error && styles.errorTitle) }}>
        {fieldsTexts.emailFieldTitle}
      </Text>
      <TextInput
        autoCapitalize="none"
        keyboardType={emailFieldType}
        onChangeText={onChangeText}
        placeholder={fieldsTexts.emailPlaceholder}
        {...commonFieldProps(error)}
      />
      {error && <Text style={styles.errorDescription}>{error}</Text>}
    </View>
  );
};

export default EmailField;
