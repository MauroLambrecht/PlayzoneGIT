import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
} from "react-native";

const GameCard = ({ game }) => {
  const gameDate = new Date(game.date);
  console.log(gameDate);
  const dateTime = new Date(gameDate).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
  console.log(dateTime);
  return (
    <ImageBackground
      source={require("../assets/images/lakers_bg.jpg")}
      style={styles.card}
      imageStyle={styles.backgroundImage}
    >
      <View style={styles.content}>
        <View style={styles.matchupContainer}>
          <View style={styles.teamContainer}>
            <Image
              source={require("../assets/images/lakers_logo.png")}
              style={styles.teamLogo}
            />
            <Text style={styles.teamName}>Los Angeles Lakers</Text>
          </View>
          <Text style={styles.vsText}>vs</Text>
          <View style={styles.teamContainer}>
            <Image
              source={require("../assets/images/opponent_logo.png")}
              style={styles.teamLogo}
            />
            <Text style={styles.teamName}>{game.opponent}</Text>
          </View>
        </View>
        <View style={styles.gameInfoContainer}>
          <Text style={styles.gameDate}>{}</Text>
          <Text style={styles.gameTime}>{dateTime}</Text>
          <TouchableOpacity style={styles.joinButton}>
            <Text style={styles.joinButtonText}>Join Game</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "100%",
    alignSelf: "center",
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 16,
    width: "90%",
  },
  backgroundImage: {
    opacity: 0.8,
    width: "100%",
  },
  content: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    padding: 20,
    justifyContent: "space-between",
  },
  matchupContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  teamContainer: {
    alignItems: "center",
  },
  teamLogo: {
    width: 50,
    height: 50,
  },
  teamName: {
    color: "#fff",
    fontSize: 14,
    marginTop: 5,
    fontWeight: "bold",
  },
  vsText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 10,
    marginRight: 10,
  },
  gameInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  gameTime: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 10,
  },
  joinButton: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
  },
  joinButtonText: {
    color: "#522D80",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default GameCard;
