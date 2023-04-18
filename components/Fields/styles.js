import { StyleSheet } from "react-native";
import { colors } from "../../colors";

export const styles = StyleSheet.create({
  fieldContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    padding: 0,
    // gap: 12,
    width: "100%",
    marginBottom: 24, //because of gap not working :/
  },
  fieldTitle: {
    fontSize: 16,
    fontWeight: "400",
    marginBottom: 12, //because of gap not working :/
  },
  fieldInputContainer: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderColor: "#C1C7D0",
    borderRadius: 4,
    borderWidth: 1,
    display: "flex",
    flexDirection: "row",
    fontSize: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    width: "100%",
  },
  error: {
    borderColor: "#CC3300",
    borderWidth: 2,
  },
  errorTitle: {
    color: colors.error,
    fontWeight: "bold",
  },
  errorDescription: {
    color: colors.error,
    marginTop: 12,
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
});
