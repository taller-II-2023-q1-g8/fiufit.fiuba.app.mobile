import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from "./screens/Login";
import Register from "./screens/Register";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen component={Login} name="Login" options={{ title: "" }} />
        <Stack.Screen
          component={Register}
          name="Register"
          options={{ title: "" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
