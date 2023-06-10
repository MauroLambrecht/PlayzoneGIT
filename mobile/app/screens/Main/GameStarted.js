import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import instance from "../../services";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation, useRoute } from "@react-navigation/native";

const GameStarted = () => {
  const [teamAScore, setTeamAScore] = useState(0);
  const [teamBScore, setTeamBScore] = useState(0);
  const [possession, setPossession] = useState(null);
  const [quarter, setQuarter] = useState(1);
  const [timerActive, setTimerActive] = useState(true);
  const [timeRemaining, setTimeRemaining] = useState(10 * 60);

  const route = useRoute();
  const gameid = route.params;

  const navigation = useNavigation();

  const incrementScore = (team, points) => {
    if (team === "A") {
      setTeamAScore(teamAScore + points);
    } else if (team === "B") {
      setTeamBScore(teamBScore + points);
    }
  };

  const togglePossession = () => {
    setPossession(possession === "A" ? "B" : "A");
  };

  const resetScores = () => {
    setTeamAScore(0);
    setTeamBScore(0);
    setPossession(null);
    setQuarter(1);
    setTimerActive(false);
    setTimeRemaining(10 * 60);
  };

  const endQuarter = () => {
    setTimerActive(!timerActive);
  };

  const endGame = async () => {
    let winner;
    if (teamAScore < teamBScore) {
      winner = "out";
    } else {
      winner = "home";
    }

    try {
      const token = await AsyncStorage.getItem("userToken");
      if (teamAScore !== null && teamBScore !== null) {
        await instance.patch(
          "/endgame",
          {
            scoresThuisploeg: teamAScore,
            scoresBezoekers: teamBScore,
            winner: winner,
            gameId: gameid,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        resetScores();
      } else {
        console.error("Invalid scores provided");
        return; // Exit the function if scores are invalid
      }

      navigation.navigate("GameEnded", { gameId: gameid });
    } catch (error) {
      console.error("Error ending game:", error);
      // Handle the error here or display an error message
    }
  };

  useEffect(() => {
    let interval;

    if (timerActive) {
      interval = setInterval(() => {
        setTimeRemaining((prevTimeRemaining) => {
          if (prevTimeRemaining === 0) {
            clearInterval(interval);
            setTimerActive(false);
            setQuarter((prevQuarter) => {
              if (prevQuarter === 4) {
                GameEnded();
              } else {
                return prevQuarter + 1;
              }
            });
            return 10 * 60;
          } else {
            return prevTimeRemaining - 1;
          }
        });
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [timerActive]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.timer}>
        Time Remaining: {formatTime(timeRemaining)}
      </Text>

      <View style={styles.teamContainer}>
        <TouchableOpacity
          style={[
            styles.teamButton,
            possession === "A" && styles.activeTeamButton,
          ]}
          onPress={() => togglePossession()}
        >
          <Text
            style={[
              styles.teamButtonText,
              possession === "A" && styles.activeTeamButtonText,
            ]}
          >
            Team A
          </Text>
          {possession === "A" && <View style={styles.pointer} />}
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.teamButton,
            possession === "B" && styles.activeTeamButton,
          ]}
          onPress={() => togglePossession()}
        >
          <Text
            style={[
              styles.teamButtonText,
              possession === "B" && styles.activeTeamButtonText,
            ]}
          >
            Team B
          </Text>
          {possession === "B" && <View style={styles.pointer} />}
        </TouchableOpacity>
      </View>

      <View style={styles.scoreContainer}>
        <TouchableOpacity style={styles.scoreButton} disabled>
          <Text style={styles.scoreButtonText}>{teamAScore}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.scoreButton} disabled>
          <Text style={styles.scoreButtonText}>{teamBScore}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonsContainer}>
        <View style={styles.pointsContainer}>
          <TouchableOpacity
            style={styles.pointButton}
            onPress={() => incrementScore("A", 3)}
          >
            <Text style={styles.buttonText}>3 PT</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.pointButton}
            onPress={() => incrementScore("A", 2)}
          >
            <Text style={styles.buttonText}>2 PT</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.pointButton}
            onPress={() => incrementScore("A", 1)}
          >
            <Text style={styles.buttonText}>1 PT</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.pointsContainer}>
          <TouchableOpacity
            style={styles.pointButton}
            onPress={() => incrementScore("B", 3)}
          >
            <Text style={styles.buttonText}>3 PT</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.pointButton}
            onPress={() => incrementScore("B", 2)}
          >
            <Text style={styles.buttonText}>2 PT</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.pointButton}
            onPress={() => incrementScore("B", 1)}
          >
            <Text style={styles.buttonText}>1 PT</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.button} onPress={endQuarter}>
          <Text style={styles.buttonText}>
            {timerActive ? `Pause Quarter ${quarter}` : "Start Timer"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => endGame()}>
          <Text style={styles.buttonText}>End Game</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.resetButton} onPress={resetScores}>
          <Text style={styles.resetButtonText}>Reset</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  timer: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
  },
  teamContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  teamButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 10,
  },
  activeTeamButton: {
    borderBottomWidth: 2,
    borderBottomColor: "blue",
  },
  teamButtonText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  activeTeamButtonText: {
    color: "blue",
  },
  pointer: {
    width: 10,
    height: 10,
    backgroundColor: "blue",
    marginTop: 5,
  },
  scoreContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  scoreButton: {
    flex: 1,
    backgroundColor: "#eaeaea",
    paddingVertical: 20,
    alignItems: "center",
  },
  scoreButtonText: {
    fontSize: 40,
    fontWeight: "bold",
  },
  buttonsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  pointsContainer: {
    flexDirection: "column",
    alignItems: "center",
    marginVertical: 30,
    marginRight: 20,
    marginLeft: 20,
  },
  pointButton: {
    width: 150,
    backgroundColor: "#eaeaea",
    paddingVertical: 15,
    alignItems: "center",
    marginBottom: 10,
  },
  button: {
    width: "50%",
    backgroundColor: "#eaeaea",
    paddingVertical: 20,
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  resetButton: {
    width: "100%",
    backgroundColor: "red",
    paddingVertical: 20,
    alignItems: "center",
    marginBottom: 10,
  },
  resetButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
});

export default GameStarted;
