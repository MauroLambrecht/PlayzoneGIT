import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

import { useProjectFonts } from "../../config/fonts.js";
import RoundButton from "../../components/RoundButton.js";
import { GradientText } from "../../components/GradientComp";

import Colors from "../../config/colors.js";
import { useNavigation } from "@react-navigation/native";

const PlayScreen = () => {
  const fontsLoaded = useProjectFonts();
  if (!fontsLoaded) {
    return undefined;
  }

  return (
    <View style={styles.container}>
      <View>
        <GradientText text="Public games" style={styles.title}></GradientText>
        <Image />
      </View>

      <View>{/* here doe the match components go */}</View>

      <View style={styles.bottomContainer}>
        <RoundButton
          title="Create a game"
          onPress={() => console.log("Hi")}
          buttonStyle={styles.orangeButton}
        />
        <Text style={styles.text}>Invite Friends</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    marginTop: 40,
    marginLeft: 30,
    fontFamily: "Quicksand",
    fontWeight: "700",
    fontSize: 24,
    marginBottom: 20,
  },
  bottomContainer: {
    paddingTop: 10,
    position: "absolute",
    bottom: 0,
    width: "100%",
    alignItems: "center",
    backgroundColor: "#E4E4E4",
  },
  orangeButton: {
    backgroundColor: Colors.orange,
  },
  text: {
    marginTop: 10,
    color: Colors.orange,
    fontFamily: "Quicksand",
    fontWeight: "bold",
    fontSize: 18,
    textDecorationLine: "underline",
    marginBottom: 20,
  },
});

export default PlayScreen;
