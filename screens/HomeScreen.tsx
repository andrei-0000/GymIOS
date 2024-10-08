import { FlatList, ScrollView, StyleSheet, View } from "react-native";
import React from "react";
import { useStore } from "../store/store";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { COLORS } from "../theme/theme";
import { StatusBar } from "expo-status-bar";
import HeaderBar from "../components/HeaderBar";
import WeekBar from "../components/WeekBar";
import WorkoutCard from "../components/WorkoutCard";

const HomeScreen = () => {
  const userExercises = useStore((state: any) => state.ExerciseList);
  const userWorkouts = useStore((state: any) => {
    const workoutList = state.UserWorkouts;

    const lastW1Workout = workoutList
      .filter((workout: any) => workout.id === "W1")
      .slice(-1)[0];

    const lastW2Workout = workoutList
      .filter((workout: any) => workout.id === "W2")
      .slice(-1)[0];

    return [lastW1Workout, lastW2Workout].filter(Boolean);
  });
  const tabBarHeight = useBottomTabBarHeight();

  console.log("user workout 1", userWorkouts.slice(-2)[0]);
  console.log("user workout 2", userWorkouts.slice(-2)[1]);
  console.log("user exercises", userExercises);

  return (
    <View style={styles.ScreenContainer}>
      <StatusBar backgroundColor={COLORS.black} style="light"></StatusBar>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ScrollViewFlex}
      >
        <HeaderBar title="Hello, Ibai" />
        <WeekBar></WeekBar>
        <FlatList
          scrollEnabled={false}
          showsHorizontalScrollIndicator={false}
          data={userWorkouts}
          contentContainerStyle={[
            styles.FlatListContainer,
            { marginBottom: tabBarHeight * 1.5 },
          ]}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            return (
              <WorkoutCard
                id={item.id}
                name={item.name}
                exercises={item.exercises}
                date={item.date}
              ></WorkoutCard>
            );
          }}
        />
      </ScrollView>
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
  FlatListContainer: {
    gap: 9,
    paddingVertical: 20,
    paddingHorizontal: 0,
  },
});

export default HomeScreen;
