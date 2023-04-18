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

const loginTexts = texts.Login;

export default function Login({
  fields,
  handleForgotPassword,
  handleRegister,
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
          <Text style={styles.title}>{loginTexts.loginTitle}</Text>
          {fields.map((field, i) => (
            <View key={i}>{field}</View>
          ))}
          <TouchableOpacity
            style={styles.submitButton}
            activeOpacity={0.5}
            onPress={handleSubmitPress}
          >
            <Text style={styles.submitButtonText}>
              {loginTexts.submitButtonText}
            </Text>
          </TouchableOpacity>
          <View style={styles.redirectionButtons}>
            <Text style={styles.forgotPassword} onPress={handleForgotPassword}>
              {loginTexts.forgotYourPasswordQuestion}
            </Text>
            <View style={styles.needAccountContainer}>
              <Text style={styles.needAccountText}>
                {loginTexts.needAccount}
              </Text>
              <Text style={styles.registerButton} onPress={handleRegister}>
                {loginTexts.register}
              </Text>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
}
