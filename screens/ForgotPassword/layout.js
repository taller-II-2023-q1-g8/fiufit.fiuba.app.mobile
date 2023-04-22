import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import { scrollviewStyle, styles } from "./styles";
import {
    KeyboardAvoidingView,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import Loader from "../../components/Loader";
import { texts } from "../../texts";

const forgotPasswordTexts = texts.ForgotPassword;

export default function ForgotPassword({
                                  fields,
                                  handleSubmitPress,
                                  loading,
                              }) {
    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <Loader loading={loading} />
            <ScrollView
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={scrollviewStyle}
            >
                <KeyboardAvoidingView style={styles.formContainer} enabled>
                    <Text style={styles.title}>{forgotPasswordTexts.forgotPasswordTitle}</Text>
                    {fields.map((field, i) => (
                        <View key={i}>{field}</View>
                    ))}
                    <TouchableOpacity
                        style={styles.submitButton}
                        activeOpacity={0.5}
                        onPress={handleSubmitPress}
                    >
                        <Text style={styles.submitButtonText}>
                            {forgotPasswordTexts.submitButtonText}
                        </Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </ScrollView>
        </View>
    );
}