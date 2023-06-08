import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import instance from "../../services";
import { useNavigation, useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const GameEnded = () => {
  const [gameInfo, setGameInfo] = useState(null);
  const navigation = useNavigation();

  const routes = useRoute();
  const { gameId } = routes.params;

  useEffect(() => {
    // Fetch game information from the database using gameId
    const fetchGameInfo = async () => {
      try {
        const token = await AsyncStorage.getItem("userToken");
        const response = await instance.get(`/game/${gameId["gameid"]}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = response.data;
        console.log(response.data);
        setGameInfo(data);
      } catch (error) {
        console.log("Error fetching game information:", error);
      }
    };

    fetchGameInfo();
  }, [gameId]);

  if (!gameInfo) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading game information...</Text>
      </View>
    );
  }

  let { scoresThuisploeg, scoresBezoekers, title, location } = gameInfo.game;
  let Winner;
  if (scoresThuisploeg < scoresBezoekers) {
    Winner = "Bezoekers";
  } else if (scoresThuisploeg > scoresBezoekers) {
    Winner = "Thuis ploeg";
  } else {
    Winner = "Gelijk Spel";
  }
  if (scoresThuisploeg === null || scoresBezoekers === null) {
    scoresThuisploeg = 0;
    scoresBezoekers = 0;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Game Ended: {title}</Text>

      <View style={styles.StatsContainer}>
        <Text style={styles.Winner}>Winner: {Winner}</Text>
        <Text style={styles.StatText}>Stats: </Text>
        <Text style={styles.teamScore}>Team A: {scoresThuisploeg}</Text>
        <Text style={styles.teamScore}>Team B: {scoresBezoekers}</Text>
        <Text style={styles.Location}>Location: {location}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="Back to Home"
          onPress={() => navigation.navigate("Home")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  loadingText: {
    fontSize: 16,
    color: "#666",
  },
  winner: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
    textTransform: "uppercase",
  },
  statsContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  teamScore: {
    fontSize: 20,
    marginBottom: 10,
    color: "#333",
  },
  location: {
    fontSize: 16,
    marginBottom: 10,
    color: "#666",
  },
  buttonContainer: {
    marginTop: 20,
  },
});

export default GameEnded;
