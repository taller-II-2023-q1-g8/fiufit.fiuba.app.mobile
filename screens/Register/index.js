import {
  emailFieldType,
  passwordFieldType,
} from "../../components/Fields/constants";
import { texts } from "../../texts";
import { useEffect, useState } from "react";
import DateField from "../../components/Fields/DateField";
import Register from "./layout";
import TextField from "../../components/Fields/TextField";
import SelectField from "../../components/Fields/SelectField";

const fieldTexts = texts.Fields;

export default function RegisterContainer({ navigation }) {
  const [birthdate, setBirthdate] = useState("");
  const [birthdateError, setBirthdateError] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [genderError, setGenderError] = useState("");
  const [loading, setLoading] = useState(false);
  const [mailError, setMailError] = useState("");
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");

  const resetErrors = () => {
    setBirthdateError("");
    setMailError("");
    setNameError("");
    setPasswordError("");
    setUsernameError("");
    setGenderError("");
  };

  const resetFieldValues = () => {
    setBirthdate("");
    setEmail("");
    setName("");
    setPassword("");
    setGender("");
    setUsername("");
  };

  useEffect(() => {
    return () => {
      resetFieldValues();
      resetErrors();
    };
  }, []);

  const handleSubmitPress = async () => {
    resetErrors();
    if (!name) {
      setNameError("Nombre obligatorio");
      return;
    }
    if (!email) {
      setMailError("Usuario obligatorio");
      return;
    }
    if (!password) {
      setPasswordError("Contraseña obligatoria");
      return;
    }
    if (!birthdate) {
      setBirthdateError("Fecha de nacimiento obligatoria");
      return;
    }
    if (!username) {
      setUsernameError("Nombre de usuario obligatorio");
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
            username: username,
            firstname: name,
            gender: gender,
            email: email,
            phone_number: "123456789",
            birth_date: birthdate,
            password: password,
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

  const formatDate = (date) =>
    `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

  const handleRegister = () => alert("Redirección a la vista de registro!");
  const handleForgotPassword = () =>
    alert("Redirección a la vista de forgot password!");

  const handleOnNameChange = (name) => setName(name);
  const handleOnEmailChange = (userMail) => setEmail(userMail);
  const handleOnPasswordChange = (password) => setPassword(password);
  const handleOnBirthdateChange = (birthdate) =>
    setBirthdate(formatDate(birthdate));
  const handleOnUsernameChange = (username) => setUsername(username);
  const handleOnGenderChange = (gender) => setGender(gender);
  const fields = [
    <TextField
      error={nameError}
      onChangeText={handleOnNameChange}
      placeholder={fieldTexts.namePlaceholder}
      title={fieldTexts.nameTitle}
    />,
    <TextField
      error={mailError}
      keyboardType={emailFieldType}
      onChangeText={handleOnEmailChange}
      placeholder={fieldTexts.emailPlaceholder}
      title={fieldTexts.emailTitle}
    />,
    <TextField
      error={passwordError}
      keyboardType={passwordFieldType}
      onChangeText={handleOnPasswordChange}
      placeholder={fieldTexts.passwordPlaceholder}
      title={fieldTexts.passwordTitle}
    />,
    <DateField error={birthdateError} onChangeText={handleOnBirthdateChange} />,
    <TextField
      error={usernameError}
      onChangeText={handleOnUsernameChange}
      placeholder={fieldTexts.usernamePlaceholder}
      title={fieldTexts.usernameTitle}
    />,
    <SelectField
      error={genderError}
      onChangeText={handleOnGenderChange}
      title={fieldTexts.genderTitle}
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
