import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  Dimensions,
} from "react-native";
import React from "react";
import { useStore } from "../store/store";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { StatusBar } from "expo-status-bar";
import { COLORS } from "../theme/theme";
import HeaderBar from "../components/HeaderBar";
import WorkoutHistoryCard from "../components/WorkoutHistoryCard";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";

const CALENDAR_HEIGHT = Dimensions.get("window").height * 0.4;

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

  const workedOutDates: any = {};
  workoutHistory.forEach((workout: any) => {
    const date = new Date(workout.date);
    const splitDate =
      date.getFullYear() +
      "-" +
      String(date.getMonth() + 1).padStart(2, "0") +
      "-" +
      String(date.getDate()).padStart(2, "0");
    if (!isNaN(date.getTime()) && !workedOutDates.hasOwnProperty(splitDate)) {
      workedOutDates[splitDate] = {
        selected: true,
        selectedColor: COLORS.brightGreen,
      };
    }
  });

  const currentDate = () => {
    const date = new Date();
    const splitDate =
      date.getFullYear() +
      "-" +
      String(date.getMonth() + 1).padStart(2, "0") +
      "-" +
      String(date.getDate() + 1).padStart(2, "0");
    console.log("now date: ", splitDate);
    return splitDate;
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
          <Calendar
            enableSwipeMonths={true}
            style={styles.CalendarStyle}
            theme={{
              backgroundColor: COLORS.black,
              calendarBackground: COLORS.black,
              textSectionTitleColor: COLORS.lightGrey,
              selectedDayTextColor: COLORS.black,
              dayTextColor: COLORS.white,
              arrowColor: COLORS.white,
              monthTextColor: COLORS.white,
              textMonthFontWeight: "bold",
              textMonthFontSize: 18,
            }}
            onDayPress={(day: any) => {
              console.log("selected day", day);
            }}
            markedDates={workedOutDates}
          />
          <TouchableOpacity
            onPress={() => {
              confirmClearHistory();
            }}
          >
            <View style={[styles.ClearIcon, { flex: 2 }]}>
              <Ionicons name="close-circle-outline" size={40} color="white" />
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
    alignSelf: "center",
    paddingHorizontal: 0,
    gap: 0,
  },
  CalendarStyle: {
    marginTop: 5,
    borderWidth: 0,
    borderRadius: 20,
    borderColor: "white",
    height: CALENDAR_HEIGHT - 25,
  },
});

export default HistoryScreen;
