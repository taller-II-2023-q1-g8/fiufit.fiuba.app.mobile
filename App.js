import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from "./screens/Login";
import Register from "./screens/Register";
import { texts } from "./texts";
import { colors } from "./colors";

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

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          component={Login}
          name={texts.Login.name}
          options={defaultNavigationOptions}
        />
        <Stack.Screen
          component={Register}
          name={texts.Register.name}
          options={defaultNavigationOptions}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
