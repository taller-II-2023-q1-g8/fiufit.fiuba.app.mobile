import React, {useState} from 'react';
import {Alert, Text} from 'react-native';

import { useAuthentication } from '../../utils/hooks/useAuthentication';
import Home from "./layout";

import {getAuth, signOut} from "firebase/auth";
const auth = getAuth();

export default function HomeScreen({navigation}) {
    const [loading, setLoading] = useState(false);

    const handleSignOutPress = async () => {
        setLoading(true);
        try{
            await signOut(auth)
        } catch (error) {
            setLoading(false)
            return;
        }
        Alert.alert("Log out", "Saliste correctamente");
        setLoading(false)
    };
    const { user } = useAuthentication();
    const fields = [
        <Text>Welcome {user?.email}!</Text>
    ];
    return (
        <Home
            fields={fields}
            handleSignOutPress={handleSignOutPress}
            loading={loading}
        />
    );
}