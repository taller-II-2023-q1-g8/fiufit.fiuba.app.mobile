import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import { scrollviewStyle, styles } from "./styles";
import {
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
} from "react-native-web";
import Loader from "../Loader";
import {
  loginTItle,
  needAccount,
  register,
  submitButtonText,
} from "./constants";
import { texts } from "../../texts";

const ErrorLabel = (errorText) => (
  <Text style={styles.errorTextStyle}>{errorText}</Text>
);

const loginTexts = texts.Login;

export default function Login({
  errorText,
  fields,
  handleForgotPassword,
  handleRegister,
  handleSubmitPress,
  loading,
  shouldShowError,
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
          {fields.map((field) => field)}
          {shouldShowError ? ErrorLabel(errorText) : null}
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
