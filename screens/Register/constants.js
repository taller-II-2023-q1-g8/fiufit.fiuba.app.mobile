import NameField from "../../components/Fields/NameField";
import EmailField from "../../components/Fields/EmailField";
import PasswordField from "../../components/Fields/PasswordField";

export const ANameField = (onChangeText, nameError) => (
  <NameField onChangeText={onChangeText} error={nameError} />
);

export const AEmailField = (onChangeText, mailError) => (
  <EmailField onChangeText={onChangeText} error={mailError} />
);

export const APasswordField = (onChangeText, passwordError) => (
  <PasswordField onChangeText={onChangeText} error={passwordError} />
);
