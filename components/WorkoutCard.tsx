import {
  Dimensions,
  FlatList,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React from "react";
import { COLORS } from "../theme/theme";
import { LinearGradient } from "expo-linear-gradient";
import { Exercise, Workout } from "../data/data";

const CARD_WIDTH = Dimensions.get("window").width * 0.86;
const CARD_HEIGHT = Dimensions.get("window").height * 0.5;

export interface WorkoutProps {
  id?: string;
  name?: string;
  exercises?: Exercise[];
}

function WorkoutCard({ id, name, exercises }: WorkoutProps) {
  console.log(exercises);
  const [reps, onChangeReps] = React.useState("0");
  return (
    <LinearGradient colors={["#00000000", "#000000"]}>
      <View style={styles.WorkoutCardContainer}>
        <ImageBackground
          source={exercises?.at(0)?.picture}
          style={styles.CardImageStyle}
        >
          <LinearGradient
            colors={["#00000000", COLORS.darkGrey]}
            style={{ height: "100%", width: "100%" }}
          ></LinearGradient>
        </ImageBackground>
        <Text style={styles.HeaderTextStyle}>{name}</Text>
        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.ExerciseListStyle}
          data={exercises}
          renderItem={({ item }) => {
            return (
              <>
                <ScrollView horizontal style={styles.ScrollViewFlex}>
                  <Text style={styles.NormalTextStyle}>{item.name}</Text>
                  <TextInput
                    style={styles.input}
                    onChangeText={onChangeReps}
                    value={reps}
                    keyboardType="numeric"
                  />
                  <Text style={styles.NormalTextStyle}>reps</Text>
                  <TextInput
                    style={styles.input}
                    onChangeText={onChangeReps}
                    value={reps}
                    keyboardType="numeric"
                  />
                  <Text style={styles.NormalTextStyle}>sets</Text>
                  <TextInput
                    style={styles.input}
                    onChangeText={onChangeReps}
                    value={reps}
                    keyboardType="numeric"
                  />
                  <Text style={styles.NormalTextStyle}>kgs</Text>
                </ScrollView>
                <Text style={styles.SmallTextStyle}>kgs</Text>
              </>
            );
          }}
        ></FlatList>
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
  },
  GradientStyle: {
    height: "100%",
    width: "100%",
  },
  CardImageStyle: {
    width: CARD_WIDTH * 1,
    height: CARD_HEIGHT * 0.4,
    borderWidth: 0,
    borderRadius: 20,
    overflow: "hidden",
  },
  HeaderTextStyle: {
    fontFamily: "inter",
    fontSize: 20,
    color: COLORS.white,
    padding: 18,
    fontWeight: "bold",
  },
  NormalTextStyle: {
    fontFamily: "inter",
    fontSize: 16,
    color: COLORS.white,
    fontWeight: "condensed",
  },
  SmallTextStyle: {
    fontFamily: "inter",
    fontSize: 10,
    color: COLORS.seaBlue,
  },
  ExerciseListStyle: {
    gap: 20,
    paddingVertical: 18,
    paddingHorizontal: 18,
  },
  input: {
    height: 22,
    width: 42,
    margin: 0,
    borderWidth: 0,
    borderRadius: 20,
    paddingHorizontal: 15,
    backgroundColor: COLORS.inputGrey,
    marginHorizontal: 10,
    alignItems: "center",
    fontFamily: "inter",
    fontSize: 16,
    color: COLORS.white,
    fontWeight: "condensed",
  },
  ScrollViewFlex: {
    flexGrow: 1,
  },
});

export default WorkoutCard;
