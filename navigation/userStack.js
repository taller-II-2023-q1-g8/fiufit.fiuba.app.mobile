import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from '../screens/Home';
import CoffeeAutonomous from "../screens/Profile";
import {texts} from "../texts";
import {colors} from "../colors";
import {StateProvider} from "../utils/state/state";

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
    const initialState = {
        user: { email: email,
                token: token}
    };
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
    return (
        <StateProvider initialState={initialState} reducer={reducer}>
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
                </Stack.Navigator>
            </NavigationContainer>
        </StateProvider>
    );
}