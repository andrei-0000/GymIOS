import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import React from "react";
import { useStore } from "../store/store";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { StatusBar } from "expo-status-bar";
import { COLORS } from "../theme/theme";
import HeaderBar from "../components/HeaderBar";
import WorkoutHistoryCard from "../components/WorkoutHistoryCard";
import Ionicons from "@expo/vector-icons/Ionicons";

const HistoryScreen = ({ navigation }: any) => {
  const workoutHistory = useStore((state: any) => state.UserWorkouts);
  const clearWorkoutHistory = useStore(
    (state: any) => state.clearWorkoutHistory
  );
  const tabBarHeight = useBottomTabBarHeight();
  const setFocusedWorkout = useStore((state: any) => state.setFocusedWorkout);
  const confirmClearHistory = () => {
    Alert.alert(
      "Warning",
      "Are you sure you want to clear your workout history?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => {
            clearWorkoutHistory();
          },
        },
      ]
    );
  };

  return (
    <View style={styles.ScreenContainer}>
      <StatusBar backgroundColor={COLORS.black} style="light" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.ScrollViewFlex]}
        style={{ marginBottom: tabBarHeight }}
      >
        <HeaderBar title="Workout History" />
        <View style={[styles.ScrollViewInner, { marginTop: 35 }]}>
          <TouchableOpacity
            onPress={() => {
              confirmClearHistory();
            }}
          >
            <View style={[styles.ClearIcon, { flex: 2 }]}>
              <Ionicons name="close-circle-outline" size={30} color="white" />
            </View>
          </TouchableOpacity>
          <View style={styles.ItemContainer}>
            {workoutHistory.length > 0 ? (
              <View style={styles.ListItemContainer}>
                {workoutHistory
                  .toReversed()
                  .map((workout: any, index: number) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => {
                        setFocusedWorkout(workout);
                        navigation.push("WorkoutDetails");
                      }}
                    >
                      <WorkoutHistoryCard key={index} workout={workout} />
                    </TouchableOpacity>
                  ))}
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
    paddingHorizontal: 0,
    gap: 0,
  },
  ClearIcon: {
    alignSelf: "flex-end",
    paddingHorizontal: 0,
    gap: 0,
  },
});

export default HistoryScreen;
