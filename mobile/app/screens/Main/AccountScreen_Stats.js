import React from "react";
import { Text, View, StyleSheet } from "react-native";
import Colors from "../../config/colors.js";
import { useProjectFonts } from "../../config/fonts.js";

const AccountScreenStats = () => {
  const fontsLoaded = useProjectFonts();
  if (!fontsLoaded) {
    return undefined;
  }

  return (
    <View style={styles.container}>
      <View style={styles.Top}>
        <Text style={styles.PlayerName}>Playername**</Text>

        <View>
          <View style={styles.Verander}>
            <Text style={styles.AllTimeBestTekst}>All time best: </Text>
            <Text style={styles.AllTimeBest}>***</Text>
          </View>
        </View>
        <View style={styles.Select}>
          <Text style={styles.Player}> Player</Text>
          <Text style={styles.Stats}>Stats</Text>
          <Text style={styles.Club}>Club</Text>
        </View>

        <View style={styles.RankView}>
          <Text style={styles.RankTekst}>Rank:</Text>
          <Text style={styles.Rank}> ***</Text>
        </View>

        <View style={styles.SeasonBestView}>
          <Text style={styles.SeasonBestTekst}>Season best:</Text>
          <Text style={styles.SeasonBest}>#***</Text>
        </View>
        <View style={styles.GamesView}>
          <Text style={styles.GamesTekst}>Games:</Text>
          <Text style={styles.Games}>** </Text>
        </View>
        <View style={styles.WLRView}>
          <Text style={styles.WLRTekst}>WLR:</Text>
          <Text style={styles.WLR}>***</Text>
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
  PlayerName: {
    fontSize: 18,
    fontFamily: "QuicksandBold",
    textAlign: "center",
    color: Colors.black,
    marginTop: 10,
  },
  Verander: {
    flexDirection: "row",
    fontSize: 10,
    fontFamily: "QuicksandBold",
    color: Colors.black,
    marginTop: 10,
    opacity: 0.5,
    paddingLeft: 20,
    paddingRight: 20,
    marginLeft: 20,
    marginRight: 20,
    padding: 8,
    borderRadius: 5,
  },
  Select: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 0,
  },
  Player: {
    backgroundColor: Colors.gray,
    marginTop: 10,
    opacity: 0.5,
    paddingLeft: 20,
    paddingRight: 20,
    marginLeft: 20,
    marginRight: 20,
    padding: 8,
    borderRadius: 5,
  },
  Club: {
    backgroundColor: Colors.gray,
    marginTop: 10,
    opacity: 0.5,
    paddingLeft: 20,
    paddingRight: 20,
    marginLeft: 20,
    marginRight: 20,
    padding: 8,
    borderRadius: 5,
  },
  Stats: {
    backgroundColor: Colors.orange,
    marginTop: 10,
    opacity: 0.5,
    paddingLeft: 20,
    paddingRight: 20,
    marginLeft: 20,
    marginRight: 20,
    padding: 8,
    borderRadius: 5,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  RankView: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: 10,
    opacity: 0.5,
    paddingLeft: 20,
    paddingRight: 20,
    marginLeft: 20,
    marginRight: 20,
    padding: 8,
    borderRadius: 5,
  },
  SeasonBestView: {
    justifyContent: "space-between",
    Colors: Colors.black,
    flexDirection: "row",
    marginTop: 10,
    opacity: 0.5,
    paddingLeft: 20,
    paddingRight: 20,
    marginLeft: 20,
    marginRight: 20,
    padding: 8,
    borderRadius: 5,
  },
  GamesView: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: 10,
    opacity: 0.5,
    paddingLeft: 20,
    paddingRight: 20,
    marginLeft: 20,
    marginRight: 20,
    padding: 8,
    borderRadius: 5,
  },

  WLRView: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: 10,
    opacity: 0.5,
    paddingLeft: 20,
    paddingRight: 20,
    marginLeft: 20,
    marginRight: 20,
    padding: 8,
    borderRadius: 5,
  },
  GamesAvarageView: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: 10,
    opacity: 0.5,
    paddingLeft: 20,
    paddingRight: 20,
    marginLeft: 20,
    marginRight: 20,
    padding: 8,
    borderRadius: 5,
  },
  TotalPointsView: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: 10,
    opacity: 0.5,
    paddingLeft: 20,
    paddingRight: 20,
    marginLeft: 20,
    marginRight: 20,
    padding: 8,
    borderRadius: 5,
  },
  WinsInfo: {
    justifyContent: "space-between",
    PaddingLeft: 0,
    marginTop: 10,
    opacity: 0.5,
    paddingLeft: 20,
    paddingRight: 20,
    marginLeft: 20,
    marginRight: 20,
    padding: 8,
    borderRadius: 5,
  },
  TotalWins: {
    justifyContent: "space-between",
    PaddingRight: 0,
    marginTop: 10,
    opacity: 0.5,
    paddingLeft: 20,
    paddingRight: 20,
    marginLeft: 20,
    marginRight: 20,
    padding: 8,
    borderRadius: 5,
  },
});

export default AccountScreenStats;
