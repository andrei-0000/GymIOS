import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { useStore } from "../store/store";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { COLORS } from "../theme/theme";
import { StatusBar } from "expo-status-bar";
import HeaderBar from "../components/HeaderBar";
import WeekBar from "../components/WeekBar";
import { WorkoutData } from "../data/data";
import WorkoutCard from "../components/WorkoutCard";

const HomeScreen = () => {
  const ExerciseList = useStore((state: any) => state.ExerciseList);
  const workoutList = useStore((state: any) => state.WorkoutList);
  const tabBarHeight = useBottomTabBarHeight();

  console.log(workoutList);

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
          horizontal
          showsVerticalScrollIndicator={false}
          data={workoutList}
          contentContainerStyle={styles.FlatListContainer}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            console.log(item.id);
            return (
              <TouchableOpacity>
                <WorkoutCard id={item.id} name={item.name}></WorkoutCard>
              </TouchableOpacity>
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
  },
  ScrollViewFlex: {
    flexGrow: 1,
  },
  FlatListContainer: {
    gap: 20,
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
});

export default HomeScreen;
