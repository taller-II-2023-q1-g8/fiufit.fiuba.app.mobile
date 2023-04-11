import EmailField from "../../components/Fields/EmailField";
import PasswordField from "../../components/Fields/PasswordField";

export const AEmailField = (onChangeText, mailError) => (
  <EmailField onChangeText={onChangeText} error={mailError} />
);

export const APasswordField = (onChangeText, passwordError) => (
  <PasswordField onChangeText={onChangeText} error={passwordError} />
);
