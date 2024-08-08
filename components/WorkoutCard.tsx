import { Dimensions, StyleSheet, Text, View } from "react-native";
import React from "react";

const CARD_WIDTH = Dimensions.get("window").width * 0.86;
const CARD_HEIGHT = Dimensions.get("window").height * 0.5;

interface WorkoutCardProps {
  id?: string;
  name?: string;
}

function WorkoutCard({ id, name }: WorkoutCardProps) {
  return (
    <View style={styles.WorkoutCardContainer}>
      <Text>WorkoutCard</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  WorkoutCardContainer: {
    backgroundColor: "white",
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 20,
  },
});

export default WorkoutCard;
