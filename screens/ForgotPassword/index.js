import { texts } from "../../texts";
import { useState } from "react";
import {
    emailFieldType
} from "../../components/Fields/constants";
import TextField from "../../components/Fields/TextField";
import ForgotPassword from "./layout";

const fieldTexts = texts.Fields;

export default function ForgotPasswordContainer({ navigation }) {
    const [loading, setLoading] = useState(false);
    const [mailError, setMailError] = useState("");
    const [email, setEmail] = useState("");

    const resetFieldValues = () => {
        setMailError("");
        setEmail("");
    };

    const handleSubmitPress = () => {
        setMailError("");
        if (!email) {
            setMailError("Email obligatorio");
            return;
        }
        setLoading(true);
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