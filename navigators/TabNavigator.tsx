import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import TrainingScreen from "../screens/TrainingScreen";
import HistoryScreen from "../screens/HistoryScreen";
import { COLORS } from "../theme/theme";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Colors } from "react-native/Libraries/NewAppScreen";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBarStyle,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={focused ? 25 : 20}
              color={focused ? COLORS.seaBlue : "white"}
            />
          ),
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="Training"
        component={TrainingScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "barbell" : "barbell-outline"}
              size={focused ? 25 : 20}
              color={focused ? COLORS.seaBlue : "white"}
            />
          ),
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="History"
        component={HistoryScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "bookmark" : "bookmark-outline"}
              size={focused ? 25 : 20}
              color={focused ? COLORS.seaBlue : "white"}
            />
          ),
        }}
      ></Tab.Screen>
    </Tab.Navigator>
  );
};

export default TabNavigator;

const styles = StyleSheet.create({
  tabBarStyle: {
    height: 80,
    position: "absolute",
    backgroundColor: COLORS.black,
    borderTopWidth: 0,
    elevation: 0,
    borderTopColor: "transparent",
    borderRadius: 0,
  },
});
