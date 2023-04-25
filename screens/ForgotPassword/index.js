import { texts } from "../../texts";
import { useState } from "react";
import {
    emailFieldType
} from "../../components/Fields/constants";
import TextField from "../../components/Fields/TextField";
import ForgotPassword from "./layout";
import {Alert} from "react-native";
const fieldTexts = texts.Fields;
import {sendPasswordResetEmail } from 'firebase/auth';
import {auth} from '../../firebaseConfig'

export default function ForgotPasswordContainer({ navigation }) {
    const [loading, setLoading] = useState(false);
    const [mailError, setMailError] = useState("");
    const [email, setEmail] = useState("");

    const resetFieldValues = () => {
        setMailError("");
        setEmail("");
    };

    const handleSubmitPress = async () => {
        setMailError("");
        if (!email) {
            setMailError("Email obligatorio");
            return;
        }
        setLoading(true);
        try{
            await sendPasswordResetEmail(auth, email)
        } catch (error) {
            setMailError("El email no tiene asociada una cuenta")
            setLoading(false)
            return;
        }
        Alert.alert("Recupero de contraseña", "Se te envio un mail con instruccione para recuperar la contraseña");
        navigation.navigate(texts.Login.name);
        setLoading(false)
    };

    const handleOnEmailChange = (userMail) => setEmail(userMail);

    const fields = [
        <TextField
            error={mailError}
            keyboardType={emailFieldType}
            onChangeText={handleOnEmailChange}
            placeholder={fieldTexts.emailPlaceholder}
            title={fieldTexts.emailTitle}
        />
    ];

    return (
        <ForgotPassword
            fields={fields}
            handleSubmitPress={handleSubmitPress}
            loading={loading}
        />
    );
}