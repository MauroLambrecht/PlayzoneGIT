import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  ScrollView,
  TouchableOpacity,
  Share,
} from "react-native";
import instance from "../../services";
import { useNavigation, useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Colors from "../../config/colors";

const GameEnded = () => {
  const [gameInfo, setGameInfo] = useState(null);
  const [account, setAccount] = useState(null);
  const [URL, setURL] = useState("");

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

        setGameInfo(data);
      } catch (error) {
        console.log("Error fetching game information:", error);
      }
    };

    fetchGameInfo();
  }, [gameId]);

  useEffect(() => {
    const getUserData = async () => {
      try {
        if (gameInfo && gameInfo.game.createdBy) {
          const token = await AsyncStorage.getItem("userToken");
          const response = await instance.get(
            `/account/${gameInfo.game.createdBy}`,
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
  }, [gameInfo]);

  useEffect(() => {
    setURL(`https://app.darksync.org/game/${gameId}`);
  }, [gameInfo, gameId]);

  if (!gameInfo || !account) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading game data...</Text>
      </View>
    );
  }

  console.log(gameInfo);

  let { scoresThuisploeg, scoresBezoekers } = gameInfo.game;
  let resultText;
  let yourTeam = gameInfo.game.Players.find(
    (player) => player.user === account.IDUser
  );

  if (yourTeam && yourTeam.game_players && yourTeam.game_players.teamSide) {
    const teamSide = yourTeam.game_players.teamSide;

    if (scoresThuisploeg < scoresBezoekers && teamSide === "home") {
      resultText = "You lost";
    } else if (scoresThuisploeg > scoresBezoekers && teamSide === "home") {
      resultText = "You won";
    } else if (scoresThuisploeg < scoresBezoekers && teamSide === "out") {
      resultText = "You won";
    } else if (scoresThuisploeg > scoresBezoekers && teamSide === "out") {
      resultText = "You lost";
    } else {
      resultText = "Draw";
    }
  } else {
    resultText = "No team information available";
  }

  if (scoresThuisploeg === null || scoresBezoekers === null) {
    scoresThuisploeg = 0;
    scoresBezoekers = 0;
  }

  const handleShare = async () => {
    Share.share({
      title: "Basketball results",
      message: `Check out my basketball result! Click the link to view!\n${URL}`,
    });
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>{resultText}</Text>

        <View style={styles.scoreContainer}>
          <View style={styles.scoreItem}>
            <Text style={styles.score}>{scoresThuisploeg}</Text>
          </View>
          <Text style={styles.vs}> VS </Text>
          <View style={styles.scoreItem}>
            <Text style={styles.score}>{scoresBezoekers}</Text>
          </View>
        </View>

        <View style={styles.contentContainer}>
          <View style={styles.linkContainer}>
            <Text style={styles.linkText}>Share game results:</Text>
            <TouchableOpacity style={styles.joinButton} onPress={handleShare}>
              <Text style={styles.joinButtonText}>Share</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.matchInfoContainer}>
            <View style={styles.matchInfoRow}>
              <View style={styles.matchInfoItem}>
                <Text style={styles.matchInfoLabel}>Extra Info</Text>
                <Text style={styles.matchInfoValue}>
                  {gameInfo.game.extraInfo}
                </Text>
              </View>
              <View style={styles.matchInfoItem}>
                <Text style={styles.matchInfoLabel}>Time</Text>
                <Text style={styles.matchInfoValue}>
                  {new Date(gameInfo.game.time).toDateString()}
                </Text>
              </View>
            </View>
            <View style={styles.matchInfoRow}>
              <View style={styles.matchInfoItem}>
                <Text style={styles.matchInfoLabel}>Game Type</Text>
                <Text style={styles.matchInfoValue}>
                  {gameInfo.game.gameType}
                </Text>
              </View>
              <View style={styles.matchInfoItem}>
                <Text style={styles.matchInfoLabel}>Game Style</Text>
                <Text style={styles.matchInfoValue}>
                  {gameInfo.game.gameStyle}
                </Text>
              </View>
            </View>
            <View style={styles.matchInfoRow}>
              <View style={styles.matchInfoItem}>
                <Text style={styles.matchInfoLabel}>Location</Text>
                <Text style={styles.matchInfoValue}>
                  {gameInfo.game.location}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.tableContainer}>
            <Button
              title="Back to Home"
              onPress={() => navigation.navigate("Home")}
            />
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
  title: {
    fontSize: 44,
    color: Colors.purple,
    marginBottom: 10,
    fontWeight: "bold",
    marginTop: 35,
    textAlign: "center",
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
  tableContainer: {
    marginTop: 20,
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
  scoreContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  scoreItem: {
    alignItems: "center",
  },
  scoreLabel: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  score: {
    fontSize: 32,
    color: "#333",
  },
  vs: {
    fontSize: 24,
    color: "#333",
    marginHorizontal: 20,
  },
});

export default GameEnded;
