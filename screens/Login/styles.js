import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
  formContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 32,
    justifyContent: "center",
    paddingHorizontal: 32,
    paddingVertical: 16,
    width: "100%",
  },
  title: {
    alignSelf: "center",
    fontSize: 22,
    fontWeight: "500",
    paddingTop: 90,
  },
  fieldContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    padding: "0",
    gap: 12,
    width: "100%",
  },
  fieldTitle: {
    fontSize: 16,
    fontWeight: "400",
  },
  fieldInputContainer: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    border: "1px solid #C1C7D0",
    borderRadius: 4,
    display: "flex",
    flexDirection: "row",
    fontSize: 16,
    gap: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    width: "100%",
  },
  error: {
    border: "2px solid red",
  },
  errorText: {
    color: "red",
    fontWeight: "bold",
  },
  passwordInputContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  hidePasswordContainer: {
    position: "absolute",
    right: 10,
  },
  hidePasswordIcon: {
    width: 20,
    height: 20,
  },
  submitButton: {
    backgroundColor: "#6666FF",
    alignItems: "center",
    borderRadius: 4,
  },
  submitButtonText: {
    color: "white",
    paddingVertical: 8,
    fontSize: 16,
  },
  needAccountContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 8,
  },
  needAccountText: {
    fontSize: 16,
  },
  forgotPassword: {
    color: "#6666FF",
    fontSize: 16,
    fontWeight: "bold",
  },
  registerButton: {
    color: "#6666FF",
    fontSize: 16,
    fontWeight: "bold",
  },
  redirectionButtons: {
    gap: 16,
  },
});

export const scrollviewStyle = {
  flex: 1,
  borderRadius: 2,
};
