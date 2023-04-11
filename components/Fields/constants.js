import { colors } from "../../colors";
import { styles } from "./styles";

export const nameFieldType = "text";
export const emailFieldType = "email-address";
export const passwordFieldType = "default";

export const EMAIL_FIELD_KEY = "email";
export const NAME_FIELD_KEY = "name";
export const PASSWORD_FIELD_KEY = "password";

export const commonFieldProps = (error) => ({
  placeholderTextColor: colors.placeholder,
  returnKeyType: "next",
  style: { ...styles.fieldInputContainer, ...(error && styles.error) },
  underlineColorAndroid: colors.onFieldFocus,
});
