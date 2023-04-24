import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from '../screens/Home';
import {texts} from "../texts";
import {colors} from "../colors";

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

export default function UserStack() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    component={HomeScreen}
                    name={texts.Home.name}
                    options={defaultNavigationOptions}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}