import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useAuthentication } from '../../utils/hooks/useAuthentication';

export default function HomeScreen() {
    const { user } = useAuthentication();

    return (
        <View style={styles.container}>
            <Text>Welcome {user?.email}!</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        marginTop: 10
    }
});