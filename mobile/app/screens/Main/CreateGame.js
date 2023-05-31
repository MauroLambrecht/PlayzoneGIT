import React, { useCallback, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TextInput,
  Text,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AntDesign, Feather } from "@expo/vector-icons";

import TimeAndDate from "../../components/sections/TimeAndDate";
import Location from "../../components/sections/Location";
import NextButton from "../../components/misc/NextButton";
import Colors from "../../config/colors";

const CreateGame = () => {
  const [title, setTitle] = useState("");
  const [extraInfo, setExtraInfo] = useState("");
  const [chosenLocation, setChosenLocation] = useState(null);
  const navigation = useNavigation();

  const handleLocationSelect = useCallback((selectedLocation) => {
    setChosenLocation(selectedLocation);
  }, []);

  const handleNextPress = () => {
    // Pass the necessary data to the next screen
    navigation.navigate("CreateGameFase2", {
      title,
      extraInfo,
      chosenLocation,
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <AntDesign name="star" size={24} color="#F59E0B" />
        <Text style={styles.headerText}>New Game</Text>
      </View>
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <AntDesign name="tag" size={18} color={Colors.purple} />
          <TextInput
            style={styles.input}
            placeholder="Game Title"
            value={title}
            onChangeText={(text) => setTitle(text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <AntDesign name="exclamationcircle" size={18} color={Colors.purple} />
          <TextInput
            style={[styles.input, styles.multilineInput]}
            placeholder="Extra Information"
            value={extraInfo}
            onChangeText={(text) => setExtraInfo(text)}
            multiline={true}
          />
        </View>
      </View>
      <Location onLocationSelect={handleLocationSelect} />
      <TouchableOpacity onPress={handleNextPress} style={styles.nextButton}>
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#FFFFFF",
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },
  headerText: {
    fontSize: 24,
    color: "#F59E0B",
    marginLeft: 10,
  },
  formContainer: {
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 18,
    color: "#333333",
  },
  multilineInput: {
    height: 80,
  },
  nextButton: {
    backgroundColor: "#F59E0B",
    borderRadius: 10,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
  },

  nextButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default CreateGame;
