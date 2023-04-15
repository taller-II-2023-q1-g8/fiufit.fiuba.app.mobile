import { texts } from "../../texts";
import { useState } from "react";
import EmailField from "../../components/Fields/EmailField";
import Login from "./layout";
import PasswordField from "../../components/Fields/PasswordField";
import { EMAIL_FIELD_KEY, PASSWORD_FIELD_KEY } from "../../components/Fields/constants";

export default function LoginContainer({ navigation }) {
  const [passwordError, setPasswordError] = useState("");
  const [mailError, setMailError] = useState("");
  const [loading, setLoading] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

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

  const handleRegister = (navigation) =>
    navigation.navigate(texts.Register.name);
  const handleForgotPassword = () =>
    alert("Redirección a la vista de forgot password!");

  const handleOnEmailChange = (userMail) => setUserEmail(userMail);
  const handleOnPasswordChange = (userPassword) =>
    setUserPassword(userPassword);

  const fields = [
    <EmailField key={EMAIL_FIELD_KEY} onChangeText={handleOnEmailChange} error={mailError} />,
    <PasswordField key={PASSWORD_FIELD_KEY} onChangeText={handleOnPasswordChange} error={passwordError} />,
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
