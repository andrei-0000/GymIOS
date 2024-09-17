import React, { useState } from "react";
import { Text, View, TextInput, StyleSheet } from "react-native";
import { COLORS } from "../theme/theme";

const InputExercise = () => {
  const [value, setValue] = useState(0);
  return (
    <View style={styles.container}>
      <Text style={styles.HeaderTextStyle}> Input Exercise</Text>
      <View style={styles.input}>
        <TextInput textAlign="center" placeholder="Enter Exercise Name" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    height: 37,
    width: 165,
    borderRadius: 20,
    paddingHorizontal: 0,
    marginVertical: 30,
    paddingVertical: 10,
    backgroundColor: COLORS.white,
    marginHorizontal: 0,
    fontFamily: "inter",
    fontSize: 14,
    color: COLORS.black,
    fontWeight: "400",
  },
  HeaderTextStyle: {
    fontFamily: "inter",
    fontSize: 20,
    color: COLORS.brightGreen,
    paddingHorizontal: 15,
    paddingTop: 0,
    fontWeight: "bold",
    marginBottom: 0,
  },
});

export default InputExercise;
