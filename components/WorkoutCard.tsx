import {
  Dimensions,
  ScrollView,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { COLORS } from "../theme/theme";
import { LinearGradient } from "expo-linear-gradient";
import { Exercise } from "../data/data";
import Ionicons from "@expo/vector-icons/Ionicons";

const CARD_WIDTH = Dimensions.get("window").width * 0.95;
const COLLAPSED_HEIGHT = Dimensions.get("window").height * 0.5; // Adjusted height to show only 2 exercises
const EXPANDED_HEIGHT = Dimensions.get("window").height * 0.7;

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

  const [isExpanded, setIsExpanded] = useState(false); // State to track if the card is expanded

  const handleInputChange = (name: string, field: string, value: string) => {
    setExerciseData((prevData) =>
      prevData.map((exercise) =>
        exercise.name === name ? { ...exercise, [field]: value } : exercise
      )
    );
  };

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  const pictureSources = exercises.map((exercise) => exercise.picture);

  return (
    <TouchableOpacity onPress={toggleExpansion}>
      <LinearGradient colors={["#00000000", "#000000"]}>
        <View
          style={[
            styles.WorkoutCardContainer,
            {
              height: isExpanded ? EXPANDED_HEIGHT : COLLAPSED_HEIGHT,
              overflow: isExpanded ? "visible" : "hidden",
            },
          ]}
        >
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.ScrollViewContainer}
          >
            {pictureSources.map((source, index) => (
              <View
                style={[
                  styles.ImageWrapper,
                  {
                    height: isExpanded
                      ? EXPANDED_HEIGHT * 0.33
                      : COLLAPSED_HEIGHT * 0.33,
                  },
                ]}
                key={index}
              >
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
          <View style={styles.ExerciseListStyle}>
            {exercises.map((item, index) => {
              const exercise = exerciseData.find((ex) => ex.name === item.name);
              return (
                (isExpanded || index < 2) && (
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
                    <Text style={styles.SmallTextStyle}>
                      Thursday, June 26th
                    </Text>
                  </View>
                )
              );
            })}
            {!isExpanded && (
              <View style={styles.MoreContainer}>
                <Text style={styles.MoreTextStyle}>
                  +{exercises.length - 2} more
                </Text>
                <Ionicons
                  name="chevron-down"
                  size={24}
                  color={COLORS.brightGreen}
                ></Ionicons>
              </View>
            )}
            {isExpanded && (
              <View style={styles.MoreContainer}>
                <Ionicons
                  name="chevron-up"
                  size={24}
                  color={COLORS.brightGreen}
                ></Ionicons>
              </View>
            )}
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  WorkoutCardContainer: {
    backgroundColor: COLORS.cardGrey,
    width: CARD_WIDTH,
    borderRadius: 20,
    padding: 0,
    flexDirection: "column",
    justifyContent: "flex-start",
    overflow: "hidden", // Ensure content stays within the card when collapsed
  },
  ScrollViewContainer: {
    flexDirection: "row",
    paddingHorizontal: 0,
    marginBottom: 0,
  },
  ImageWrapper: {
    width: CARD_WIDTH * 0.7, // Ensuring each image is smaller than the card width
    height: EXPANDED_HEIGHT * 0.33,
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
  MoreTextStyle: {
    fontFamily: "inter",
    fontSize: 14,
    color: COLORS.brightGreen,
    fontWeight: "bold",
  },
  MoreContainer: {
    flexDirection: "row",
    justifyContent: "center",
    padding: 0,
    alignItems: "center",
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
