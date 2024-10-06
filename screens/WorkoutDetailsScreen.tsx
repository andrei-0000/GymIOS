import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS } from "../theme/theme";
import { StatusBar } from "expo-status-bar";
import { useStore } from "../store/store";
import WorkoutCard from "../components/WorkoutCard";

function WorkoutDetailsScreen({ navigation }: any) {
  const workout = useStore((state: any) => state.FocusedWorkout);
  console.log("WorkoutDetailsScreen", workout);
  return (
    <View style={styles.ScreenContainer}>
      <StatusBar backgroundColor={COLORS.black} style="light" />

      <View style={styles.ItemContainer}>
        <WorkoutCard
          id={workout.id}
          name={workout.name}
          exercises={workout.exercises}
          date={workout.date}
        ></WorkoutCard>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    backgroundColor: COLORS.black,
    padding: 3,
  },
  ScrollViewFlex: {
    flexGrow: 1,
  },
  ItemContainer: {
    flex: 1,
    marginVertical: 80,
  },
});

export default WorkoutDetailsScreen;
