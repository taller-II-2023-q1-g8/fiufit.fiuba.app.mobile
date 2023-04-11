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
    paddingTop: 30,
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
});

export const scrollviewStyle = {
  flex: 1,
  borderRadius: 2,
};
