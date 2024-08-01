import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useStore } from "../store/store";

const HomeScreen = () => {
  const ExerciseList = useStore((state: any) => state.ExerciseList);

  return (
    <View>
      <Text>HomeScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default HomeScreen;
