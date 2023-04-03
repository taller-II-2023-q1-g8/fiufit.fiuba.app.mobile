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
import { EMAIL_FIELD_KEY, PASSWORD_FIELD_KEY, emailFieldType, passwordFieldType } from "../../constants";

const commonTextInputFieldProps = {
  placeholderTextColor: colors.placeholderColor,
  returnKeyType: "next",
  style: styles.fieldInputContainer,
  underlineColorAndroid: colors.onFieldFocusColor,
  // blurOnSubmit={false},
};

const loginTexts = texts.Login;

export const EmailField = (onChangeText, onSubmitEditing) => (
  <View style={styles.fieldContainer} key={EMAIL_FIELD_KEY}>
    <Text style={styles.fieldTitle}>{loginTexts.userFieldTitle}</Text>
    <TextInput
      autoCapitalize="none"
      keyboardType={emailFieldType}
      onChangeText={onChangeText}
      onSubmitEditing={onSubmitEditing}
      placeholder={loginTexts.emailPlaceholder}
      {...commonTextInputFieldProps}
    />
  </View>
);

export const PasswordField = (
  onChangeText,
  ref,
  hidePassword,
  handlePasswordVisibility
) => (
  <View style={styles.fieldContainer} key={PASSWORD_FIELD_KEY}>
    <Text style={styles.fieldTitle}>{loginTexts.passwordFieldTitle}</Text>
    <View style={styles.passwordInputContainer}>
      <TextInput
        keyboardType={passwordFieldType}
        onChangeText={onChangeText}
        onSubmitEditing={Keyboard.dismiss}
        placeholder={loginTexts.passwordPlaceholder}
        ref={ref}
        secureTextEntry={hidePassword}
        {...commonTextInputFieldProps}
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
  </View>
);
