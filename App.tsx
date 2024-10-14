import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import HistoryScreen from "./screens/HistoryScreen";
import TabNavigator from "./navigators/TabNavigator";
import { useEffect } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import WorkoutDetailsScreen from "./screens/WorkoutDetailsScreen";
import awsGetSecret from "./external/aws/SecretsManager";

const Stack = createNativeStackNavigator();

export default function App() {
  const [loaded, error] = useFonts({
    "eurostile-normal": require("./assets/fonts/eurostile-normal.ttf"),
    inter: require("./assets/fonts/Inter_24pt-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  useEffect(() => {
    const fetchApiKey = async () => {
      const key = await awsGetSecret();
      console.log("here is the key" + key);
    };
    fetchApiKey();
  }, []);

  if (!loaded && !error) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="Tab"
          component={TabNavigator}
          options={{ animation: "slide_from_bottom" }}
        ></Stack.Screen>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ animation: "slide_from_bottom" }}
        ></Stack.Screen>
        <Stack.Screen
          name="History"
          component={HistoryScreen}
          options={{ animation: "slide_from_bottom" }}
        ></Stack.Screen>
        <Stack.Screen
          name="WorkoutDetails"
          component={WorkoutDetailsScreen}
          options={{ animation: "slide_from_bottom" }}
        ></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  boxy: {
    width: 150,
    height: 150,
    backgroundColor: "green",
    borderColor: "black",
    borderRadius: 4,
    borderWidth: 2,
  },
});
