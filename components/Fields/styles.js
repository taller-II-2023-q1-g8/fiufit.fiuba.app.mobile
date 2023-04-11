import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
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
});
