import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import Colors from "../../config/colors.js";
import getMyGames from "../../services/GetMyGames.js";
import RoundButton from "../../components/RoundButton.js";
import GameCard from "../../components/GameCard.js";
import { GradientText } from "../../components/GradientComp.js";
import { useProjectFonts } from "../../config/fonts.js";

const PlayScreen = ({ handleLogout }) => {
  const [games, setGames] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   const fetchGames = async () => {
  //     const games = await getMyGames();
  //     setGames(games);
  //     setIsLoading(false);
  //   };
  //   fetchGames();
  // }, []);

  const fontsLoaded = useProjectFonts();

  if (isLoading || !fontsLoaded) {
    return <ActivityIndicator />;
  }

  return (
    <View style={styles.container}>
      <View>
        <GradientText text="Public games" style={styles.title}></GradientText>
      </View>

      {/* <ScrollView>
        {games.map((game) => (
          <GameCard key={game.IDGame} game={game} />
        ))}
      </ScrollView> */}

      <View style={styles.bottomContainer}>
        <RoundButton
          title="Create a game"
          // onPress={handleLogout}
          onPress={console.log("fuk this")}
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
    backgroundColor: "#F7F7F7",
    paddingTop: 20,
  },
  titleContainer: {
    marginBottom: 20,
  },
  title: {
    fontFamily: "QuicksandBold",
    fontWeight: "bold",
    fontSize: 24,
    color: Colors.primary,
    textTransform: "uppercase",
    textAlign: "center",
    marginBottom: 20,
  },
  scrollContainer: {
    flex: 1,
  },
  scrollView: {
    paddingBottom: 20,
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
});

export default PlayScreen;
