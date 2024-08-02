import { StyleSheet, Text, View } from "react-native";
import React from "react";

interface HeaderBarProps {
  title?: string;
}

function HeaderBar({ title }: HeaderBarProps) {
  return (
    <View style={styles.HeaderContainer}>
      <Text style={styles.HeaderText}>{title}</Text>
    </View>
  );
}

export default HeaderBar;

const styles = StyleSheet.create({
  HeaderContainer: {
    padding: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  HeaderText: {
    fontFamily: "eurostile-normal", //TODO: Make it retrieve font from theme.ts
    fontSize: 30,
    color: "#ffffff",
  },
});
