import {
  TextInput,
  View,
  Text,
  TouchableOpacity,
  Image,
  Keyboard,
} from "react-native-web";

import { styles } from "./styles";
import { texts } from "../../texts";
import { colors } from "../../colors";
import {
  EMAIL_FIELD_KEY,
  PASSWORD_FIELD_KEY,
  emailFieldType,
  passwordFieldType,
} from "../../constants";

const commonTextInputFieldProps = (error) => ({
  placeholderTextColor: colors.placeholderColor,
  returnKeyType: "next",
  style: { ...styles.fieldInputContainer, ...(error && styles.error) },
  underlineColorAndroid: colors.onFieldFocusColor,
});

const fieldsTexts = texts.Fields;

export const EmailField = (onChangeText, onSubmitEditing, mailError) => (
  <View style={styles.fieldContainer} key={EMAIL_FIELD_KEY}>
    <Text style={{ ...styles.fieldTitle, ...(mailError && styles.errorText) }}>
      {fieldsTexts.emailFieldTitle}
    </Text>
    <TextInput
      autoCapitalize="none"
      keyboardType={emailFieldType}
      onChangeText={onChangeText}
      onSubmitEditing={onSubmitEditing}
      placeholder={fieldsTexts.emailPlaceholder}
      {...commonTextInputFieldProps(mailError)}
    />
    {mailError && <Text style={styles.errorText}>{mailError}</Text>}
  </View>
);

export const PasswordField = (
  onChangeText,
  ref,
  hidePassword,
  handlePasswordVisibility,
  passwordError
) => (
  <View style={styles.fieldContainer} key={PASSWORD_FIELD_KEY}>
    <Text style={{ ...styles.fieldTitle, ...(passwordError && styles.errorText) }}>
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
        {...commonTextInputFieldProps(passwordError)}
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
              ? require("../../assets/icons/eye_close.png")
              : require("../../assets/icons/eye_open.png")
          }
        />
      </TouchableOpacity>
    </View>
    {passwordError && <Text style={styles.errorText}>{passwordError}</Text>}
  </View>
);
