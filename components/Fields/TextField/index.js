import { TextInput, View, Text, Image, TouchableOpacity } from "react-native";

import { texts } from "../../../texts";
import { styles } from "../styles";
import {
  commonFieldProps,
  passwordFieldType,
  textFieldType,
} from "../constants";
import { useState } from "react";

const fieldsTexts = texts.Fields;

const TextField = ({
  onChangeText,
  error,
  title,
  placeholder,
  keyboardType = textFieldType,
}) => {
  const [hidePassword, setHidePassword] = useState(
    keyboardType === passwordFieldType
  );
  const handlePasswordVisibility = () => setHidePassword(!hidePassword);

  return (
    <View style={styles.fieldContainer}>
      <Text style={{ ...styles.fieldTitle, ...(error && styles.errorTitle) }}>
        {title}
      </Text>
      <View style={styles.passwordInputContainer}>
        <TextInput
          autoCapitalize="none"
          keyboardType={keyboardType}
          secureTextEntry={hidePassword}
          onChangeText={onChangeText}
          placeholder={placeholder}
          {...commonFieldProps(error)}
        />
        {keyboardType === passwordFieldType && (
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.hidePasswordContainer}
            onPress={handlePasswordVisibility}
          >
            <Image
              style={styles.hidePasswordIcon}
              source={
                hidePassword
                  ? require("../../../assets/icons/eye_close.png")
                  : require("../../../assets/icons/eye_open.png")
              }
            />
          </TouchableOpacity>
        )}
      </View>
      {error && <Text style={styles.errorDescription}>{error}</Text>}
    </View>
  );
};

export default TextField;
