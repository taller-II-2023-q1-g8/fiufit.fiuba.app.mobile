import { createRef, useState } from "react";
import { EmailField, PasswordField } from "./constants";
import Login from "./layout";

export default function LoginContainer() {
  const [errorText, setErrorText] = useState("");
  const [hidePassword, setHidePassword] = useState(true);
  const [loading, setLoading] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const passwordInputRef = createRef();

  const handleSubmitPress = () => {
    setErrorText("");
    if (!userEmail) {
      setErrorText("Usuario obligatorio");
      return;
    }
    if (!userPassword) {
      setErrorText("Contraseña obligatoria");
      return;
    }
    setLoading(true);
  };

  const handlePasswordVisibility = () => setHidePassword(!hidePassword);

  const handleRegister = () => alert("Redirección a la vista de registro!");
  const handleForgotPassword = () =>
    alert("Redirección a la vista de forgot password!");

  const handleOnEmailChange = (userMail) => setUserEmail(userMail);
  const handleOnPasswordChange = (userPassword) => setUserPassword(userPassword);
  const onSubmitEditingEmail = () =>
    passwordInputRef.current && passwordInputRef.current.focus();

  const fields = [
    EmailField(handleOnEmailChange, onSubmitEditingEmail),
    PasswordField(
      handleOnPasswordChange,
      passwordInputRef,
      hidePassword,
      handlePasswordVisibility
    ),
  ];

  return (
    <Login
      errorText={errorText}
      fields={fields}
      handleForgotPassword={handleForgotPassword}
      handleRegister={handleRegister}
      handleSubmitPress={handleSubmitPress}
      loading={loading}
      shouldShowError={errorText != ""}
    />
  );
}
