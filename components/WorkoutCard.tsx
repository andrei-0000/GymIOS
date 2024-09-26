import {
  Dimensions,
  ScrollView,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Modal,
  Button,
} from "react-native";
import React, { useState } from "react";
import { COLORS } from "../theme/theme";
import { LinearGradient } from "expo-linear-gradient";
import { Exercise, Workout } from "../data/data";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useStore } from "../store/store";
import InputExercise from "./InputExercise";

const CARD_WIDTH = Dimensions.get("window").width * 0.98;
const COLLAPSED_HEIGHT = Dimensions.get("window").height * 0.5; // Adjusted height to show only 2 exercises
const EXPANDED_HEIGHT = Dimensions.get("window").height * 0.6;

export interface WorkoutProps {
  id?: string;
  name?: string;
  date?: Date;
  exercises: Exercise[];
}

function WorkoutCard({ id, name, date, exercises }: WorkoutProps) {
  const [exerciseData, setExerciseData] = useState(
    exercises.map((exercise) => ({
      name: exercise.name,
      description: exercise.description,
      picture: exercise.picture,
      exercise_group: exercise.exercise_group,
      type: exercise.type,
      reps: exercise.reps,
      sets: exercise.sets,
      weight: exercise.weight,
    }))
  );

  const [exerciseName, setExerciseName] = useState("");

  const [isExpanded, setIsExpanded] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const addUserWorkout = useStore((state: any) => state.addUserWorkout);

  const pictureSources = exercises.map((exercise) => exercise.picture);

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  const handleInputChange = (name: string, field: string, value: string) => {
    setExerciseData((prevData) =>
      prevData.map((exercise) =>
        exercise.name === name ? { ...exercise, [field]: value } : exercise
      )
    );
  };

  const handleAddExercise = () => {
    setExerciseData((prevData) => {
      const newExercise = {
        name: exerciseName,
        description: "",
        picture: undefined,
        exercise_group: [],
        type: "",
        reps: 0,
        sets: 0,
        weight: 0,
      };
      return [...prevData, newExercise];
    });
  };

  const handleDeleteExercise = (name: string) => {
    setExerciseData((prevData) =>
      prevData.filter((exercise) => exercise.name !== name)
    );
    addWorkoutHandler;
  };

  console.log("exerciseData for workout: " + name, exerciseData);

  const addWorkoutHandler = () => {
    return () => {
      let userWorkout: Workout;
      userWorkout = {
        id: id!,
        name: name!,
        exercises: exerciseData,
        date: new Date(),
      };
      addUserWorkout(userWorkout);
    };
  };

  return (
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
        <View style={styles.HeaderContainer}>
          <TouchableOpacity onPress={toggleModal}>
            <View style={[styles.AddIcon, { flex: 2 }]}>
              <Ionicons name="add-circle-outline" size={25} color="white" />
            </View>
          </TouchableOpacity>
          <Text style={[styles.HeaderTextStyle, { flex: 4 }]}>{name}</Text>
          <View style={styles.ConfirmButtonsStyle}>
            <TouchableOpacity onPress={addWorkoutHandler()}>
              <View style={[styles.DoneWeekIcon, { flex: 2 }]}>
                <Ionicons name="checkmark" size={20} color="black" />
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={[styles.DoneWeekIcon, { flex: 2 }]}>
                <Ionicons name="close" size={20} color="black" />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.ExerciseListStyle}>
          {exerciseData.map((item, index) => {
            const exercise = exerciseData.find((ex) => ex.name === item.name);
            return (
              (isExpanded || index < 2) && (
                <View key={index}>
                  <View style={styles.exerciseContainer}>
                    <Text style={styles.exerciseName}>{item.name}</Text>
                    <View style={styles.fieldsContainer}>
                      <TextInput
                        textAlign="center"
                        style={styles.input}
                        onChangeText={(value) =>
                          handleInputChange(item.name, "reps", value)
                        }
                        value={exercise!.reps.toString()}
                        keyboardType="numeric"
                      />
                      <Text style={styles.NormalTextStyle}>reps</Text>
                      <TextInput
                        textAlign="center"
                        style={styles.input}
                        onChangeText={(value) =>
                          handleInputChange(item.name, "sets", value)
                        }
                        value={exercise?.sets.toString()}
                        keyboardType="numeric"
                      />
                      <Text style={styles.NormalTextStyle}>sets</Text>
                      <TextInput
                        textAlign="center"
                        style={styles.input}
                        onChangeText={(value) =>
                          handleInputChange(item.name, "weight", value)
                        }
                        value={exercise?.weight.toString()}
                        keyboardType="numeric"
                      />
                      <Text style={styles.NormalTextStyle}>kgs</Text>
                    </View>
                  </View>
                  <View style={styles.exerciseFooter}>
                    <Text style={styles.SmallTextStyle}>
                      {date?.toString()}
                    </Text>
                    {isExpanded && (
                      <TouchableOpacity
                        onPress={() => handleDeleteExercise(item.name)}
                        style={{ flex: 1 }}
                      >
                        <Ionicons
                          name="trash-bin"
                          size={20}
                          color={COLORS.lightGrey}
                        />
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              )
            );
          })}
          <TouchableOpacity onPress={toggleExpansion}>
            {!isExpanded && (
              <View style={styles.MoreContainer}>
                <Text style={styles.MoreTextStyle}>
                  +{exerciseData.length - 2} more
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
          </TouchableOpacity>
        </View>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={toggleModal}
      >
        <View style={styles.CenteredView}>
          <InputExercise
            setInput={(name: string) => {
              setExerciseName(name);
            }}
          />
          <View style={styles.ModalButton}>
            <Button title="Cancel" onPress={toggleModal} />
            <Button
              title="Confirm"
              onPress={() => {
                handleAddExercise();
                toggleModal();
              }}
            />
          </View>
        </View>
      </Modal>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  CenteredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    marginTop: 22,
    height: "100%",
    width: "100%",
    backgroundColor: "rgba(52, 52, 52, 0.9)",
  },
  ModalButton: {
    flex: 1,
  },
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
  HeaderContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 3,
    paddingRight: 10,
    margin: 0,
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
    flex: 15,
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
    width: 55,
    borderRadius: 20,
    paddingHorizontal: 10,
    backgroundColor: COLORS.inputGrey,
    marginHorizontal: 0,
    fontFamily: "inter",
    fontSize: 14,
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
  DoneWeekIcon: {
    height: 30,
    width: 50,
    borderRadius: 30,
    borderWidth: 0,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    backgroundColor: COLORS.white,
  },
  exerciseFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 0,
  },
  AddIcon: {
    height: 30,
    width: 50,
    borderRadius: 30,
    borderWidth: 0,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  ConfirmButtonsStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 2,
    padding: 0,
  },
});

export default WorkoutCard;
