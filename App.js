import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from "./screens/Login";
import Register from "./screens/Register";

const Stack = createNativeStackNavigator();

const defaultNavigationOptions = {
  title: "fiuFIT",
  headerTintColor: "white",
  headerTitleStyle: {
    fontWeight: "bold",
    alignSelf: "center",
  },
  headerTitleAlign: "center",
  headerStyle: {
    backgroundColor: "#6666FF",
  },
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          component={Login}
          name="Login"
          options={defaultNavigationOptions}
        />
        <Stack.Screen
          component={Register}
          name="Register"
          options={defaultNavigationOptions}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
