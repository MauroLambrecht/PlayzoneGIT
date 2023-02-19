import React from "react";
import { View, StyleSheet } from "react-native";
import { useProjectFonts } from "../../config/fonts.js";

const LogScreen = () => {
  const fontsLoaded = useProjectFonts();
  if (!fontsLoaded) {
    return undefined;
  }

  return <View></View>;
};
const styles = StyleSheet.create({});

export default LogScreen;
