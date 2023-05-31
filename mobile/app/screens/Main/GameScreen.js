import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { useRoute } from "@react-navigation/native";
import instance from "../../services";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TouchableOpacity } from "react-native-gesture-handler";
import QRCode from "react-native-qrcode-svg";

const GameScreen = () => {
  const route = useRoute();
  const gameID = route.params;
  const [gameData, setGameData] = useState(null);
  const [timer, setTimer] = useState(0); // Timer state

  useEffect(() => {
    const fetchGameData = async () => {
      try {
        const token = await AsyncStorage.getItem("userToken");
        const response = await instance.get(`/game/${gameID}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const fetchedGameData = response.data.game;
        setGameData(fetchedGameData);

        // Calculate time remaining until game start
        const currentTime = Math.floor(Date.now() / 1000); // Convert current time to seconds
        const gameStartTime = Math.floor(
          Date.parse(fetchedGameData.time) / 1000
        ); // Convert game start time to seconds
        const remainingTime = Math.max(0, gameStartTime - currentTime);
        setTimer(remainingTime);
      } catch (error) {
        console.log("Error fetching game data:", error);
      }
    };

    fetchGameData();
  }, [gameID]);

  useEffect(() => {
    // Start the countdown timer when gameData is loaded
    if (gameData && timer > 0) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [gameData, timer]);

  if (!gameData) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading game data...</Text>
      </View>
    );
  }

  const isPregame = timer > 0;

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    const formattedTime = `${hours.toString().padStart(2, "0")}h ${minutes
      .toString()
      .padStart(2, "0")}m ${seconds.toString().padStart(2, "0")}s`;
    return formattedTime;
  };

  return (
    <View style={styles.container}>
      <View style={styles.timerContainer}>
        <Text style={styles.timerText}>{formatTime(timer)}</Text>
      </View>
      <Text style={styles.title}>{gameData.title}</Text>
      <Text style={styles.createdByText}>
        Created by: {gameData.createdBy.username}
      </Text>
      <View style={styles.qrCodeContainer}>
        <QRCode value={gameID.toString()} size={200} />

        <Text style={styles.gameID}>{gameID}</Text>
      </View>
      <TouchableOpacity style={styles.inviteButton}>
        <Text style={styles.inviteButtonText}>Invite</Text>
      </TouchableOpacity>
      <View style={styles.table}>
        <View style={[styles.tableRow, styles.tableHeader]}>
          <Text style={styles.tableHeaderCell}>Username</Text>
          <Text style={styles.tableHeaderCell}>Role</Text>
        </View>
        {gameData.tblusers &&
          gameData.tblusers.map((player, index) => (
            <View
              style={[
                styles.tableRow,
                index % 2 === 0 ? styles.evenRow : styles.oddRow,
              ]}
              key={player.IDUser}
            >
              <Text style={styles.tableCell}>{player.username}</Text>
              <Text style={styles.tableCell}>
                {gameData.createdBy === player.IDUser ? "Owner" : "Participant"}
              </Text>
            </View>
          ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
  },
  loadingText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#888",
  },
  timerText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#F88F24",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  createdByText: {
    fontSize: 16,
    color: "#999",
    marginBottom: 20,
  },
  qrCodeContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  qrCode: {
    width: 200,
    height: 200,
    marginBottom: 10,
  },
  gameID: {
    fontSize: 18,
    fontWeight: "bold",
  },
  inviteButton: {
    backgroundColor: "#F88F24",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 20,
  },
  inviteButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  table: {
    borderWidth: 1,
    borderColor: "#999",
    width: "100%",
    backgroundColor: "white",
  },
  tableRow: {
    flexDirection: "row",
  },
  tableHeader: {
    backgroundColor: "#F88F24",
  },
  tableHeaderCell: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 5,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  tableCell: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 5,
    color: "#333",
  },
  evenRow: {
    backgroundColor: "#DBDBDB",
  },
  oddRow: {
    backgroundColor: "#E8E8E8",
  },
});

export default GameScreen;
