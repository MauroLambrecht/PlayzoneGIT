import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Colors from "../../config/colors";

const NextButton = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button}>
        <MaterialIcons name="arrow-forward" size={24} color={Colors.white} />
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.dark,
    paddingVertical: 10,
  },
  button: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.orange,
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
    borderBottomLeftRadius: 25,
    paddingVertical: 12,
  },
  buttonText: {
    fontSize: 18,
    color: Colors.white,
    marginLeft: 8,
    fontFamily: "Quicksand",
  },
});

export default NextButton;
