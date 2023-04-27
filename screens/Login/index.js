import { texts } from "../../texts";
import { useEffect, useState } from "react";
import Login from "./layout";
import TextField from "../../components/Fields/TextField";
import {
  emailFieldType,
  passwordFieldType,
} from "../../components/Fields/constants";
import {Alert} from "react-native";
import {getAuth, signInWithEmailAndPassword} from "firebase/auth";
import {auth} from '../../firebaseConfig'
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

  const handleSubmitPress = async () => {
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
    try{
      //Se deberia encriptar la password
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      Alert.alert("Error", error.message)
    }
  setLoading(false)

  };
  const handleRegister = (navigation) => {
    navigation.navigate(texts.Register.name);
  };
  const handleForgotPassword = (navigation) => {
    navigation.navigate(texts.ForgotPassword.name);
  };

  const handleOnEmailChange = (userMail) => setEmail(userMail);
  const handleOnPasswordChange = (password) => setPassword(password);

  const fields = [
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
  ];

  return (
    <Login
      fields={fields}
      handleForgotPassword={() => handleForgotPassword(navigation)}
      handleRegister={() => handleRegister(navigation)}
      handleSubmitPress={handleSubmitPress}
      loading={loading}
    />
  );
}
