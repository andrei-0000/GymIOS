import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS } from "../theme/theme";
import Ionicons from "@expo/vector-icons/Ionicons";

interface GradientBGIconProps {
  name: string | any;
  color: string;
  size: number;
}

function GradientBGIcon({ name, color, size }: GradientBGIconProps) {
  return (
    <View style={styles.Container}>
      <Ionicons name={name} size={size} color={color} />
    </View>
  );
}

export default GradientBGIcon;

const styles = StyleSheet.create({
  Container: {
    borderWidth: 0,
    borderColor: COLORS.lakeBlue,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.black,
  },
  LinearGradientBG: {
    height: 36,
    width: 36,
    alignItems: "center",
    justifyContent: "center",
  },
});
