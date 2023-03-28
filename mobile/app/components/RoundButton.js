import React from "react";
import { Text, TouchableOpacity, StyleSheet, View } from "react-native";

import { useProjectFonts } from "../config/fonts.js";
import Colors from "../config/colors.js";
import { Button } from "react-native-paper";

const RoundButton = ({ title, onPress, buttonStyle, textStyle }) => {
  const fontsLoaded = useProjectFonts();
  if (!fontsLoaded) {
    return undefined;
  }

  return (
    <TouchableOpacity style={[styles.button, buttonStyle]} onPress={onPress}>
      <Text style={[styles.buttonText, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 50,
    marginTop: 20,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    width: "70%",
  },
  buttonText: {
    fontSize: 16,
    fontFamily: "Quicksand",
    textAlign: "center",
    color: "#FFFFFF",
    letterSpacing: 1,
  },
});

export default RoundButton;
