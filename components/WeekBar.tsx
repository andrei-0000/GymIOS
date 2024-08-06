import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS } from "../theme/theme";
import Ionicons from "@expo/vector-icons/Ionicons";

interface WeekBarProps {
  title?: string;
}

interface WeekDayProps {
  status: string;
  day: string;
}

const WeekDay = ({ status, day }: WeekDayProps) => {
  switch (status) {
    case "todo":
      return (
        <View style={styles.TodoWeekIcon}>
          <Text>{day}</Text>
        </View>
      );
    case "done":
      return (
        <View style={styles.DoneWeekIcon}>
          <Ionicons name="checkmark" size={20} color="black" />
        </View>
      );
    case "current":
      return (
        <View style={styles.CurrentWeekIcon}>
          <Text>{day}</Text>
        </View>
      );
    default:
      return <View style={styles.TodoWeekIcon} />;
  }
};

function WeekBar({ title }: WeekBarProps) {
  return (
    <View style={styles.WeekBarContainer}>
      <WeekDay status="done" day="M" />
      <WeekDay status="done" day="T" />
      <WeekDay status="current" day="W" />
      <WeekDay status="todo" day="T" />
      <WeekDay status="todo" day="F" />
      <WeekDay status="todo" day="S" />
      <WeekDay status="todo" day="S" />
    </View>
  );
}

const styles = StyleSheet.create({
  WeekBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 3,
  },
  TodoWeekIcon: {
    height: 40,
    width: 40,
    borderRadius: 40,
    borderWidth: 0,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    backgroundColor: COLORS.white,
  },
  DoneWeekIcon: {
    height: 40,
    width: 40,
    borderRadius: 40,
    borderWidth: 0,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    backgroundColor: COLORS.seaBlue,
  },
  CurrentWeekIcon: {
    height: 40,
    width: 40,
    borderRadius: 40,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    borderColor: COLORS.seaBlue,
    backgroundColor: COLORS.white,
  },
});

export default WeekBar;
