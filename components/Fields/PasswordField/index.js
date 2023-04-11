import {
  TextInput,
  View,
  Text,
  TouchableOpacity,
  Image,
} from "react-native-web";

import {
  PASSWORD_FIELD_KEY,
  commonFieldProps,
  passwordFieldType,
} from "../constants";
import { texts } from "../../../texts";
import { styles } from "../styles";

const fieldsTexts = texts.Fields;

const PasswordField = ({
  onChangeText,
  ref,
  hidePassword,
  handlePasswordVisibility,
  error,
}) => {
  return (
    <View style={styles.fieldContainer} key={PASSWORD_FIELD_KEY}>
      <Text style={{ ...styles.fieldTitle, ...(error && styles.errorText) }}>
        {fieldsTexts.passwordFieldTitle}
      </Text>
      <View style={styles.passwordInputContainer}>
        <TextInput
          keyboardType={passwordFieldType}
          onChangeText={onChangeText}
          onSubmitEditing={Keyboard.dismiss}
          placeholder={fieldsTexts.passwordPlaceholder}
          ref={ref}
          secureTextEntry={hidePassword}
          {...commonFieldProps(error)}
        />
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
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

export default PasswordField;
