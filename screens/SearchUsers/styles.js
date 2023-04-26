import { StyleSheet } from "react-native";
import { colors } from "../../colors";

export const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
    },
    formContainer: {
        display: "flex",
        flexDirection: "column",
        // gap: 24,
        justifyContent: "center",
        paddingHorizontal: 32,
        paddingVertical: 16,
        width: "100%",
    },
    usernameContainer: {
        backgroundColor: colors.purple,
        alignItems: "center",
        borderRadius: 4,
        marginBottom: 24, //because of gap not working :/
    },
    username: {
        color: "white",
        paddingVertical: 8,
        fontSize: 24,
    },
    submitButton: {
        backgroundColor: colors.purple,
        alignItems: "center",
        borderRadius: 4,
        marginBottom: 24, //because of gap not working :/
    },
    title: {
        alignSelf: "center",
        fontSize: 22,
        fontWeight: "500",
        paddingTop: 20,
        marginBottom: 24, //because of gap not working :/
    },
    userList: {
        borderWidth: 5,
    }
});

export const scrollviewStyle = {
    flex: 1,
    borderRadius: 2,
};
