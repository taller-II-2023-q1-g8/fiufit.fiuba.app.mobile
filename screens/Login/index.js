import { createRef, useState } from "react";
import { EmailField, PasswordField } from "./constants";
import Login from "./layout";

export default function LoginContainer({ navigation }) {
  const [passwordError, setPasswordError] = useState("");
  const [mailError, setMailError] = useState("");
  const [hidePassword, setHidePassword] = useState(true);
  const [loading, setLoading] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const passwordInputRef = createRef();

  const handleSubmitPress = () => {
    setMailError("");
    setPasswordError("");
    if (!userEmail) {
      setMailError("Usuario obligatorio");
      return;
    }
    if (!userPassword) {
      setPasswordError("Contraseña obligatoria");
      return;
    }
    setLoading(true);
  };

  const handlePasswordVisibility = () => setHidePassword(!hidePassword);

  const handleRegister = (navigation) => navigation.navigate("Register");
  const handleForgotPassword = () =>
    alert("Redirección a la vista de forgot password!");

  const handleOnEmailChange = (userMail) => setUserEmail(userMail);
  const handleOnPasswordChange = (userPassword) =>
    setUserPassword(userPassword);
  const onSubmitEditingEmail = () =>
    passwordInputRef.current && passwordInputRef.current.focus();

  const fields = [
    EmailField(handleOnEmailChange, onSubmitEditingEmail, mailError),
    PasswordField(
      handleOnPasswordChange,
      passwordInputRef,
      hidePassword,
      handlePasswordVisibility,
      passwordError
    ),
  ];

  return (
    <Login
      fields={fields}
      handleForgotPassword={handleForgotPassword}
      handleRegister={() => handleRegister(navigation)}
      handleSubmitPress={handleSubmitPress}
      loading={loading}
    />
  );
}
