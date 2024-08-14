import {
  Dimensions,
  ScrollView,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React from "react";
import { COLORS } from "../theme/theme";
import { LinearGradient } from "expo-linear-gradient";
import { Exercise } from "../data/data";
import { useState } from "react";

const CARD_WIDTH = Dimensions.get("window").width * 0.95;
const CARD_HEIGHT = Dimensions.get("window").height * 0.5;

export interface WorkoutProps {
  id?: string;
  name?: string;
  exercises: Exercise[];
}

function WorkoutCard({ id, name, exercises }: WorkoutProps) {
  const [exerciseData, setExerciseData] = useState(
    exercises.map((exercise) => ({
      name: exercise.name,
      reps: "",
      sets: "",
      kgs: "",
    }))
  );

  const handleInputChange = (name: string, field: string, value: string) => {
    setExerciseData((prevData) =>
      prevData.map((exercise) =>
        exercise.name === name ? { ...exercise, [field]: value } : exercise
      )
    );
  };

  const pictureSources = exercises.map((exercise) => exercise.picture);

  return (
    <LinearGradient colors={["#00000000", "#000000"]}>
      <View style={styles.WorkoutCardContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.ScrollViewContainer}
        >
          {pictureSources.map((source, index) => (
            <View style={styles.ImageWrapper} key={index}>
              <ImageBackground source={source} style={styles.CardImageStyle}>
                <LinearGradient
                  colors={["#00000000", COLORS.cardGrey]}
                  start={{ x: 0.5, y: 0.3 }}
                  end={{ x: 0.5, y: 1 }}
                  style={{ height: "100%", width: "100%", opacity: 0.9 }}
                />
              </ImageBackground>
            </View>
          ))}
        </ScrollView>
        <Text style={styles.HeaderTextStyle}>{name}</Text>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.ExerciseListStyle}
        >
          {exercises.map((item, index) => {
            const exercise = exerciseData.find((ex) => ex.name === item.name);
            return (
              <View key={index}>
                <View style={styles.exerciseContainer}>
                  <Text style={styles.exerciseName}>{item.name}</Text>
                  <View style={styles.fieldsContainer}>
                    <TextInput
                      style={styles.input}
                      onChangeText={(value) =>
                        handleInputChange(item.name, "reps", value)
                      }
                      value={exercise?.reps}
                      keyboardType="numeric"
                    />
                    <Text style={styles.NormalTextStyle}>reps</Text>
                    <TextInput
                      style={styles.input}
                      onChangeText={(value) =>
                        handleInputChange(item.name, "sets", value)
                      }
                      value={exercise?.sets}
                      keyboardType="numeric"
                    />
                    <Text style={styles.NormalTextStyle}>sets</Text>
                    <TextInput
                      style={styles.input}
                      onChangeText={(value) =>
                        handleInputChange(item.name, "kgs", value)
                      }
                      value={exercise?.kgs}
                      keyboardType="numeric"
                    />
                    <Text style={styles.NormalTextStyle}>kgs</Text>
                  </View>
                </View>
                <Text style={styles.SmallTextStyle}>Thursday, June 26th</Text>
              </View>
            );
          })}
        </ScrollView>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  WorkoutCardContainer: {
    backgroundColor: COLORS.cardGrey,
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 20,
    padding: 0,
    flexDirection: "column",
    justifyContent: "flex-start",
    overflow: "hidden", // Ensure content stays within the card
  },
  ScrollViewContainer: {
    flexDirection: "row",
    paddingHorizontal: 0,
    marginBottom: 0,
  },
  ImageWrapper: {
    width: CARD_WIDTH * 0.7, // Ensuring each image is smaller than the card width
    height: CARD_HEIGHT * 0.33,
    marginRight: 10, // Adds spacing between images
  },
  CardImageStyle: {
    flex: 1,
    borderRadius: 20,
    overflow: "hidden",
  },
  HeaderTextStyle: {
    fontFamily: "inter",
    fontSize: 20,
    color: COLORS.white,
    paddingHorizontal: 15,
    paddingTop: 0,
    fontWeight: "bold",
    marginBottom: 0,
  },
  NormalTextStyle: {
    fontFamily: "inter",
    fontSize: 14,
    color: COLORS.white,
    fontWeight: "400",
  },
  SmallTextStyle: {
    fontFamily: "inter",
    fontSize: 10,
    color: COLORS.seaBlue,
  },
  ExerciseListStyle: {
    paddingVertical: 18,
    paddingHorizontal: 8,
  },
  input: {
    height: 37,
    width: 48,
    borderRadius: 20,
    paddingHorizontal: 17,
    backgroundColor: COLORS.inputGrey,
    marginHorizontal: 6,
    fontFamily: "inter",
    fontSize: 16,
    color: COLORS.white,
    fontWeight: "400",
  },
  exerciseContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingVertical: 18,
  },
  exerciseName: {
    flex: 1,
    fontFamily: "inter",
    fontSize: 14,
    color: COLORS.white,
    fontWeight: "400",
  },
  fieldsContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 3,
    justifyContent: "space-around",
  },
});

export default WorkoutCard;
