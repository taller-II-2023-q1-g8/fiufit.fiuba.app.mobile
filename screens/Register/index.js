import {
  emailFieldType,
  passwordFieldType,
  phoneFieldType,
} from "../../components/Fields/constants";
import { texts } from "../../texts";
import { useEffect, useState } from "react";
import DateField from "../../components/Fields/DateField";
import Register from "./layout";
import TextField from "../../components/Fields/TextField";
import SelectField from "../../components/Fields/SelectField";
import { Alert } from "react-native";

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
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");

  const resetErrors = () => {
    setBirthdateError("");
    setMailError("");
    setNameError("");
    setPasswordError("");
    setUsernameError("");
    setGenderError("");
    setPhoneError("");
  };

  const resetFieldValues = () => {
    setBirthdate("");
    setEmail("");
    setName("");
    setPassword("");
    setGender("");
    setUsername("");
    setPhone("");
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
      setMailError("Email obligatorio");
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
    if (!phone) {
      setPhoneError("Número de teléfono obligatorio");
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
            phone_number: phone,
            birth_date: birthdate,
            password: password,
          }),
        }
      );
      const json = await response.json();

      if (response.ok) {
        Alert.alert("Bienvenido", "Registro exitoso");
        navigation.navigate(texts.Login.name);
      } else Alert.alert("Error", "Intente nuevamente");
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const formatDate = (date) =>
    `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

  const handleRegister = () => alert("Redirección a la vista de registro!");
  const handleForgotPassword = () =>
    alert("Redirección a la vista de forgot password!");

  const handleOnBirthdateChange = (birthdate) =>
    setBirthdate(formatDate(birthdate));
  const handleOnEmailChange = (userMail) => setEmail(userMail);
  const handleOnGenderChange = (gender) => setGender(gender);
  const handleOnNameChange = (name) => setName(name);
  const handleOnPasswordChange = (password) => setPassword(password);
  const handleOnPhoneChange = (phone) => setPhone(phone);
  const handleOnUsernameChange = (username) => setUsername(username);

  const fields = [
    <TextField
      error={nameError}
      onChangeText={handleOnNameChange}
      placeholder={fieldTexts.namePlaceholder}
      title={fieldTexts.nameTitle}
    />,
    <TextField
      error={usernameError}
      onChangeText={handleOnUsernameChange}
      placeholder={fieldTexts.usernamePlaceholder}
      title={fieldTexts.usernameTitle}
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
    <SelectField
      error={genderError}
      onChangeText={handleOnGenderChange}
      title={fieldTexts.genderTitle}
    />,
    <TextField
      error={phoneError}
      keyboardType={phoneFieldType}
      onChangeText={handleOnPhoneChange}
      placeholder={fieldTexts.phonePlaceholder}
      title={fieldTexts.phoneTitle}
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
