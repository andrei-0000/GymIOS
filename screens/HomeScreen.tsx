import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useStore } from "../store/store";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { COLORS } from "../theme/theme";
import { StatusBar } from "expo-status-bar";
import HeaderBar from "../components/HeaderBar";

const HomeScreen = () => {
  const ExerciseList = useStore((state: any) => state.ExerciseList);
  const tabBarHeight = useBottomTabBarHeight();

  return (
    <View style={styles.ScreenContainer}>
      <StatusBar backgroundColor={COLORS.black} style="light"></StatusBar>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ScrollViewFlex}
      >
        <HeaderBar title="Hello, Ibai" />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    backgroundColor: COLORS.black,
  },
  ScrollViewFlex: {
    flexGrow: 1,
  },
});

export default HomeScreen;
