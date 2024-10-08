import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { COLORS } from "../theme/theme";

const ProfilePic = () => {
  return (
    <View style={styles.ImageContainer}>
      <Image
        source={require("../assets/app_images/ibai.png")}
        style={styles.Image}
      ></Image>
    </View>
  );
};

const styles = StyleSheet.create({
  ImageContainer: {
    height: 80,
    width: 80,
    borderRadius: 45,
    borderWidth: 4,
    borderColor: COLORS.brightGreen,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  Image: {
    height: 80,
    width: 80,
  },
});

export default ProfilePic;
