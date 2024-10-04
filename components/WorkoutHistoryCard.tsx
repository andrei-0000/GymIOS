import React from "react";
import { Dimensions, View, Text, StyleSheet } from "react-native";
import { COLORS } from "../theme/theme";
import { Workout } from "../data/data";

const CARD_WIDTH = Dimensions.get("window").width * 0.98;

interface WorkoutHistoryCardProps {
  workout: Workout;
}

function WorkoutHistoryCard({ workout }: WorkoutHistoryCardProps) {
  const { id, name, exercises, date: dateString } = workout;
  const date = dateString ? new Date(dateString) : new Date();

  return (
    <View style={styles.card}>
      <View style={styles.HeaderContainer}>
        <Text style={styles.HeaderTextStyle}>{name}</Text>
        <Text style={styles.SmallTextStyle}>
          {!isNaN(date.getTime())
            ? date.toLocaleDateString("en-gb", {
                weekday: "short",
                month: "long",
                day: "numeric",
                year: "numeric",
              })
            : "Invalid Date"}
        </Text>
      </View>
      <Text numberOfLines={1} style={styles.NormalTextStyle}>
        {exercises?.map((exercise) => exercise.name).join(" | ")}
      </Text>
      <Text style={styles.MoreTextStyle}>465kcal</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.cardGrey,
    width: CARD_WIDTH,
    padding: 20,
    gap: 20,
    marginVertical: 10,
    borderRadius: 20,
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  HeaderContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  HeaderTextStyle: {
    fontFamily: "inter",
    fontSize: 20,
    color: COLORS.white,
    paddingHorizontal: 0,
    paddingTop: 0,
    fontWeight: "bold",
    marginBottom: 0,
    flex: 4,
  },
  NormalTextStyle: {
    fontFamily: "inter",
    flex: 1,
    fontSize: 14,
    color: COLORS.white,
    fontWeight: "400",
  },
  SmallTextStyle: {
    fontFamily: "inter",
    fontSize: 12,
    color: COLORS.seaBlue,
    flex: 3,
  },
  MoreTextStyle: {
    fontFamily: "inter",
    fontSize: 14,
    color: COLORS.brightGreen,
    fontWeight: "bold",
  },
});

export default WorkoutHistoryCard;
