import React, { useEffect, useState } from "react";
import { Dimensions, View, Text, StyleSheet } from "react-native";
import { COLORS } from "../theme/theme";
import { Workout } from "../data/data";
import Ionicons from "@expo/vector-icons/Ionicons";
import axios from "axios";

const CARD_WIDTH = Dimensions.get("window").width * 0.98;

interface WorkoutHistoryCardProps {
  workout: Workout;
}

function WorkoutHistoryCard({ workout }: WorkoutHistoryCardProps) {
  const { id, name, exercises, date: dateString } = workout;
  const date = dateString ? new Date(dateString) : new Date();
  const [calories, setCalories] = useState(0);

  useEffect(() => {
    const fetchCalories = async () => {
      const calories = await getCalories();
      setCalories(Number(calories));
    };
    fetchCalories();
  }, []);

  const mapExerciseList = () => {
    const exerciseResult = workout.exercises
      ?.map(
        (exercise: any) =>
          exercise.name +
          " for " +
          exercise.reps +
          " reps and " +
          exercise.sets +
          " sets with " +
          exercise.weight +
          " kgs as weight"
      )
      .join(" , ");

    return exerciseResult;
  };

  //TODO: Refactor so that it calculates calories on workout submit.
  const getCalories = async () => {
    const exerciseList = mapExerciseList();
    console.log("api key" + process.env.GOOGLE_API_KEY);
    try {
      const response = await axios.post(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent",
        {
          contents: [
            {
              parts: [
                {
                  text: `Calculate average total calories spent doing the following exercise list for a 24 year old 195cm 82kg male with moderate intensity of exercise, each exercise taking 30 seconds to complete with 2 min rest between sets: ${exerciseList}. only output result as a NUMBER of kcal and if any information is missing just take an average individual's corresponding information for that part. omit any kind of extra overhead on the output, only output a number`,
                },
              ],
            },
          ],
        },
        {
          params: {
            key: "APIKEY",
          },
        }
      );
      const aiResponse = response.data.candidates[0].content.parts[0].text;
      console.log(aiResponse);
      return aiResponse;
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        console.error("Axios error:", error.response?.data || error.message);
      } else {
        console.error("Unexpected error:", error);
      }
    }
  };

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
      <View style={styles.FooterContainer}>
        <Text style={styles.MoreTextStyle}> {calories}</Text>
        <Text style={styles.SmallTextStyle}> calories burnt</Text>
        <View style={[styles.ClearIcon, { flex: 6 }]}>
          <Ionicons name="flame" size={25} color="white" />
        </View>
      </View>
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
  FooterContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
    flex: 1,
  },
  ClearIcon: {
    alignSelf: "center",
    paddingHorizontal: 0,
    gap: 0,
  },
});

export default WorkoutHistoryCard;
