import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Share,
  Button,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import instance from "../../services";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import * as Linking from "expo-linking";

const GameScreen = () => {
  const route = useRoute();
  const gameId = route.params;
  const [gameData, setGameData] = useState(null);
  const [account, setAccount] = useState(null);
  const [timer, setTimer] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [URL, setURL] = useState("");

  const navigation = useNavigation();

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    if (timer <= 0) {
      console.log(timer);
      navigation.navigate("GameStarted", { gameid: gameId });
    }

    return () => {
      clearInterval(timerInterval);
    };
  }, [timer, gameId, gameData, account]);

  useEffect(() => {
    const fetchGameData = async () => {
      try {
        const token = await AsyncStorage.getItem("userToken");
        const response = await instance.get(`/game/${gameId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const fetchedGameData = response.data.game;
        setGameData(fetchedGameData);

        const currentTime = Math.floor(Date.now() / 1000);
        const gameStartTime = Math.floor(
          Date.parse(fetchedGameData.time) / 1000
        );
        const remainingTime = Math.max(0, gameStartTime - currentTime);
        setTimer(remainingTime);
      } catch (error) {
        console.log("Error fetching game data:", error);
      }
    };

    fetchGameData();
  }, [gameId]);

  useEffect(() => {
    const getUserData = async () => {
      try {
        if (gameData && gameData.createdBy) {
          const token = await AsyncStorage.getItem("userToken");
          const response = await instance.get(
            `/account/${gameData.createdBy}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          const userData = response.data;
          setAccount(userData);
        }
      } catch (error) {
        setAccount(null);
      }
    };

    getUserData();
  }, [gameData]);

  useEffect(() => {
    setURL(`https://app.darksync.org/joinlink/${gameId}`);
  }, [gameData, gameId]);

  const handleReadyButton = () => {
    if (timer <= 300) {
      setIsReady(!isReady);
    }
  };

  if (!gameData || !account) {
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

    const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    return formattedTime;
  };

  const renderJoinedUsers = () => {
    if (!gameData.Players || gameData.Players.length === 0) {
      return <Text style={styles.noUsersText}>No users have joined yet.</Text>;
    }

    return gameData.Players.map((user, index) => {
      if (!user || !gameData.createdBy) {
        return null;
      }

      let role = "member";
      if (user.IDUser === gameData.createdBy) {
        role = "leader";
      }

      return (
        <View key={index} style={styles.userRow}>
          <Text style={styles.userName}>{user.username}</Text>
          <Text style={styles.userRole}>{role}</Text>
        </View>
      );
    });
  };

  const handelShare = async () => {
    Share.share({
      title: "share invite link",
      message: `You have been invited to a basketball game! Click the link to join!\n${URL}`,
    });
  };

  const handleCopyLink = async () => {
    await Clipboard.setStringAsync(URL);
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>{gameData.title}</Text>
        <Text style={styles.createdByText}>
          Created by: {account && account.user && account.user.username}
        </Text>
        <View style={[styles.timerContainer]}>
          <TouchableOpacity onPress={handleReadyButton}>
            {isPregame ? (
              <View style={styles.timerIcon}>
                <Ionicons name="md-time" size={30} color="#333" />
                <Text style={styles.timerText}>{formatTime(timer)}</Text>
              </View>
            ) : account.user.IDUser === gameData.createdBy ? (
              <Button
                title="Go to Game Started"
                onPress={() =>
                  navigation.navigate("GameStarted", { gameid: gameId })
                }
              />
            ) : (
              <Text>Game Started</Text>
            )}
          </TouchableOpacity>
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.matchInfoContainer}>
            <View style={styles.matchInfoRow}>
              <View style={styles.matchInfoItem}>
                <Text style={styles.matchInfoLabel}>Extra Info</Text>
                <Text style={styles.matchInfoValue}>{gameData.extraInfo}</Text>
              </View>
              <View style={styles.matchInfoItem}>
                <Text style={styles.matchInfoLabel}>Time</Text>
                <Text style={styles.matchInfoValue}>
                  {new Date(gameData.time).toDateString()}
                </Text>
              </View>
            </View>
            <View style={styles.matchInfoRow}>
              <View style={styles.matchInfoItem}>
                <Text style={styles.matchInfoLabel}>Game Type</Text>
                <Text style={styles.matchInfoValue}>{gameData.gameType}</Text>
              </View>
              <View style={styles.matchInfoItem}>
                <Text style={styles.matchInfoLabel}>Game Style</Text>
                <Text style={styles.matchInfoValue}>{gameData.gameStyle}</Text>
              </View>
            </View>
            <View style={styles.matchInfoRow}>
              <View style={styles.matchInfoItem}>
                <Text style={styles.matchInfoLabel}>Location</Text>
                <Text style={styles.matchInfoValue}>{gameData.location}</Text>
              </View>
            </View>
          </View>
          {!isReady && timer >= 300 && (
            <View style={styles.linkContainer}>
              <Text style={styles.linkText}>Join Link:</Text>
              <View style={styles.linkBox}>
                <Text style={styles.link}>{URL}</Text>
                <TouchableOpacity onPress={handleCopyLink}>
                  <Text style={styles.copyButton}>Copy</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity style={styles.joinButton} onPress={handelShare}>
                <Text style={styles.joinButtonText}>share</Text>
              </TouchableOpacity>
            </View>
          )}
          {isPregame && timer <= 300 && (
            <TouchableOpacity
              style={[styles.button, styles.readyButton]}
              onPress={handleReadyButton}
            >
              <Text style={styles.buttonText}>
                {isReady ? "Cancel" : "Ready"}
              </Text>
            </TouchableOpacity>
          )}
          <View style={styles.tableContainer}>
            <Text style={styles.tableTitle}>Joined Users</Text>
            <View style={styles.table}>
              <View style={styles.tableRow}>
                <Text style={styles.tableHeader}>Username</Text>
                <Text style={styles.tableHeader}>Role</Text>
              </View>
              {renderJoinedUsers()}
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
  },
  loadingText: {
    fontSize: 18,
    color: "#333",
  },
  timerContainer: {
    alignItems: "center",
    marginBottom: 10,
  },
  timerText: {
    fontSize: 14,
    color: "#333",
    marginLeft: 10,
  },
  timerIcon: {
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    color: "#333",
    marginBottom: 10,
    marginTop: 35,
    textAlign: "center",
  },
  createdByText: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
  },
  contentContainer: {
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 10,
    width: "100%",
  },
  matchInfoContainer: {
    backgroundColor: "#F1F1F1",
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  matchInfoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  matchInfoItem: {
    flex: 1,
    marginRight: 10,
  },
  matchInfoLabel: {
    fontSize: 14,
    color: "#555",
    marginBottom: 5,
  },
  matchInfoValue: {
    fontSize: 16,
    color: "#333",
  },
  linkContainer: {
    marginBottom: 20,
  },
  linkText: {
    fontSize: 14,
    color: "#333",
    marginBottom: 5,
  },
  linkBox: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#333",
    borderRadius: 5,
    padding: 10,
  },
  link: {
    flex: 1,
    color: "#333",
    marginRight: 10,
  },
  copyButton: {
    fontSize: 14,
    color: "#FFF",
    backgroundColor: "#333",
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  joinButton: {
    marginTop: 10,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FF9800",
  },
  joinButtonText: {
    fontSize: 16,
    color: "#FFF",
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 16,
    color: "#FFF",
  },
  readyButton: {
    backgroundColor: "#4CAF50",
  },
  tableContainer: {
    marginTop: 20,
  },
  tableTitle: {
    fontSize: 16,
    color: "#333",
    marginBottom: 10,
  },
  table: {
    backgroundColor: "#F1F1F1",
    borderRadius: 5,
    padding: 10,
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  tableHeader: {
    fontSize: 14,
    color: "#555",
    fontWeight: "bold",
  },
  userRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 5,
  },
  userName: {
    fontSize: 14,
    color: "#333",
  },
  userRole: {
    fontSize: 14,
    color: "#555",
  },
  noUsersText: {
    fontSize: 14,
    color: "#555",
    fontStyle: "italic",
  },
});

export default GameScreen;
