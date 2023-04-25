import React, {useState} from 'react';
import {Alert, Text} from 'react-native';

import { useAuthentication } from '../../utils/hooks/useAuthentication';
import Home from "./layout";

import {signOut} from "firebase/auth";
import {auth} from '../../firebaseConfig'
import { useStateValue } from '../../utils/state/state';
import {texts} from "../../texts";

export default function HomeScreen({navigation}) {
    const [loading, setLoading] = useState(false);
    const [state, dispatch] = useStateValue();
    //ARREGLAR LO DE USE AUTHENTICATION QUE ESTA DUDOSISIMO
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
    const handleProfile = (navigation) => {
        navigation.navigate(texts.Profile.name);
    };
    const fields = [
        <Text>Welcome {state.user.email}!</Text>
    ];
    return (
        <Home
            fields={fields}
            handleSignOutPress={handleSignOutPress}
            handleProfile={() => handleProfile(navigation)}
            loading={loading}
        />
    );
}