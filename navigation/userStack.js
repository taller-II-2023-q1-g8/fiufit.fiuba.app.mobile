import React, {useEffect, useState} from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from '../screens/Home';
import CoffeeAutonomous from "../screens/Profile";
import {texts} from "../texts";
import {colors} from "../colors";
import {StateProvider} from "../utils/state/state";
import {Text, View} from "react-native";
import SearchUsersScreen from "../screens/SearchUsers";

const appTexts = texts.App;
const Stack = createNativeStackNavigator();

const defaultNavigationOptions = {
    title: appTexts.headerTitle,
    headerTintColor: "white",
    headerTitleStyle: {
        fontWeight: "bold",
        alignSelf: "center",
    },
    headerTitleAlign: "center",
    headerStyle: {
        backgroundColor: colors.purple,
    },
};

export default function UserStack({email, token}) {

    //Token es una promise, hay que ejecutarla en algun momento
    //Cargar aca el usuario en initial state y ejecutar la token promise
    //Para tener el token de validacion para hacer requests
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchUser = async () => {
        const response = await fetch(
            "https://api-gateway-k1nl.onrender.com/user?email=" + email,
            {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                mode: "cors",
            }
        );
        const json = await response.json();
        console.log(json.message)
        const initialState = {
            user: json.message
        };
        setData(initialState);
        setLoading(false);
    };
    useEffect(() => {
        fetchUser();
    }, []);

    const reducer = (state, action) => {
        switch (action.type) {
            case 'changeUser':
                return {
                    ...state,
                    user: action.newUser
                };
            default:
                return state;
        }
    };
    return loading? (<View><Text> Loading... </Text></View>) :(
        <StateProvider initialState={data} reducer={reducer}>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen
                        component={HomeScreen}
                        name={texts.Home.name}
                        options={defaultNavigationOptions}
                    />
                    <Stack.Screen
                        component={CoffeeAutonomous}
                        name={texts.Profile.name}
                        options={defaultNavigationOptions}
                    />
                    <Stack.Screen
                        component={SearchUsersScreen}
                        name={texts.SearchUsers.name}
                        options={defaultNavigationOptions}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </StateProvider>
    );
}