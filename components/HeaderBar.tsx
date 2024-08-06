import { StyleSheet, Text, View } from "react-native";
import React from "react";
import GradientBGIcon from "./MenuIcon";
import ProfilePic from "./ProfilePic";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { COLORS } from "../theme/theme";

interface HeaderBarProps {
  title?: string;
}

function HeaderBar({ title }: HeaderBarProps) {
  return (
    <View style={styles.HeaderContainer}>
      <ProfilePic />
      <Text style={styles.HeaderText}>{title}</Text>
      <GradientBGIcon name="menu" color={COLORS.white} size={32} />
    </View>
  );
}

export default HeaderBar;

const styles = StyleSheet.create({
  HeaderContainer: {
    padding: 20,
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "space-between",
    paddingTop: 65,
  },
  HeaderText: {
    fontFamily: "eurostile-normal", //TODO: Make it retrieve font from theme.ts
    fontSize: 26,
    color: "#ffffff",
  },
});
