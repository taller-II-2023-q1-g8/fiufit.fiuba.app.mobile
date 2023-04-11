import NameField from "../../components/Fields/NameField";
import EmailField from "../../components/Fields/EmailField";
import PasswordField from "../../components/Fields/PasswordField";

export const ANameField = (onChangeText, nameError) => (
  <NameField onChangeText={onChangeText} nameError={nameError} />
);

export const AEmailField = (onChangeText, onSubmitEditing, mailError) => (
  <EmailField
    onChangeText={onChangeText}
    onSubmitEditing={onSubmitEditing}
    mailError={mailError}
  />
);

export const APasswordField = (
  onChangeText,
  ref,
  hidePassword,
  handlePasswordVisibility,
  passwordError
) => (
  <PasswordField
    onChangeText={onChangeText}
    ref={ref}
    hidePassword={hidePassword}
    handlePasswordVisibility={handlePasswordVisibility}
    passwordError={passwordError}
  />
);
