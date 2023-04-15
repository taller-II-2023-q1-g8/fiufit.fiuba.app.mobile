import { createRef, useState } from "react";
import EmailField from "../../components/Fields/EmailField";
import NameField from "../../components/Fields/NameField";
import PasswordField from "../../components/Fields/PasswordField";
import Register from "./layout";

export default function RegisterContainer({ navigation }) {
  const [hidePassword, setHidePassword] = useState(true);
  const [loading, setLoading] = useState(false);
  const [mailError, setMailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [nameError, setNameError] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const passwordInputRef = createRef();

  const handleSubmitPress = async () => {
    setMailError("");
    setPasswordError("");
    setNameError("");
    if (!userName) {
      setNameError("Nombre obligatorio");
      return;
    }
    if (!userEmail) {
      setMailError("Usuario obligatorio");
      return;
    }
    if (!userPassword) {
      setPasswordError("Contraseña obligatoria");
      return;
    }
    setLoading(true);

    try {
      const response = await fetch(
        "https://api-gateway-k1nl.onrender.com/user",
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          mode: "cors",
          body: JSON.stringify({
            username: userEmail,
            firstname: userName,
            gender: "male",
            email: userEmail,
            phone_number: "123456789",
            birth_date: "1995-10-20",
            password: userPassword,
          }),
        }
      );
      const json = await response.json();
      console.log({ json });
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const handleRegister = () => alert("Redirección a la vista de registro!");
  const handleForgotPassword = () =>
    alert("Redirección a la vista de forgot password!");

  const handleOnNameChange = (userName) => setUserName(userName);
  const handleOnEmailChange = (userMail) => setUserEmail(userMail);
  const handleOnPasswordChange = (userPassword) =>
    setUserPassword(userPassword);

  const fields = [
    <NameField onChangeText={handleOnNameChange} error={nameError} />,
    <EmailField onChangeText={handleOnEmailChange} error={mailError} />,
    <PasswordField
      onChangeText={handleOnPasswordChange}
      error={passwordError}
    />,
  ];

  return (
    <Register
      fields={fields}
      handleForgotPassword={handleForgotPassword}
      handleRegister={handleRegister}
      handleSubmitPress={handleSubmitPress}
      loading={loading}
    />
  );
}
