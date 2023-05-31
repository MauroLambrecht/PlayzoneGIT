import { TouchableOpacity, Text, View, StyleSheet, Image } from "react-native";
import React, { useEffect, useState } from "react";
import Colors from "../../config/colors.js";

const AccountScreenStats = () => {
  return (
    <View style={styles.container}>
      <View style={styles.center}>
        <Image
          source={require("../../assets/images/1slnr0.jpg")}
          style={styles.ClubPic}
        />
        <Text style={styles.PlayerName}>Playername</Text>

        <Text style={styles.AllTimeBestTekst}>All time best: #223 </Text>
        <View style={styles.Select}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.text}> Player</Text>
          </TouchableOpacity>
          <View style={styles.button}>
            <Text style={styles.text}>Stats</Text>
          </View>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.text}>Club</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.RankView}>
        <Text style={styles.RankTekst}>Rank:</Text>
        <Text style={styles.Rank}> Silver</Text>
      </View>
      <View style={styles.SeasonBestView}>
        <Text style={styles.SeasonBestTekst}>Season best:</Text>
        <Text style={styles.SeasonBest}>#1020</Text>
      </View>
      <View style={styles.GamesView}>
        <Text style={styles.GamesTekst}>Games:</Text>
        <Text style={styles.Games}>20 </Text>
      </View>
      <View style={styles.WLRView}>
        <Text style={styles.WLRTekst}>WLR:</Text>
        <Text style={styles.WLR}>3.34</Text>
      </View>
      <View style={styles.GamesAvarageView}>
        <Text style={styles.GamesAvarageTekst}>Game Avarage:</Text>
        <Text style={styles.GamsAvarage}>12 PT</Text>
      </View>
      <View style={styles.TotalPointsView}>
        <Text style={styles.TotalPointsTekst}>Total Points:</Text>
        <Text style={styles.TotalPoints}>354 PT</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: Colors.white,
  },

  button: {
    width: "25%",
    marginHorizontal: "2%",
    margin: "10%",
    marginTop: "2%",
  },

  AllTimeBestTekst: {
    fontSize: 10,
    textAlign: "center",
    color: Colors.black,
    marginTop: 10,
  },
  center: {
    alignSelf: "center",
  },
  PlayerName: {
    fontSize: 18,
    textAlign: "center",
    color: Colors.black,
    marginTop: 10,
  },
  Verander: {
    flexDirection: "row",
    fontSize: 10,
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
    marginTop: 30,
    alignSelf: "center",
  },
  text: {
    backgroundColor: Colors.gray,
    opacity: 0.5,
    borderRadius: 5,
    paddingVertical: "8%",
    textAlign: "center",
  },
  RankView: {
    color: Colors.black,
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
  ClubPic: {
    marginTop: 20,
    borderRadius: 60,
    marginTop: 60,
    width: 120,
    height: 120,
    alignSelf: "center",
  },
  KnoppenOnderaan: {
    flexDirection: "row",
    marginBottom: 10,
    position: "relative",
    bottom: "-20%",
  },
  bottomContainer: {
    width: "50%",
    alignItems: "center",
  },
  orangeButton: {
    backgroundColor: Colors.orange,
  },

  whiteButton: {
    backgroundColor: Colors.black,
    borderColor: Colors.orange,
  },
});

export default AccountScreenStats;
