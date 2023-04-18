import { texts } from "../../texts";
import { useEffect, useState } from "react";
import Login from "./layout";
import TextField from "../../components/Fields/TextField";
import {
  emailFieldType,
  passwordFieldType,
} from "../../components/Fields/constants";

const fieldTexts = texts.Fields;

export default function LoginContainer({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [mailError, setMailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const resetFieldValues = () => {
    setMailError("");
    setPasswordError("");
    setEmail("");
    setPassword("");
  };

  const handleSubmitPress = () => {
    setMailError("");
    setPasswordError("");
    if (!email) {
      setMailError("Email obligatorio");
      return;
    }
    if (!password) {
      setPasswordError("Contraseña obligatoria");
      return;
    }
    setLoading(true);
  };

  const handleRegister = (navigation) => {
    navigation.navigate(texts.Register.name);
  };
  const handleForgotPassword = () =>
    alert("Redirección a la vista de forgot password!");

  const handleOnEmailChange = (userMail) => setEmail(userMail);
  const handleOnPasswordChange = (password) => setPassword(password);

  const fields = [
    <TextField
      error={mailError}
      keyboardType={emailFieldType}
      onChangeText={handleOnEmailChange}
      placeholder={fieldTexts.emailOrUserPlaceholder}
      title={fieldTexts.emailOrUserTitle}
    />,
    <TextField
      error={passwordError}
      keyboardType={passwordFieldType}
      onChangeText={handleOnPasswordChange}
      placeholder={fieldTexts.passwordPlaceholder}
      title={fieldTexts.passwordTitle}
    />,
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
