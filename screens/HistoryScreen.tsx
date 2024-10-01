import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useStore } from "../store/store";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { StatusBar } from "expo-status-bar";
import { COLORS } from "../theme/theme";
import HeaderBar from "../components/HeaderBar";

const HistoryScreen = () => {
  const workoutHistory = useStore((state: any) => state.UserWorkouts);
  const tabBarHeight = useBottomTabBarHeight();
  console.log("workout history", workoutHistory);
  return (
    <View style={styles.ScreenContainer}>
      <StatusBar backgroundColor={COLORS.black} style="light" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ScrollViewFlex}
      >
        <View style={[styles.ScrollViewInner, { marginBottom: tabBarHeight }]}>
          <View style={styles.ItemContainer}>
            <HeaderBar title="Workout History" />
            {workoutHistory.length > 0 ? (
              <View style={styles.ListItemContainer}>
                <Text style={styles.NormalTextStyle}>Workouts available</Text>
              </View>
            ) : (
              <Text>No workouts yet</Text>
            )}
          </View>
        </View>
      </ScrollView>
      <Text>HistoryScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    backgroundColor: COLORS.black,
    padding: 3,
  },
  ScrollViewFlex: {
    flexGrow: 1,
  },
  ScrollViewInner: {
    flex: 1,
    justifyContent: "space-between",
  },
  ItemContainer: {
    flex: 1,
  },
  NormalTextStyle: {
    fontFamily: "inter",
    fontSize: 14,
    color: COLORS.white,
    fontWeight: "400",
  },
  ListItemContainer: {
    paddingHorizontal: 15,
    gap: 30,
  },
});

export default HistoryScreen;
