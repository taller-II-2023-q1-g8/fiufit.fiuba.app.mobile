import { scrollviewStyle, styles } from "./styles";
import {
    KeyboardAvoidingView,
    ScrollView, Text,
    TouchableOpacity, View,
} from "react-native";
import { texts } from "../../texts";
import {StatusBar} from "expo-status-bar";
import Loader from "../../components/Loader";

const homeTexts = texts.Home;

export default function Home({
                                fields,
                                handleSignOutPress,
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
                    <Text style={styles.title}>{homeTexts.homeTitle}</Text>
                    {fields.map((field, i) => (
                        <View key={i}>{field}</View>
                    ))}
                    <TouchableOpacity
                        style={styles.submitButton}
                        activeOpacity={0.5}
                        onPress={handleSignOutPress}
                    >
                        <Text style={styles.submitButtonText}>
                            {homeTexts.submitButtonText}
                        </Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </ScrollView>
        </View>
    );
}