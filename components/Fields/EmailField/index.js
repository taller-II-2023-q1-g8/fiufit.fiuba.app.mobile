import { TextInput, View, Text } from "react-native-web";

import { texts } from "../../../texts";
import {
  EMAIL_FIELD_KEY,
  commonFieldProps,
  emailFieldType,
} from "../constants";
import { styles } from "../styles";

const fieldsTexts = texts.Fields;

const EmailField = ({ onChangeText, onSubmitEditing, error }) => {
  return (
    <View style={styles.fieldContainer} key={EMAIL_FIELD_KEY}>
      <Text style={{ ...styles.fieldTitle, ...(error && styles.errorText) }}>
        {fieldsTexts.emailFieldTitle}
      </Text>
      <TextInput
        autoCapitalize="none"
        keyboardType={emailFieldType}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmitEditing}
        placeholder={fieldsTexts.emailPlaceholder}
        {...commonFieldProps(error)}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

export default EmailField;
