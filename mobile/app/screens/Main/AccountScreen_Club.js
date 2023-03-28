import React from "react";
import { Text, View, StyleSheet } from "react-native";
import Colors from "../../config/colors.js";
import { useProjectFonts } from "../../config/fonts.js";

const AccountScreenClub = () => {
  const fontsLoaded = useProjectFonts();
  if (!fontsLoaded) {
    return undefined;
  }

  return (
    <View style={styles.container}>
      <View style={styles.Top}>
        <Text style={styles.PlayerName}>Playername**</Text>
        <View style={styles.Verander}>
          <View>
            <Text style={styles.AllTimeBest}>All time best: </Text>
          </View>
        </View>
        <View style={styles.Select}>
          <Text style={styles.Player}> Player</Text>
          <Text style={styles.Stats}>Stats</Text>
          <Text style={styles.Club}>Club</Text>
        </View>
        <View style={styles.NumberOfPlayersView}>
          <Text style={styles.NumberOfPlayersTekst}>Number Of players:</Text>
          <Text style={styles.NumerOfPlayers}> ***</Text>
        </View>
        <View style={styles.ClubGamesView}>
          <Text style={styles.ClubGamesTekst}>Club Games:</Text>
          <Text style={styles.ClubGames}>#***</Text>
        </View>
        <View style={styles.ClubWinsView}>
          <Text style={styles.ClubWinsTekst}>Club Wins:</Text>
          <Text style={styles.ClubWins}>** </Text>
        </View>
        <View style={styles.DescriptionView}>
          <Text style={styles.DescriptionTekst}>Description:</Text>
          <Text style={styles.Description}>Not Set</Text>
        </View>

        <View style={styles.GamesAvarageView}>
          <Text style={styles.GamesAvarageTekst}>Game Avarage:</Text>
          <Text style={styles.GamsAvarage}>*** PT</Text>
        </View>
        <View style={styles.TotalPointsView}>
          <Text style={styles.TotalPointsTekst}>Total Points:</Text>
          <Text style={styles.TotalPoints}>*** PT</Text>
        </View>

        <View style={styles.button}></View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Select: {
    backgroundColor: Colors.gray,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.gray,
  },
  description: {
    backgroundColor: Colors.gray,
    MarginBottom: 12,
  },
  TotalGames: {},
  WinsInfo: {
    PaddingLeft: 0,
  },
  TotalWins: {
    PaddingRight: 0,
  },
});

export default AccountScreenClub;
