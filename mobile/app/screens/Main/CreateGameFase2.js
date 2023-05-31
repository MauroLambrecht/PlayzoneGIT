import React, { useCallback, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TextInput,
  Text,
  TouchableOpacity,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import TimeAndDate from "../../components/sections/TimeAndDate";
import Colors from "../../config/colors";
import { Picker } from "@react-native-picker/picker";
import { Ionicons } from "@expo/vector-icons";
import instance from "../../services";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CreateGameFase2 = () => {
  const [chosenDate, setChosenDate] = useState(null);
  const [gameType, setGameType] = useState("match");
  const [teamSize, setTeamSize] = useState("1v1");
  const route = useRoute();
  const navigation = useNavigation();

  const { title, extraInfo, chosenLocation } = route.params;

  const handleDateSelect = useCallback((selectedDate) => {
    setChosenDate(selectedDate);
  }, []);

  const handleInviteFriends = () => {
    // Handle invite friends action
    console.log("Invite Friends button pressed");
  };

  const handleSchedule = async () => {
    const gameData = {
      gameType: gameType,
      gameStyle: teamSize,
      location: chosenLocation,
      time: chosenDate,
      title: title,
      extraInfo: extraInfo,
    };

    const token = await AsyncStorage.getItem("userToken");
    const response = await instance.post("/creategame", gameData, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const gameID = response.data.game.IDGame;
    console.log(gameID);

    console.log("Game created successfully:", response.data);
    navigation.navigate("GameScreen", gameID);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TimeAndDate onDateSelect={handleDateSelect} />

      <View style={styles.gameTypeContainer}>
        <View style={styles.header}>
          <Ionicons name="ios-settings-sharp" size={24} color={Colors.orange} />
          <Text style={styles.gameTypeTitle}>Game Type:</Text>
        </View>
        <View style={styles.pickerContainer}>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={gameType}
              onValueChange={(value) => setGameType(value)}
              style={styles.picker}
              itemStyle={styles.pickerItem}
            >
              <Picker.Item label="Match" value="match" />
              <Picker.Item label="Free Play" value="freeplay" />
              <Picker.Item label="Shooting" value="shooting" />
            </Picker>
          </View>
          {gameType === "match" && (
            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={teamSize}
                onValueChange={(value) => setTeamSize(value)}
                style={styles.picker}
                itemStyle={styles.pickerItem}
              >
                <Picker.Item label="1v1" value="1v1" />
                <Picker.Item label="2v2" value="2v2" />
                <Picker.Item label="3v3" value="3v3" />
                <Picker.Item label="4v4" value="4v4" />
                <Picker.Item label="5v5" value="5v5" />
              </Picker>
            </View>
          )}
        </View>
      </View>

      <View style={styles.header}>
        <Ionicons name="person-add-sharp" size={24} color={Colors.orange} />
        <Text style={styles.gameTypeTitle}>Invite</Text>
      </View>
      <View style={styles.inviteButtonContainer}>
        <TouchableOpacity
          style={styles.inviteButton}
          onPress={handleInviteFriends}
        >
          <Text style={styles.inviteButtonText}>Invite Friends</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.scheduleButtonContainer}>
        <TouchableOpacity
          style={styles.scheduleButton}
          onPress={handleSchedule}
        >
          <Text style={styles.scheduleButtonText}>Schedule</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  gameTypeContainer: {
    marginTop: 20,
    marginBottom: 40,
  },
  gameTypeTitle: {
    fontSize: 24,
    color: "#F59E0B",
    marginLeft: 10,
  },
  pickerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  pickerWrapper: {
    backgroundColor: Colors.purple,
    elevation: 8,
    borderRadius: 8,
    width: "49%",
  },
  picker: {
    color: Colors.white,
  },
  pickerItem: {
    color: Colors.white,
  },
  inviteButton: {
    backgroundColor: Colors.orange,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    elevation: 8,
  },
  inviteButtonText: {
    fontSize: 18,
    color: Colors.white,
    textAlign: "center",
  },
  scheduleButtonContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  scheduleButton: {
    backgroundColor: Colors.orange,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  scheduleButtonText: {
    fontSize: 18,
    color: Colors.white,
    textAlign: "center",
  },
});

export default CreateGameFase2;
