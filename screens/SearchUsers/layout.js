import { scrollviewStyle, styles } from "./styles";
import {
    KeyboardAvoidingView,
    ScrollView, Text,
    TouchableOpacity, View,
} from "react-native";
import { texts } from "../../texts";
import {StatusBar} from "expo-status-bar";
import Loader from "../../components/Loader";

const searchUserstext = texts.SearchUsers;

export default function SearchUsers({
                                userlist,
                                handleSearchPress,
                                searchTextField,
                             }) {
    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
                <KeyboardAvoidingView style={styles.formContainer} enabled>
                    <Text style={styles.title}>{searchUserstext.searchUsersTitle}</Text>
                    <View style={{
                        flexDirection: 'column',
                    }}>
                        {searchTextField.map((field, i) => (
                            <View key={i}>{field}</View>
                        ))}
                        <TouchableOpacity
                            style={styles.submitButton}
                            activeOpacity={0.5}
                            onPress={handleSearchPress}
                        >
                            <Text style={styles.username}>
                                {searchUserstext.submitButtonText}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    {userlist.map((field, i) => (
                        <View style={styles.userList} key={i}>{field}</View>
                    ))}
                </KeyboardAvoidingView>
        </View>
    );
}